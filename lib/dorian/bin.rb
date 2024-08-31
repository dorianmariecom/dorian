require "csv"
require "dorian/arguments"
require "dorian/eval"
require "dorian/progress"
require "json"
require "yaml"
require "parallel"

class Dorian
  class Bin
    VERSION = File.read(File.expand_path("../../VERSION", __dir__))

    DEFAULT_IO = :raw

    IO = {
      "c" => :csv,
      "csv" => :csv,
      "j" => :json,
      "jl" => :jsonl,
      "js" => :json,
      "jsl" => :jsonl,
      "json" => :json,
      "jsonl" => :jsonl,
      "r" => :ruby,
      "raw" => :raw,
      "rb" => :ruby,
      "rbl" => :rubyl,
      "rl" => :rubyl,
      "ru" => :ruby,
      "ruby" => :ruby,
      "rubyl" => :rubyl,
      "rul" => :rubyl,
      "y" => :yaml,
      "yaml" => :yaml,
      "yml" => :yaml,
    }

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
            default: true,
          },
          stdout: {
            alias: :out,
            default: true,
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
          pretty: { default: true },
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
      else
        abort "#{command} not supported"
      end
    end

    def files
      parsed.files
    end

    def command_read
      each((stdin_files + files)) do |input|
        outputs(reads(File.read(input)), file: input)
      end

      each((stdin_arguments + arguments)) do |input|
        outputs(reads(input))
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
      case output
      when :csv
        CSV.generate(headers: headers_of(content)) do |csv|
          if headers_of(content)
            csv << headers_of(content)
          end

          each(content) { |row| csv << row }
        end
      when :json
        if pretty?
          JSON.pretty_generate(content)
        else
          content.to_json
        end
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
          map(CSV.parse(content, headers: true), &:to_h)
        else
          CSV.parse(content)
        end
      when :json
        JSON.parse(content)
      when :jsonl
        map(content.lines) { |line| JSON.parse(line) }
      when :raw
        content
      when :ruby
        evaluates_input(content)
      when :rubyl
        map(content.lines) { |line| evaluates_input(line) }
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
      return [] if files.any? || arguments.any?
      return [] unless stdin == :files
      read_stdin.map(&:strip)
    end

    def stdin_arguments
      return [] if files.any? || arguments.any?
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
      IO.fetch(File.extname((stdin_files + files).first).gsub(".", ""), nil)
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

    def each(collection, &block)
      if parallel?
        Parallel.each(collection, &block)
      else
        collection.each(&block)
      end
    end

    def map(collection, &block)
      if parallel?
        Parallel.map(collection, &block)
      else
        collection.map(&block)
      end
    end

    def evalutes_input(ruby)
      YAML.safe_load(evaluates(
        ruby:,
        it: nil,
        debug: false,
        stdout: false
        stdout: false,
        stderr: false,
        colorize: false,
        returns: :yaml
      ))
    end

    def evaluates(
      ruby:,
      it: ruby,
      debug: debug?,
      stdout: stdout?,
      stderr: stderr?,
      colorize: colorize?,
      rails: rails?,
      returns: nil
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
