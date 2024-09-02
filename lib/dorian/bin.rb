# frozen_string_literal: true

require "csv"
require "dorian/arguments"
require "dorian/eval"
require "dorian/progress"
require "dorian/to_struct"
require "json"
require "parallel"
require "yaml"

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
      "yml" => :yaml,
      "yamll" => :yamll,
      "ymll" => :yamll
    }.freeze

    attr_reader :parsed, :command, :arguments, :ruby

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
          parallel_type: {
            alias: :pt,
            type: :string,
            default: :processes
          },
          n: {
            type: :integer,
            default: 100
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
            alias: :pf,
            type: :string
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

      @arguments = parsed.arguments
      @command = arguments.first
      @ruby = nil
    end

    def self.run(...)
      new(...).run
    end

    def run
      abort help if help?
      abort VERSION if version?

      case command&.to_sym
      when :each
        arguments.delete("each")
        @command = :each
        @ruby = arguments.join(" ")
        @arguments = []
        command_each
      when :all
        arguments.delete("all")
        @command = :all
        @ruby = arguments.join(" ")
        @arguments = []
        command_all
      else
        arguments.delete("read")
        @command = :read
        command_read
      end
    end

    def files
      parsed.files
    end

    def command_read
      each(stdin_files + files) do |input|
        outputs(reads(File.read(input)), file: input)
      end

      each(stdin_arguments + arguments) { |input| outputs(reads(input)) }
    end

    def everything
      read_stdin_files + read_files + stdin_arguments + arguments
    end

    def command_each
      each(everything) do |input|
        each(lines(reads(input)), progress: true) do |line|
          evaluates(ruby, it: line)
        end
      end
    end

    def command_all
      each(everything, progress: true) do |input|
        evaluates(ruby, it: reads(input))
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
        (headers_of(content) ? headers_of(content).to_csv : "") +
          map(content) do |element|
            CSV.generate(headers: headers_of(content)) do |csv|
              csv << wrap(element)
            end
          end.join
      when :json
        pretty? ? JSON.pretty_generate(content) : content.to_json
      when :jsonl, :yamll
        map(content, &:to_json).join("\n")
      when :raw
        content
      when :yaml
        content.to_yaml
      else
        abort "#{output.inspect} not supported"
      end
    end

    def reads(content)
      case input
      when :csv
        if headers?
          CSV.parse(content, headers: true).map(&:to_h).to_deep_struct
        else
          CSV.parse(content)
        end
      when :json
        JSON.parse(content).to_deep_struct
      when :jsonl, :yamll
        map(content.lines) { |line| JSON.parse(line) }.to_deep_struct
      when :raw
        content
      when :yaml
        YAML.safe_load(content).to_deep_struct
      else
        abort "#{input.inspect} not supported"
      end
    rescue JSON::ParserError => e
      abort "invalid json: #{e.message}"
    rescue Psych::SyntaxError => e
      abort "invalid yaml: #{e.message}"
    end

    def pretty?
      !!options.pretty
    end

    def read_stdin
      @read_stdin ||= $stdin.each_line.to_a
    rescue Interrupt
      abort "interupt in read_stdin"
    end

    def stdin_files
      return [] if files.any? || arguments.any?
      return [] if stdin != :files

      map(read_stdin, &:rstrip)
    end

    def read_stdin_files
      stdin_files.map { |file| File.read(file) }
    end

    def read_files
      files.map { |file| File.read(file) }
    end

    def stdin_arguments
      return [] if files.any? || arguments.any?
      return [] if stdin == :files

      [read_stdin.join]
    end

    def stdin
      options.stdin.to_sym
    end

    def deep?
      !!options.deep
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

    def n
      options.n
    end

    def parallel_type
      options.parallel_type&.to_sym
    end

    def headers_of(content)
      return unless content.respond_to?(:first)
      return unless content.first
      return unless content.first.respond_to?(:to_h)
      return unless content.first.to_h.keys.any?

      content.first.to_h.keys
    rescue TypeError
      nil
    end

    def parallel_options
      if parallel_type == :processes
        { in_processes: n }
      elsif parallel_type == :threads
        { in_threads: n }
      else
        abort "#{parallel_type.inspect} not supported"
      end
    end

    def each(collection, options: parallel_options, progress: false, &)
      collection = wrap(collection)
      progress_bar = progress ? create_progress_bar(collection.size) : nil

      if parallel?
        Parallel.each(
          collection,
          **options,
          finish: ->(*) { progress_bar&.increment },
          &
        )
      else
        collection.each do |element|
          yield(element).tap { progress_bar&.increment }
        end
      end
    end

    def map(collection, options: parallel_options, progress: false, &)
      collection = wrap(collection)
      progress_bar = progress ? create_progress_bar(collection.size) : nil

      if parallel?
        Parallel.map(
          collection,
          **options,
          finish: ->(*) { progress_bar&.increment },
          &
        )
      else
        collection.map do |element|
          yield(element).tap { progress_bar&.increment }
        end
      end
    end

    def lines(input)
      if input.is_a?(String)
        input.lines.map(&:rstrip)
      elsif deep?
        deep_lines(input)
      else
        Array(input)
      end
    end

    def deep_lines(input)
      case input
      when Array
        [input.to_deep_struct] +
          input.flat_map { |element| deep_lines(element) }
      when Hash
        [input.to_deep_struct] +
          input.flat_map { |key, value| deep_lines([key, value]) }
      when Struct
        deep_lines(input.from_deep_struct).to_deep_struct
      else
        [input.to_deep_struct]
      end
    end

    def wrap(ruby)
      if ruby.is_a?(Hash)
        ruby
      elsif ruby.respond_to?(:to_a)
        ruby.to_a
      else
        Array(ruby)
      end
    end

    def create_progress_bar(total)
      return unless progress?

      Dorian::Progress.create(total:, format: progress_format)
    end

    def evaluates(
      ruby,
      it: nil,
      debug: debug?,
      stdout: stdout?,
      stderr: stderr?,
      colorize: colorize?,
      rails: rails?,
      fast: fast?,
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
        fast:,
        returns:
      )
    end
  end
end
