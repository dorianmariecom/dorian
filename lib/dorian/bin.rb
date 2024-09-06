# frozen_string_literal: true

require "csv"
require "dorian/arguments"
require "dorian/eval"
require "dorian/progress"
require "dorian/to_struct"
require "git"
require "json"
require "net/http"
require "parallel"
require "uri"
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

    attr_reader :parsed, :command, :arguments, :ruby, :ruby_before, :ruby_after

    def initialize
      @parsed =
        Dorian::Arguments.parse(
          colorize: {
            aliases: %i[color c],
            default: true
          },
          fast: {
            alias: :f,
            default: true
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
            alias: :p,
            default: true
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
          headers: {
            default: true
          },
          progress_format: {
            alias: :pf,
            type: :string
          },
          pretty: {
            default: true
          },
          io: :string,
          self: :boolean,
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
        @ruby = arguments.delete_at(0)
        command_each
      when :all
        arguments.delete("all")
        @command = :all
        @ruby = arguments.delete_at(0)
        command_all
      when :before
        arguments.delete("before")
        @command = :before
        @ruby = arguments.delete_at(0)
        command_before
      when :after
        arguments.delete("after")
        @command = :after
        @ruby = arguments.delete_at(0)
        command_after
      when :between
        arguments.delete("between")
        @command = :between
        @ruby_after = arguments.delete_at(0)
        @ruby_before = arguments.delete_at(0)
        command_between
      when :select
        arguments.delete("select")
        @command = :select
        @ruby = arguments.delete_at(0)
        command_select
      when :reject
        arguments.delete("reject")
        @command = :reject
        @ruby = arguments.delete_at(0)
        command_reject
      when :tally
        arguments.delete("tally")
        @command = :tally
        @ruby = arguments.delete_at(0)
        command_tally
      when :anonymize
        arguments.delete("anonymize")
        @command = :anonymize
        command_anonymize
      when :append
        arguments.delete("append")
        @command = :append
        command_append
      when :prepend
        arguments.delete("prepend")
        @command = :prepend
        command_prepend
      when :chat
        arguments.delete("chat")
        @command = :chat
        command_chat
      when :commit
        arguments.delete("commit")
        @command = :commit
        command_commit
      when :compare
        arguments.delete("compare")
        @command = :compare
        command_compare
      when :dir
        arguments.delete("dir")
        @command = :dir
        command_dir
      when :submodules
        arguments.delete("submodules")
        @command = :submodules
        command_submodules
      else
        arguments.delete("read")
        @command = :read
        command_read
      end
    end

    def files
      parsed.files
    end

    def command_chat
      puts completion(
             token: token(".chat"),
             model: "gpt-4o",
             messages: [{ role: :user, content: everything.join("\n") }]
           )
    end

    def command_commit
      system_prompt = "simple, clear, short, lowercase commit message"
      prompt_1 = "for the following diff:"
      prompt_2 = "for the following git status:"
      prompt_3 = "for the following comment:"

      content_1 = short(`git diff --staged`)
      content_2 = short(`git status`)
      content_3 = short(arguments.join("\n"))

      abort "no staged files" if content_1.empty?

      messages = [
        { role: :system, content: system_prompt },
        { role: :system, content: prompt_1 },
        { role: :user, content: content_1 },
        { role: :system, content: prompt_2 },
        { role: :user, content: content_2 },
        { role: :system, content: prompt_3 },
        { role: :user, content: content_3 }
      ]

      message = completion(token: token(".commit"), model: "gpt-4o", messages:)

      Git.open(".").commit(message)

      puts message
    end

    def command_read
      each(stdin_files + files) do |input|
        outputs(reads(File.read(input)), file: input)
      end

      each(stdin_arguments + arguments) { |input| outputs(reads(input)) }
    end

    def everything
      read_stdin_files + stdin_arguments + read_files + arguments
    end

    def command_dir
      puts(
        Git
          .open(".")
          .ls_files
          .map(&:first)
          .map { |path| path.split("/").first }
          .select { |path| Dir.exist?(path) }
          .reject { |path| path.start_with?(".") }
          .sort
          .uniq
      )

      puts "." if self?
    end

    def command_submodules
      puts(
        File
          .read(".gitmodules")
          .lines
          .grep(/path = /)
          .map { |path| path.split("=").last.strip }
      )

      puts "." if self?
    end

    def self?
      !!options.self
    end

    def command_compare
      file_1, file_2 = files
      key_1, key_2 = arguments
      read_1, read_2 =
        files.map.with_index do |file, index|
          read = reads(File.read(file))

          if arguments[index] && read.from_deep_struct.key?(arguments[index])
            read[arguments[index]]
          elsif arguments[index]
            nil
          else
            read
          end
        end

      compare(read_1, read_2, file_1:, file_2:)
    end

    def command_each
      each(everything) do |input|
        each(lines(reads(input)), progress: true) { |line| evaluates(it: line) }
      end
    end

    def command_tally
      each(everything) do |input|
        outputs(
          JSON.pretty_generate(
            map(lines(reads(input)), progress: true) do |element|
              if ruby.to_s.empty?
                element
              else
                evaluates(it: element, returns: true, stdout: false).returned
              end
            end.tally
          )
        )
      end
    end

    def command_all
      each(everything, progress: true) do |input|
        evaluates(it: lines(reads(input)))
      end
    end

    def command_append
      outputs(everything.sum { |input| lines(reads(input)) })
    end

    def command_prepend
      outputs(everything.reverse.sum { |input| lines(reads(input)) })
    end

    def command_select
      each(stdin_files + files) do |input|
        outputs(
          select(lines(reads(File.read(input)))) { |element| match?(element) },
          file: input
        )
      end

      each(stdin_arguments + arguments) do |input|
        outputs(select(lines(reads(input))) { |element| match?(element) })
      end
    end

    def command_reject
      each(stdin_files + files) do |input|
        outputs(
          reject(lines(reads(File.read(input)))) { |element| match?(element) },
          file: input
        )
      end

      each(stdin_arguments + arguments) do |input|
        outputs(reject(lines(reads(input))) { |element| match?(element) })
      end
    end

    def command_after
      each(stdin_files + files) do |input|
        outputs(after(lines(reads(File.read(input)))), file: input)
      end

      each(stdin_arguments + arguments) do |input|
        outputs(after(lines(reads(input))))
      end
    end

    def command_before
      each(stdin_files + files) do |input|
        outputs(before(reads(File.read(input))), file: input)
      end

      each(stdin_arguments + arguments) do |input|
        outputs(before(lines(reads(input))))
      end
    end

    def command_between
      each(stdin_files + files) do |input|
        outputs(between(lines(reads(File.read(input)))), file: input)
      end

      each(stdin_arguments + arguments) do |input|
        outputs(between(lines(reads(input))))
      end
    end

    def command_anonymize
      each(stdin_files + files) do |input|
        outputs(anonymize(reads(File.read(input))), file: input)
      end

      each(stdin_arguments + arguments) do |input|
        outputs(anonymize(reads(input)))
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

    def select(collection, progress: false, &)
      collection = wrap(collection)
      progress_bar = progress ? create_progress_bar(collection.size) : nil

      collection.select do |element|
        yield(element).tap { progress_bar&.increment }
      end
    end

    def reject(collection, progress: false, &)
      collection = wrap(collection)
      progress_bar = progress ? create_progress_bar(collection.size) : nil

      collection.reject do |element|
        yield(element).tap { progress_bar&.increment }
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

    def after(input, ruby: @ruby_after || @ruby)
      if ruby.to_i.to_s == ruby
        input[(ruby.to_i)..]
      else
        selected = false

        input.select do |element|
          selected = true if match?(element, ruby:)
          selected
        end
      end
    end

    def before(input, ruby: @ruby_before || @ruby)
      if ruby.to_i.to_s == ruby
        input[..(ruby.to_i)]
      else
        selected = true

        input.select do |element|
          selected.tap { selected = false if match?(element, ruby:) }
        end
      end
    end

    def between(input, ruby_before: @ruby_before, ruby_after: @ruby_after)
      if ruby_before.to_i.to_s == ruby_before &&
           ruby_after.to_i.to_s == ruby_after
        input[(ruby_after.to_i)..(ruby_before.to_i)]
      else
        selected = false

        input.select do |element|
          selected = true if match?(element, ruby: ruby_after)
          selected.tap do
            selected = false if match?(element, ruby: ruby_before)
          end
        end
      end
    end

    def anonymize(input)
      if input.is_a?(String)
        input.gsub(/[a-z]/, "a").gsub(/[A-Z]/, "A").gsub(/[0-9]/, "0")
      elsif input.is_a?(Integer)
        0
      elsif input.is_a?(Float)
        0.0
      elsif input.is_a?(TrueClass) || input.is_a?(FalseClass)
        false
      elsif input.nil?
        nil
      elsif input.is_a?(Hash)
        input.transform_values { |value| anonymize(value) }
      elsif input.is_a?(Array)
        input.map { |element| anonymize(element) }
      elsif input.is_a?(Struct)
        anonymize(input.from_deep_struct).to_deep_struct
      else
        raise "#{input.class.inspect} not supported"
      end
    end

    def match?(element, ruby: @ruby)
      !!evaluates(ruby:, it: element, stdout: false, returns: true).returned
    end

    def token(file)
      token_file = File.join(Dir.home, file)

      if File.exist?(token_file)
        token = File.read(token_file).strip
      else
        print "token: "
        token = gets.strip
        File.write(token_file, token)
        puts "token written to #{token_file}"
      end

      token
    end

    def completion(token:, model:, messages:)
      body =
        post(
          "https://api.openai.com/v1/chat/completions",
          headers: {
            "Content-Type" => "application/json",
            "Authorization" => "Bearer #{token}"
          },
          body: { model:, messages: }.to_json
        )

      json = JSON.parse(body)
      output = json.dig("choices", 0, "message", "content")

      if output
        output.strip
      else
        abort JSON.pretty_generate(json)
      end
    end

    def post(url, headers: {}, body: {})
      uri = URI.parse(url)
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      request = Net::HTTP::Post.new(uri.path, headers)
      request.body = body
      http.request(request).body
    end

    def compare(content_1, content_2, file_1:, file_2:, path: ".")
      content_1 = content_1.from_deep_struct
      content_2 = content_2.from_deep_struct

      if content_1.is_a?(Hash) && content_2.is_a?(Hash)
        (content_1.keys + content_2.keys).uniq.each do |key|
          new_path = path == "." ? "#{path}#{key}" : "#{path}.#{key}"

          if content_1[key] && !content_2[key]
            warn "#{new_path} present in #{file_1} but not in #{file_2}"
            next
          elsif !content_1[key] && content_2[key]
            warn "#{new_path} present in #{file_2} but not in #{file_1}"
            next
          end

          compare(
            content_1[key],
            content_2[key],
            path: new_path,
            file_1:,
            file_2:
          )
        end
      elsif content_1.is_a?(Array) && content_2.is_a?(Array)
        (0...([content_1.size, content_2.size].max)).each do |index|
          new_path = "#{path}[#{index}]"
          if content_1[index] && !content_2[index]
            warn "#{new_path} present in #{file_1} but not in #{file_2}"
            next
          elsif !content_1[index] && content_2[index]
            warn "#{new_path} present in #{file_2} but not in #{file_1}"
            next
          end

          compare(
            content_1[index],
            content_2[index],
            path: new_path,
            file_1:,
            file_2:
          )
        end
      elsif content_1.class != content_2.class
        warn(
          "#{path} has #{content_1.class} for #{file_1} " \
            "and #{content_2.class} for #{file_2}"
        )
      end
    end

    def short(string)
      string[0..5000]
    end

    def encoder
      Tiktoken.encoding_for_model("gpt-4o")
    end

    def evaluates(
      ruby: @ruby,
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
