# frozen_string_literal: true

require "csv"
require "dorian/arguments"
require "dorian/eval"
require "dorian/progress"
require "dorian/to_struct"
require "json"
require "yaml"
require "parallel"

class Dorian
  class Bin
    VERSION = File.read(File.expand_path("../../VERSION", __dir__))

    DEFAULT_IO = :raw

    IO = {
      "csv" => :csv,
      "json" => :json,
      "jsonl" => :jsonl,
      "raw" => :raw,
      "yaml" => :yaml,
      "yml" => :yaml
    }.freeze

    attr_reader :parsed, :command, :arguments

    def initialize
      @parsed =
        Dorian::Arguments.parse(
          colorize: {
            aliases: %i[color c],
            default: true
          },
          fast: {
            alias: :f
          },
          input: {
            type: :string,
            alias: :i
          },
          output: {
            type: :string,
            alias: :o
          },
          parallel: {
            alias: :p
          },
          rails: {
            alias: :r
          },
          stderr: {
            alias: :err,
            default: true
          },
          stdout: {
            alias: :out,
            default: true
          },
          stdin: {
            type: :string,
            alias: :in,
            default: :raw
          },
          write: {
            alias: :w
          },
          deep: :boolean,
          debug: {
            alias: :d
          },
          progress: :boolean,
          headers: :boolean,
          progress_format: {
            alias: :pf
          },
          pretty: {
            default: true
          },
          io: :string,
          version: {
            alias: :v
          },
          help: {
            alias: :h
          }
        )

      @command, *@arguments = parsed.arguments
    end

    def self.run(...)
      new(...).run
    end

    def run
      abort help if help?
      abort VERSION if version?

      case command&.to_sym
      when :read, nil
        command_read
      when :each
        command_each
      else
        abort "#{command} not supported"
      end
    end

    def files
      parsed.files
    end

    def command_read
      each(stdin_files + files) do |input|
        outputs(reads(File.read(input)), file: input)
      end

      each(stdin_arguments) { |input| outputs(reads(input)) }
    end

    def command_each
      each(read_stdin_files + read_files + stdin_arguments) do |input|
        each(lines(reads(input))) do |line|
          binding.irb
          evaluates(arguments.join(" "), it: to_ruby(line))
        end
      end
    end

    def outputs(content, file: nil)
      if write? && file
        File.write(file, to_output(content))
      else
        puts to_output(content)
      end
    end

    def to_output(content)
      content = content.from_deep_struct

      case output
      when :csv
        CSV.generate(headers: headers_of(content)) do |csv|
          csv << headers_of(content) if headers_of(content)

          each(content) { |row| csv << row }
        end
      when :json
        pretty? ? JSON.pretty_generate(content) : content.to_json
      when :jsonl
        map(content, &:to_json).join("\n")
      when :raw
        content
      when :ruby
        content.inspect
      when :rubyl
        map(content, &:inspect).join("\n")
      when :yaml
        content.to_yaml
      else
        abort "#{output} not supported"
      end
    end

    def reads(content)
      case input
      when :csv
        if headers?
          map(CSV.parse(content, headers: true), &:to_h).to_deep_struct
        else
          CSV.parse(content)
        end
      when :json
        JSON.parse(content).to_deep_struct
      when :jsonl
        map(content.lines) { |line| JSON.parse(line) }.to_deep_struct
      when :raw
        content
      when :yaml
        YAML.safe_load(content)
      else
        abort "#{input} not supported"
      end
    end

    def pretty?
      !!options.pretty
    end

    def read_stdin
      @read_stdin ||= $stdin.each_line.to_a
    end

    def stdin_files
      return [] if files.any?
      return [] unless stdin == :files

      read_stdin.map(&:rstrip)
    end

    def read_stdin_files
      stdin_files.map { |file| File.read(file) }
    end

    def read_files
      files.map { |file| File.read(file) }
    end

    def stdin_arguments
      return [] if files.any?
      return [] if stdin == :files

      [read_stdin.join]
    end

    def stdin
      options.stdin.to_sym
    end

    def options
      parsed.options
    end

    def colorize?
      !!options.colorize
    end

    def fast?
      !!options.fast
    end

    def io
      IO.fetch(options.io.to_s, nil)
    end

    def input
      io || IO.fetch(options.input.to_s, nil) || io_from_files || DEFAULT_IO
    end

    def output
      io || IO.fetch(options.output.to_s, nil) || io_from_files || DEFAULT_IO
    end

    def io_from_files
      IO.fetch(File.extname((stdin_files + files).first || "").delete("."), nil)
    end

    def parallel?
      !!options.parallel
    end

    def rails?
      !!options.rails
    end

    def stderr?
      !!options.stderr
    end

    def stdout?
      !!options.stdout
    end

    def write?
      !!options.write
    end

    def debug?
      !!options.debug
    end

    def progress?
      !!options.progress
    end

    def headers?
      !!options.headers
    end

    def progress_format
      options.progress_format
    end

    def version?
      !!options.version
    end

    def help?
      !!options.help
    end

    def help
      parsed.help
    end

    def headers_of(content)
      return unless headers?
      return unless content.respond_to?(:first)
      return unless content.first
      return unless content.first.respond_to?(:to_h)
      return unless content.first.to_h.keys.any?

      content.first.to_h.keys
    end

    def each(collection, &)
      parallel? ? Parallel.each(collection, &) : collection.each(&)
    end

    def map(collection, &)
      parallel? ? Parallel.map(collection, &) : collection.map(&)
    end

    def lines(input)
      input.is_a?(String) ? input.lines.map(&:rstrip) : Array(input)
    end

    def evaluates(
      ruby,
      it: nil,
      debug: debug?,
      stdout: stdout?,
      stderr: stderr?,
      colorize: colorize?,
      rails: rails?,
      returns: false
    )
      Dorian::Eval.eval(
        ruby:,
        it:,
        debug:,
        stdout:,
        stderr:,
        colorize:,
        rails:,
        returns:
      )
    end
  end
end
