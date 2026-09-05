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

  s.add_dependency "csv", ">= 3.3.6", "< 4"
  s.add_dependency "dorian-arguments", ">= 2.0.0", "< 3"
  s.add_dependency "dorian-eval", ">= 2.0.0", "< 3"
  s.add_dependency "dorian-progress", ">= 2.0.0", "< 3"
  s.add_dependency "dorian-to_struct", ">= 3.0.0", "< 4"
  s.add_dependency "haml", ">= 7.5.1", "< 8.0"
  s.add_dependency "hexapdf", ">= 1.10.0", "< 2"
  s.add_dependency "json", ">= 2.21.2", "< 3"
  s.add_dependency "mini_racer", ">= 0.22.1", "< 1"
  s.add_dependency "ostruct", ">= 0.6.3", "< 1"
  s.add_dependency "parallel", ">= 2.1.0", "< 3.0"
  s.add_dependency "syntax_tree", ">= 6.3.0", "< 7"
  s.add_dependency "syntax_tree-haml", ">= 4.0.3", "< 5"
  s.add_dependency "syntax_tree-xml", ">= 0.1.0", "< 1"
  s.add_dependency "terminal-table", ">= 4.0.0", "< 5"
  s.add_dependency "w_syntax_tree-erb", ">= 0.12.0", "< 1"
  s.add_dependency "yaml", ">= 0.4.0", "< 1"

  s.metadata = { "rubygems_mfa_required" => "true" }
  s.required_ruby_version = ">= 4.0"
end
