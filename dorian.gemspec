# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name = "dorian"
  s.version = "0.5.7"
  s.summary = "A collection of gems"
  s.description =
    "A collection of gems by Dorian Marié"
  s.authors = ["Dorian Marié"]
  s.email = "dorian@dorianmarie.com"
  s.homepage = "https://github.com/dorianmariecom/dorian"
  s.license = "MIT"
  s.files = %w[LICENSE README.md dorian.gemspec]

  s.add_dependency "dorian-all", "~> 0"
  s.add_dependency "dorian-anonymize", "~> 0"
  s.add_dependency "dorian-anonymize-json", "~> 0"
  s.add_dependency "dorian-anonymize-yaml", "~> 0"
  s.add_dependency "dorian-dot", "~> 0"
  s.add_dependency "dorian-each", "~> 0"
  s.add_dependency "dorian-git-ls-ruby-files", "~> 0"
  s.add_dependency "dorian-git-tree", "~> 0"
  s.add_dependency "dorian-parallel", "~> 0"
  s.add_dependency "dorian-pretty", "~> 0"
  s.add_dependency "dorian-release", "~> 0"
  s.add_dependency "dorian-replace", "~> 0"
  s.add_dependency "dorian-shuffle", "~> 0"
  s.add_dependency "dorian-sort-json", "~> 0"
  s.add_dependency "dorian-sort-yaml", "~> 0"
  s.add_dependency "dorian-times", "~> 0"
  s.add_dependency "dorian-top", "~> 0"
  s.add_dependency "dorian-yaml-compare", "~> 0"
  s.add_dependency "dorian-yaml-read-write", "~> 0"

  s.metadata = { "rubygems_mfa_required" => "true" }
end
