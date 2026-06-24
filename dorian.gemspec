# frozen_string_literal: true

Gem::Specification.new do |s|
  s.name = "dorian"
  s.version = File.read("VERSION").strip
  s.summary = "a collection of gems"
  s.description = "Installs Dorian's command line tools and their shared runtime dependencies."
  s.authors = ["Dorian Marié"]
  s.email = "dorian@dorianmarie.com"
  s.homepage = "https://github.com/dorianmariecom/dorian"
  s.license = "MIT"
  s.files = `git ls-files`.split("\n")
  s.executables << "dorian"

  s.add_dependency "csv", ">= 3.3.5", "< 4"
  s.add_dependency "dorian-arguments", ">= 1.2.3", "< 2"
  s.add_dependency "dorian-eval", ">= 1.5.1", "< 2"
  s.add_dependency "dorian-progress", ">= 1.1.3", "< 2"
  s.add_dependency "dorian-to_struct", ">= 2.0.3", "< 3"
  s.add_dependency "haml", ">= 6.4.0", "< 7.0"
  s.add_dependency "hexapdf", ">= 1.9.1", "< 2"
  s.add_dependency "json", ">= 2.20.0", "< 3"
  s.add_dependency "mini_racer", ">= 0.12.0", "< 0.13"
  s.add_dependency "ostruct", ">= 0.6.3", "< 1"
  s.add_dependency "parallel", ">= 1.28.0", "< 2.0"
  s.add_dependency "syntax_tree", ">= 6.3.0", "< 7"
  s.add_dependency "syntax_tree-haml", ">= 4.0.3", "< 5"
  s.add_dependency "syntax_tree-xml", ">= 0.1.0", "< 1"
  s.add_dependency "terminal-table", ">= 4.0.0", "< 5"
  s.add_dependency "w_syntax_tree-erb", ">= 0.12.0", "< 1"
  s.add_dependency "yaml", ">= 0.4.0", "< 1"

  s.metadata = { "rubygems_mfa_required" => "true" }
  s.required_ruby_version = ">= 3.0"
end
