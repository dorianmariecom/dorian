# frozen_string_literal: true

require "spec_helper"
require "json"
require "yaml"
require "csv"

RSpec.describe "Dorian" do
  describe "--version" do
    it "works" do
      version = File.read("VERSION")
      expect(`bin/dorian -v 2>&1`).to eq(version)
      expect(`bin/dorian --version 2>&1`).to eq(version)
    end
  end

  describe "--help" do
    it "works" do
      expect(`bin/dorian -h 2>&1`).to include("USAGE")
      expect(`bin/dorian --help 2>&1`).to include("USAGE")
    end
  end

  describe "read" do
    it "works" do
      books_original = File.read("samples/books.json")
      books = JSON.parse(books_original)
      books_pretty = "#{JSON.pretty_generate(books)}\n"
      books_ugly = "#{books.to_json}\n"
      books_yaml = books.to_yaml
      books_csv =
        CSV.generate(headers: books.first.keys) do |csv|
          csv << books.first.keys

          books.each { |book| csv << book }
        end

      books_headers = books_csv.lines[0]
      books_first_line = books_csv.lines[1]

      expect(`bin/dorian samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian -io raw samples/books.json`).to eq(books_original)
      expect(`bin/dorian --input raw --output raw samples/books.json`).to eq(
        books_original
      )
      expect(`bin/dorian --pretty samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian --pretty true samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian --pretty false samples/books.json`).to eq(books_ugly)
      expect(`bin/dorian --input json samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian --io json samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian --output yaml samples/books.json`).to eq(books_yaml)
      expect(`bin/dorian --output csv samples/books.json`).to eq(books_csv)
      expect(`bin/dorian -p samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian -p --pretty samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian -p --pretty true samples/books.json`).to eq(
        books_pretty
      )
      expect(`bin/dorian -p --pretty false samples/books.json`).to eq(
        books_ugly
      )
      expect(`bin/dorian -p --input json samples/books.json`).to eq(
        books_pretty
      )
      expect(`bin/dorian -p --io json samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian -p --output yaml samples/books.json`).to eq(books_yaml)
      expect(`bin/dorian -p --output csv samples/books.json`).to include(
        books_headers
      )
      expect(`bin/dorian -p --output csv samples/books.json`).to include(
        books_first_line
      )
      expect(`bin/dorian read samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian read -io raw samples/books.json`).to eq(books_original)
      expect(
        `bin/dorian read --input raw --output raw samples/books.json`
      ).to eq(books_original)
      expect(`bin/dorian read --pretty samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian read --pretty true samples/books.json`).to eq(
        books_pretty
      )
      expect(`bin/dorian read --pretty false samples/books.json`).to eq(
        books_ugly
      )
      expect(`bin/dorian read --input json samples/books.json`).to eq(
        books_pretty
      )
      expect(`bin/dorian read --io json samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian read --output yaml samples/books.json`).to eq(
        books_yaml
      )
      expect(`bin/dorian read --output csv samples/books.json`).to eq(books_csv)
      expect(`bin/dorian read -p samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian read -p --pretty samples/books.json`).to eq(
        books_pretty
      )
      expect(`bin/dorian read -p --pretty true samples/books.json`).to eq(
        books_pretty
      )
      expect(`bin/dorian read -p --pretty false samples/books.json`).to eq(
        books_ugly
      )
      expect(`bin/dorian read -p --input json samples/books.json`).to eq(
        books_pretty
      )
      expect(`bin/dorian read -p --io json samples/books.json`).to eq(
        books_pretty
      )
      expect(`bin/dorian read -p --output yaml samples/books.json`).to eq(
        books_yaml
      )
      expect(`bin/dorian read -p --output csv samples/books.json`).to include(
        books_headers
      )
      expect(`bin/dorian read -p --output csv samples/books.json`).to include(
        books_first_line
      )
    end
  end

  describe "all" do
    it "works" do
      input = "echo [1, 2, 3]"
      command = "bin/dorian all --io json"
      input_command = "#{input} | #{command}"
      expect(`#{input_command} "p it.first"`).to eq("1\n")
    end
  end

  describe "after" do
    it "works" do
      input = "cat samples/numbers.raw"
      command = "bin/dorian after"
      input_command = "#{input} | #{command}"
      expect(`#{input_command} "it.to_i == 8"`).to eq(<<~OUTPUT)
      8
      9
      10
      OUTPUT
      expect(`#{input_command} 7`).to eq(<<~OUTPUT)
      8
      9
      10
      OUTPUT
    end
  end

  describe "before" do
    it "works" do
      input = "cat samples/numbers.raw"
      command = "bin/dorian before"
      input_command = "#{input} | #{command}"
      expect(`#{input_command} "it.to_i == 3"`).to eq(<<~OUTPUT)
      1
      2
      3
      OUTPUT
      expect(`#{input_command} 2`).to eq(<<~OUTPUT)
      1
      2
      3
      OUTPUT
    end
  end

  describe "between" do
    it "works" do
      input = "cat samples/numbers.raw"
      command = "bin/dorian between"
      input_command = "#{input} | #{command}"
      expect(`#{input_command} "it.to_i == 3" "it.to_i == 5"`).to eq(<<~OUTPUT)
      3
      4
      5
      OUTPUT
      expect(`#{input_command} 2 4`).to eq(<<~OUTPUT)
      3
      4
      5
      OUTPUT
    end
  end

  describe "tally" do
    it "works" do
      input = "cat samples/numbers.raw"
      command = "bin/dorian tally"
      input_command = "#{input} | #{command}"
      expect(`#{input_command} "it.to_i > 2"`).to eq(<<~OUTPUT)
      {
        "false": 2,
        "true": 8
      }
      OUTPUT
    end
  end

  describe "select" do
    it "works" do
      input = "cat samples/numbers.raw"
      command = "bin/dorian select"
      input_command = "#{input} | #{command}"
      expect(`#{input_command} "it.to_i.even?"`).to eq(<<~OUTPUT)
      2
      4
      6
      8
      10
      OUTPUT
    end
  end

  describe "reject" do
    it "works" do
      input = "cat samples/numbers.raw"
      command = "bin/dorian reject"
      input_command = "#{input} | #{command}"
      expect(`#{input_command} "it.to_i.even?"`).to eq(<<~OUTPUT)
      1
      3
      5
      7
      9
      OUTPUT
    end
  end

  describe "each" do
    it "works" do
      input = "echo [1, 2, 3]"
      command = "bin/dorian each --io json --parallel false --fast false"
      input_command = "#{input} | #{command}"
      expect(`#{input_command} "p it"`).to eq(<<~OUTPUT)
      1
      2
      3
      OUTPUT
      expect(`#{input_command} -deep "p it"`).to eq(<<~OUTPUT)
      [1, 2, 3]
      1
      2
      3
      OUTPUT
      expect(`#{input_command} --debug "p it"`).to eq(<<~OUTPUT)
      [1] 1
      [2] 2
      [3] 3
      OUTPUT
      expect(`#{input_command} -deep --debug "p it"`).to eq(<<~OUTPUT)
      [[1, 2, 3]] [1, 2, 3]
      [1] 1
      [2] 2
      [3] 3
      OUTPUT
      expect(`#{input_command} --stdout false "p it"`).to eq("")
      expect(`#{input_command} --stdout false -deep "p it"`).to eq("")
      expect(`#{input_command} --stdout false --debug "p it"`).to eq("")
      expect(`#{input_command} --stdout false -deep --debug "p it"`).to eq("")
      expect(`#{input_command} --parallel "p it"`).to include("1")
      expect(`#{input_command} --parallel -deep "p it"`).to include("1")
      expect(`#{input_command} --parallel --debug "p it"`).to include("[1] 1")
      expect(`#{input_command} --parallel -deep --debug "p it"`).to include(
        "[1] 1"
      )
      expect(`#{input_command} --parallel --stdout false "p it"`).to eq("")
      expect(`#{input_command} --parallel --stdout false -deep "p it"`).to eq(
        ""
      )
      expect(`#{input_command} --parallel --stdout false --debug "p it"`).to eq(
        ""
      )
      expect(
        `#{input_command} --parallel --stdout false -deep --debug "p it"`
      ).to eq("")
    end
  end
end
