# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name = "dorian"
  s.version = File.read("VERSION").strip
  s.summary = "a collection of gems"
  s.description = s.summary
  s.authors = ["Dorian Marié"]
  s.email = "dorian@dorianmarie.com"
  s.homepage = "https://github.com/dorianmariecom/dorian"
  s.license = "MIT"
  s.files = %w[VERSION bin/dorian lib/dorian/bin.rb]
  s.executables << "dorian"

  s.add_dependency "csv"
  s.add_dependency "dorian-arguments"
  s.add_dependency "dorian-eval"
  s.add_dependency "dorian-progress"
  s.add_dependency "dorian-to_struct"
  s.add_dependency "git"
  s.add_dependency "json"
  s.add_dependency "parallel"
  s.add_dependency "yaml"

  s.metadata = { "rubygems_mfa_required" => "true" }
  s.required_ruby_version = ">= 3"
end
