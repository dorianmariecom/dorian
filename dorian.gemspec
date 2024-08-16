# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name = "dorian"
  s.version = "0.7.6"
  s.summary = "A collection of gems"
  s.description = "A collection of gems by Dorian Marié"
  s.authors = ["Dorian Marié"]
  s.email = "dorian@dorianmarie.com"
  s.homepage = "https://github.com/dorianmariecom/dorian"
  s.license = "MIT"
  s.files = %w[LICENSE README.md dorian.gemspec]

  s.add_dependency "dorian-all"
  s.add_dependency "dorian-anonymize"
  s.add_dependency "dorian-anonymize-json"
  s.add_dependency "dorian-anonymize-yaml"
  s.add_dependency "dorian-csv-all"
  s.add_dependency "dorian-csv-each"
  s.add_dependency "dorian-csv-merge"
  s.add_dependency "dorian-dir"
  s.add_dependency "dorian-dir-and-self"
  s.add_dependency "dorian-dot"
  s.add_dependency "dorian-each"
  s.add_dependency "dorian-git-ls-ruby-files"
  s.add_dependency "dorian-git-tree"
  s.add_dependency "dorian-parallel"
  s.add_dependency "dorian-pretty"
  s.add_dependency "dorian-release"
  s.add_dependency "dorian-rename"
  s.add_dependency "dorian-replace"
  s.add_dependency "dorian-shuffle"
  s.add_dependency "dorian-sort-json"
  s.add_dependency "dorian-sort-yaml"
  s.add_dependency "dorian-times"
  s.add_dependency "dorian-top"
  s.add_dependency "dorian-write"
  s.add_dependency "dorian-yaml-compare"
  s.add_dependency "dorian-yaml-read-write"

  s.metadata = { "rubygems_mfa_required" => "true" }
end
