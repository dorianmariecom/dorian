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
    end
  end
end
