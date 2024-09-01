# frozen_string_literal: true

require "spec_helper"
require "json"
require "yaml"

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
      books = JSON.parse(File.read("samples/books.json"))
      books_pretty = "#{JSON.pretty_generate(books)}\n"
      books_ugly = "#{books.to_json}\n"
      books_yaml = "#{books.to_yaml}\n"

      expect(`bin/dorian samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian --pretty samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian --pretty true samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian --pretty false samples/books.json`).to eq(books_ugly)
      expect(`bin/dorian --input json samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian --io json samples/books.json`).to eq(books_pretty)
      expect(`bin/dorian --output yaml samples/books.json`).to eq(books_yaml)
    end
  end
end
