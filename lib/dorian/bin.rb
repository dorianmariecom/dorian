# frozen_string_literal: true

require "csv"
require "dorian/arguments"
require "dorian/eval"
require "dorian/progress"
require "dorian/to_struct"
require "git"
require "hexapdf"
require "json"
require "mini_racer"
require "net/http"
require "parallel"
require "shellwords"
require "syntax_tree"
require "syntax_tree/erb"
require "syntax_tree/haml"
require "syntax_tree/xml"
require "syntax_tree/json"
require "tempfile"
require "terminal-table"
require "uri"
require "yaml"

class Dorian
  class Bin
    RUBY_EXTENSIONS = %w[
      .rb
      .arb
      .axlsx
      .builder
      .fcgi
      .gemfile
      .gemspec
      .god
      .jb
      .jbuilder
      .mspec
      .opal
      .pluginspec
      .podspec
      .rabl
      .rake
      .rbuild
      .rbw
      .rbx
      .ru
      .ruby
      .schema
      .spec
      .thor
      .watchr
    ].freeze

    RUBY_FILENAMES = %w[
      .irbrc
      .pryrc
      .simplecov
      Appraisals
      Berksfile
      Brewfile
      Buildfile
      Capfile
      Cheffile
      Dangerfile
      Deliverfile
      Fastfile
      Gemfile
      Guardfile
      Jarfile
      Mavenfile
      Podfile
      Puppetfile
      Rakefile
      rakefile
      Schemafile
      Snapfile
      Steepfile
      Thorfile
      Vagabondfile
      Vagrantfile
      buildfile
    ].freeze

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
      when :dot
        arguments.delete("dot")
        @command = :dot
        command_dot
      when :eval
        arguments.delete("eval")
        @command = :eval
        command_eval
      when :ls
        arguments.delete("ls")
        @command = :ls
        command_ls
      when :strip
        arguments.delete("strip")
        @command = :strip
        command_strip
      when :rstrip
        arguments.delete("rstrip")
        @command = :rstrip
        command_rstrip
      when :lstrip
        arguments.delete("lstrip")
        @command = :lstrip
        command_lstrip
      when :merge
        arguments.delete("merge")
        @command = :merge
        command_merge
      when :pluck
        arguments.delete("pluck")
        @command = :pluck
        command_pluck
      when :shuffle
        arguments.delete("shuffle")
        @command = :shuffle
        command_shuffle
      when :rename
        arguments.delete("rename")
        @command = :rename
        command_rename
      when :replace
        arguments.delete("replace")
        @command = :replace
        command_replace
      when :sort
        arguments.delete("sort")
        @command = :sort
        command_sort
      when :table
        arguments.delete("table")
        @command = :table
        command_table
      when :then
        arguments.delete("then")
        @command = :then
        @ruby = arguments.delete_at(0)
        command_then
      when :times
        arguments.delete("times")
        @command = :times
        command_times
      when :uniq
        arguments.delete("uniq")
        @command = :uniq
        command_uniq
      when :write
        arguments.delete("write")
        @command = :write
        command_write
      when :release
        arguments.delete("release")
        @command = :release
        command_release
      when :top
        arguments.delete("top")
        @command = :top
        command_top
      when :tree
        arguments.delete("tree")
        @command = :tree
        command_tree
      when :format
        arguments.delete("format")
        @command = :format
        command_format
      when :pretty
        arguments.delete("pretty")
        @command = :pretty
        command_pretty
      else
        arguments.delete("read")
        @command = :read
        command_read
      end
    end

    def command_pretty
      command_format
    end

    def command_format
      context = MiniRacer::Context.new
      context.attach("puts", proc { |string| puts(string) })
      context.attach("warn", proc { |string| warn(string) })
      context.attach("read", proc { |path| File.read(path) })
      context.attach(
        "write",
        proc { |path, content| File.write(path, content) }
      )

      root = File.expand_path("../../", __dir__)

      prettier_path = File.join(root, "vendor/prettier/standalone.js")
      prettier_js = File.read(prettier_path)
      context.eval(prettier_js)

      sql_path = File.join(root, "vendor/sql-formatter.js")
      sql_js = File.read(sql_path)
      context.eval("self = {};")
      context.eval(sql_js)
      context.eval("sqlFormatter = self.sqlFormatter;")

      groovy_path = File.join(root, "vendor/groovy-beautify/dist/cjs/index.js")
      groovy_js = File.read(groovy_path)
      context.eval("module = { exports: {} };")
      context.eval("exports = module.exports;")
      context.eval(groovy_js)
      context.eval("groovyBeautify = module.exports;")

      plugins = %w[babel estree typescript html postcss markdown]

      plugins.each do |plugin|
        path = File.join(root, "vendor/prettier/plugins/#{plugin}.js")
        js = File.read(path)
        context.eval("module = { exports: {} };")
        context.eval("exports = module.exports;")
        context.eval(js)
        context.eval("#{plugin} = module.exports;")
      end

      context.eval("plugins = [#{plugins.join(", ")}];")

      context.eval(<<~JS)
        format = async (path, parser) => {
          try {
            const before = read(path);
            let after;

            if (parser === "sql") {
              after = sqlFormatter.format(before);
            } else if (parser === "groovy") {
              after = groovyBeautify(before);
            } else {
              after = await prettier.format(before, { parser, plugins });
            }

            if (before != after) {
              puts(path);
              write(path, after);
            }
          } catch (e) {
            warn(`failed to parse ${path}: ${e.message.split("\\n")[0]}`);
          }
        };
      JS

      if files.any?
        each(files) { |file| format(file, context:) }
      else
        each(
          Git.open(".").ls_files.map(&:first)
        ) { |file| format(file, context:) }
      end
    end

    def command_release
      File.delete(*Dir["*.gem"])
      system("gem build")
      system("gem push *.gem")
      File.delete(*Dir["*.gem"])
    end

    def command_top
      shell = arguments[0] || File.basename(ENV.fetch("SHELL", nil)) || "bash"
      limit = arguments[1] || 10

      history =
        case shell.to_s.downcase
        when "fish"
          File
            .read("#{Dir.home}/.local/share/fish/fish_history")
            .lines
            .grep(/^- cmd: /)
            .map { |line| line.split("- cmd: ", 2).last.strip }
        when "bash"
          File.read("#{Dir.home}/.bash_history").lines.map(&:strip)
        when "zsh"
          File.read("#{Dir.home}/.zsh_history").lines.map(&:strip)
        else
          raise NotImplementedError, shell
        end

      table(
        history
          .map { |line| line.split.first }
          .tally
          .to_a
          .sort_by(&:last)
          .reverse
          .map
          .with_index do |(command, command_count), index|
            {
              "#" => index + 1,
              :count => command_count,
              :percent =>
                "#{(command_count * 100 / history.size.to_f).round(3)}%",
              :command => command
            }
          end
          .first(limit)
      )
    end

    def command_tree
      space = "    "
      right = "└── "
      down = "│   "
      down_and_right = "├── "

      git_ls_files = ->(path) { Git.open(".").ls_files(path).map(&:first) }

      group =
        lambda do |files|
          files
            .group_by { |file| file.split("/").first }
            .transform_values do |values|
              group.call(
                values
                  .map { |value| value.split("/")[1..].join("/") }
                  .reject(&:empty?)
              )
            end
        end

      print =
        lambda do |key:, values:, index: 0, size: 1, prefix: ""|
          key = "#{key}/" if values.any?
          last = index + 1 == size
          right_prefix = last ? right : down_and_right
          puts prefix + right_prefix + key
          values.each.with_index do |(value_key, value_values), value_index|
            print.call(
              key: value_key,
              values: value_values,
              index: value_index,
              size: values.size,
              prefix: prefix + (last ? space : down)
            )
          end
        end

      keys = (arguments + files)
      keys = ["."] unless keys.any?

      keys.each do |key|
        files =
          git_ls_files
            .call(key)
            .map { |file| parsed.arguments.any? ? file.sub(key, "") : file }
        values = group.call(files)
        key = "#{key}/" if values.any? && key != "." && key[-1] != "/"
        puts key
        values.each.with_index do |(value_key, value_values), value_index|
          print.call(
            key: value_key,
            values: value_values,
            index: value_index,
            size: values.size
          )
        end
      end
    end

    def files
      parsed.files
    end

    def command_times
      map(everything, &:to_i).sum.times { |index| puts index + 1 }
    end

    def command_eval
      each(everything) { |thing| outputs(evaluates(ruby: thing)) }
    end

    def command_then
      each(stdin_files + files) do |input|
        outputs(evaluates(it: reads(File.read(input))), file: input)
      end

      each(stdin_arguments + arguments) do |input|
        outputs(evaluates(it: reads(input)))
      end
    end

    def command_table
      table(map(everything) { |thing| lines(reads(thing)) }.inject(&:+))
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

    def command_replace
      from, to = arguments

      each(stdin_files + stdin_arguments + files) do |file|
        next if File.directory?(file)

        File.write(file, File.read(file).gsub(from, to))
      end
    end

    def command_rename
      from, to = arguments
      files = stdin_files + stdin_arguments + self.files
      (files - directories).each { |file| rename(file, file.gsub(from, to)) }
      directories.each { |dir| rename(dir, dir.gsub(from, to)) }
    end

    def directories
      (stdin_files + files).select { |file| File.directory?(file) }
    end

    def rename(old, new)
      return if old == new

      puts "#{old} -> #{new}"
      File.rename(old, new)
    end

    def command_write
      content = read_stdin.join
      each(files + arguments) { |file| File.write(file, content) }
    end

    def command_read
      each(stdin_files + files) do |input|
        outputs(reads(File.read(input)), file: input)
      end

      each(stdin_arguments + arguments) { |input| outputs(reads(input)) }
    end

    def command_strip
      each(stdin_files + files) do |input|
        outputs(lines(reads(File.read(input)), strip: :strip), file: input)
      end

      each(stdin_arguments + arguments) do |input|
        outputs(lines(reads(input), strip: :strip))
      end
    end

    def command_rstrip
      each(stdin_files + files) do |input|
        outputs(lines(reads(File.read(input)), strip: :rstrip), file: input)
      end

      each(stdin_arguments + arguments) do |input|
        outputs(lines(reads(input), strip: :rstrip))
      end
    end

    def command_lstrip
      each(stdin_files + files) do |input|
        outputs(lines(reads(File.read(input)), strip: :lstrip), file: input)
      end

      each(stdin_arguments + arguments) do |input|
        outputs(lines(reads(input), strip: :lstrip))
      end
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

    def command_ls
      puts(
        Git
          .open(".")
          .ls_files
          .map(&:first)
          .map { |path| path.split("/").first }
          .reject { |path| path.start_with?(".") }
          .select { |path| match_filetypes?(path) }
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

    def command_dot
      dir = files.first || arguments.first || "."

      ignore_file = File.expand_path("#{dir.chomp("/")}/.dotignore")
      ignore_content = File.exist?(ignore_file) ? File.read(ignore_file) : ""
      ignore_patterns =
        ignore_content
          .lines
          .map(&:strip)
          .reject { |line| line.empty? || line.start_with?("#") }
          .map { |pattern| Regexp.new("\\A#{pattern}\\z") }

      Git
        .open(dir)
        .ls_files
        .map(&:first)
        .each do |file|
          next if ignore_patterns.any? { |pattern| pattern.match?(file) }

          homefile = "#{Dir.home}/#{file}"
          dotfile = File.expand_path("#{dir.chomp("/")}/#{file}")
          if File.exist?(homefile) || File.symlink?(homefile)
            File.delete(homefile)
          end
          FileUtils.mkdir_p(File.dirname(homefile))
          FileUtils.ln_s(dotfile, homefile, verbose: true)
        end
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

    def command_merge
      outputs(map(everything) { |thing| lines(reads(thing)) }.inject(&:+))
    end

    def command_sort
      outputs(
        map(everything) { |thing| lines(reads(thing)) }
          .inject(&:+)
          .sort_by do |line|
            result = pluck(line).from_deep_struct
            result.is_a?(Hash) ? result.values : result
          end
      )
    end

    def command_uniq
      outputs(
        map(everything) { |thing| lines(reads(thing)) }
          .inject(&:+)
          .uniq { |line| pluck(line) }
      )
    end

    def command_pluck
      outputs(
        map(everything) do |thing|
          map(lines(reads(thing))) { |line| pluck(line) }
        end.inject(&:+)
      )
    end

    def command_shuffle
      outputs(
        map(everything) { |thing| lines(reads(thing)) }.inject(&:+).shuffle
      )
    end

    def command_tally
      each(everything) do |input|
        outputs(
          JSON.pretty_generate(
            map(lines(reads(input)), progress: true) do |element|
              if ruby.to_s.empty?
                element
              else
                evaluates(it: element, returns: true, stdout: false)
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
      outputs(map(everything) { |input| lines(reads(input)) }.inject(&:+))
    end

    def command_prepend
      outputs(
        map(everything.reverse) { |input| lines(reads(input)) }.inject(&:+)
      )
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
      elsif !content.nil?
        puts to_output(content)
      end
    end

    def to_output(content)
      content = content.from_deep_struct

      case output
      when :csv
        "#{headers_of(content)&.to_csv}#{
          map(content) do |element|
            CSV.generate(headers: headers_of(content)) do |csv|
              csv << wrap(element)
            end
          end.join
        }"
      when :json
        pretty? ? JSON.pretty_generate(content) : content.to_json
      when :jsonl
        "#{map(content, &:to_json).join("\n")}\n"
      when :raw
        content
      when :yaml
        content.to_yaml
      when :yamll
        "#{map(map(content, &:to_yaml), &:to_json).join("\n")}\n"
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
      when :jsonl
        map(content.lines) { |line| JSON.parse(line) }.to_deep_struct
      when :raw
        content
      when :yaml
        YAML.safe_load(content).to_deep_struct
      when :yamll
        map(content.lines) do |line|
          YAML.safe_load(JSON.parse(line))
        end.to_deep_struct
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

    def lines(input, strip: :rstrip)
      if input.is_a?(String)
        input.lines.map(&strip)
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
      !!evaluates(ruby:, it: element, stdout: false, returns: true)
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

    def match_filetypes?(path, filetypes: arguments)
      return true if filetypes.none?
      return true unless filetypes.intersect?(%w[rb ruby])
      return false if Dir.exist?(path)
      return true if RUBY_FILENAMES.include?(path)
      return true if RUBY_EXTENSIONS.include?(File.extname(path))
      return false unless File.exist?(path)

      first_line = File.open(path, &:gets).to_s
      first_line = first_line.encode("UTF-8", invalid: :replace)

      return true if /\A#!.*ruby\z/.match?(first_line)

      false
    end

    def pluck(element)
      element = element.from_deep_struct

      keys =
        if arguments.any?
          arguments
        elsif element.is_a?(Hash)
          element.keys
        elsif element.is_a?(Array)
          (0...(element.size)).map(&:to_s)
        else
          "it"
        end

      results =
        keys.map do |argument|
          if element.is_a?(Array) && argument.to_i.to_s == argument
            element[argument.to_i]
          elsif element.is_a?(Hash) && element.key?(argument)
            { argument => element[argument] }
          else
            evaluates(ruby: argument, it: element.to_deep_struct)
          end
        end

      if results.all?(Hash)
        results.inject(&:merge).to_deep_struct
      else
        results
          .map { |result| result.is_a?(Hash) ? result.values.first : result }
          .to_deep_struct
      end
    end

    def table(data)
      is_hashes = data.first.from_deep_struct.is_a?(Hash)
      headings = is_hashes ? data.first.to_h.keys : nil
      rows = is_hashes ? data.map(&:values) : data.map { |row| wrap(row) }
      if headings
        puts Terminal::Table.new(headings:, rows:)
      else
        puts Terminal::Table.new(rows:)
      end
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
      ).returned
    end

    def sort(object)
      object = object.from_deep_struct

      if object.is_a?(Hash)
        object
          .to_a
          .sort_by(&:first)
          .to_h
          .transform_values { |value| sort(value) }
      elsif object.is_a?(Array)
        object.map { |element| sort(element) }
      else
        object
      end
    end

    def filetype(path)
      ext = File.extname(path).to_s.downcase
      return :directory if Dir.exist?(path)
      return :symlink if File.symlink?(path)
      return :ruby if RUBY_FILENAMES.include?(File.basename(path))
      return :ruby if RUBY_EXTENSIONS.include?(ext)
      return :json if ext == ".json"
      return :jsonl if ext == ".jsonl"
      return :yaml if ext == ".yaml"
      return :yaml if ext == ".yml"
      return :yamll if ext == ".yamll"
      return :yamll if ext == ".ymll"
      return :csv if ext == ".csv"
      return :js if ext == ".js"
      return :js if ext == ".mjs"
      return :js if ext == ".cjs"
      return :ts if ext == ".ts"
      return :css if ext == ".css"
      return :html if ext == ".html"
      return :html if ext == ".htm"
      return :haml if ext == ".haml"
      return :slim if ext == ".slim"
      return :erb if ext == ".erb"
      return :fish if ext == ".fish"
      return :sql if ext == ".sql"
      return :tex if ext == ".tex"
      return :md if ext == ".md"
      return :md if ext == ".markdown"
      return :png if ext == ".png"
      return :jpeg if ext == ".jpg"
      return :jpeg if ext == ".jpeg"
      return :ico if ext == ".ico"
      return :webp if ext == ".webp"
      return :heic if ext == ".heic"
      return :pdf if ext == ".pdf"
      return :raw if ext == ".raw"
      return :env if path == ".env"
      return :env if path.start_with?(".env.")
      return :sh if path == "Dockerfile"
      return :sh if ext == ".sh"
      return :enc if ext == ".enc"
      return :enc if ext == ".keystore"
      return :pro if ext == ".pro"
      return :txt if ext == ".txt"
      return :bat if ext == ".bat"
      return :xcconfig if ext == ".xcconfig"
      return :pbxproj if ext == ".pbxproj"
      return :xml if ext == ".xml"
      return :xml if ext == ".plist"
      return :xml if ext == ".storyboard"
      return :xml if ext == ".xcscheme"
      return :xml if ext == ".xcworkspacedata"
      return :xml if ext == ".xcprivacy"
      return :xml if ext == ".entitlements"
      return :kotlin if ext == ".kt"
      return :groovy if ext == ".gradle"
      return :groovy if ext == ".properties"
      return :binary if ext == ".jar"
      return :objectivec if ext == ".h"
      return :objectivec if ext == ".mm"
      return :objectivec if ext == ".m"
      return unless File.exist?(path)

      first_line = File.open(path, &:gets).to_s
      first_line = first_line.encode("UTF-8", invalid: :replace).strip
      return :ruby if first_line == "#!/usr/bin/env ruby"
      return :sh if first_line == "#!/bin/bash"
      return :sh if first_line == "#!/bin/sh"
      return :sh if first_line == "#!/bin/bash -e"
      return :sh if first_line == "#!/usr/bin/env sh"

      nil
    end

    def format(path, context:)
      return if File.symlink?(path)
      return if File.directory?(path)
      return unless File.exist?(path)

      before = File.read(path)

      case filetype(path)
      when :ruby
        after = SyntaxTree.format(before)
      when :haml
        after = SyntaxTree::Haml.format(before)
      when :erb
        after = SyntaxTree::ERB.format(before)
      when :xml
        after = SyntaxTree::XML.format(before)
      when :json
        after = JSON.pretty_generate(JSON.parse(before))
      when :jsonl
        after =
          "#{before.lines.map { |line| JSON.parse(line).to_json }.join("\n")}\n"
      when :csv
        after =
          "#{CSV.generate { |csv| CSV.parse(before).each { |row| csv << row } }}\n"
      when :yaml
        after = sort(YAML.safe_load(before)).to_yaml
      when :yamll
        after =
          "#{
            before
              .lines
              .map do |line|
                sort(YAML.safe_load(JSON.parse(line))).to_yaml.to_json
              end
              .join("\n")
          }\n"
      when :js
        context.eval("format(#{path.to_json}, 'babel')")
      when :ts
        context.eval("format(#{path.to_json}, 'typescript')")
      when :html
        context.eval("format(#{path.to_json}, 'html')")
      when :md
        context.eval("format(#{path.to_json}, 'markdown')")
      when :sql
        context.eval("format(#{path.to_json}, 'sql')")
      when :groovy
        context.eval("format(#{path.to_json}, 'groovy')")
      when :css
        context.eval("format(#{path.to_json}, 'css')")
      when :sh
        if system("command -v shfmt > /dev/null 2>&1")
          command = ["shfmt", "--indent", "4", path].shelljoin
          stdout, stderr, status = Open3.capture3(command)
          raise stderr unless stderr.empty? && status.success?

          after = stdout
        else
          warn "run: `brew install shfmt` for #{path}"
        end
      when :pdf
        doc = HexaPDF::Document.open(path)
        doc.trailer.info.each { |key, _| doc.trailer.info.delete(key) }
        doc.write(path, update_fields: false)
        after = File.read(path)
      when :tex
        if system("command -v latexindent > /dev/null 2>&1")
          command = ["latexindent", path, "--logfile", "/dev/null"].shelljoin
          stdout, stderr, status = Open3.capture3(command)
          raise stderr unless stderr.empty? && status.success?

          after = stdout.gsub("\t", "  ")
        else
          warn "run: `brew install latexindent` for #{path}"
        end
      when :objectivec
        if system("command -v clang-format > /dev/null 2>&1")
          command = ["clang-format", path].shelljoin
          stdout, stderr, status = Open3.capture3(command)
          raise stderr unless stderr.empty? && status.success?

          after = stdout.gsub("\t", "  ")
        else
          warn "run: `brew install clang-format` for #{path}"
        end
      when :kotlin
        if system("command -v ktlint > /dev/null 2>&1")
          command = ["ktlint", "-F", path].shelljoin
          stdout, stderr, status = Open3.capture3(command)
          raise stderr unless stderr.empty? && status.success?

          after = File.read(path)
        else
          warn "run: `brew install ktlint` for #{path}"
        end
      when :raw, :env, :enc, :txt, :pro, :binary, :slim, :fish, :bat, :xcconfig,
           :pbxproj, :jpeg, :png, :webp, :heic, :ico
        # nothing to do
      else
        case File.basename(path)
        when ".gitignore", ".node-version", ".prettierignore", ".ruby-version",
             ".tool-versions", "Gemfile.lock", "LICENSE", "VERSION", ".rspec",
             "Procfile", "Procfile.dev", "Podfile.lock", ".xcode.env", "CNAME",
             "TODO", ".gitmodules", ".asdfrc", "config", ".dotignore", ".gemrc",
             ".gitconfig", ".gitmessage", ".hushlogin", ".psqlrc", ".vimrc",
             "DIRECTORIES"
          # nothing to do
        when ".keep"
          File.write(path, "")
        else
          puts "unhandled: #{path}"
        end
      end

      if after && before != after
        puts path
        File.write(path, after)
      end
    rescue StandardError => e
      warn "failed to parse #{path}: #{e.message}"
    end
  end
end
