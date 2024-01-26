Gem::Specification.new do |s|
  s.name = "dorian"
  s.version = "0.4.2"
  s.summary = "A collection of gems"
  s.description = "A collection of gem by Dorian Marié: all, dot, each, git-tree, replace, shuffle, sort-json, sort-yaml, times, yaml-compare, yaml-read-write"
  s.authors = ["Dorian Marié"]
  s.email = "dorian@dorianmarie.fr"
  s.homepage = "https://github.com/dorianmariefr/dorian"
  s.license = "MIT"
  s.files = ["LICENSE", "README.md", "dorian.gemspec"]

  s.add_runtime_dependency "dorian-all", "~> 0"
  s.add_runtime_dependency "dorian-dot", "~> 0"
  s.add_runtime_dependency "dorian-each", "~> 0"
  s.add_runtime_dependency "dorian-git-tree", "~> 0"
  s.add_runtime_dependency "dorian-replace", "~> 0"
  s.add_runtime_dependency "dorian-shuffle", "~> 0"
  s.add_runtime_dependency "dorian-sort-json", "~> 0"
  s.add_runtime_dependency "dorian-sort-yaml", "~> 0"
  s.add_runtime_dependency "dorian-times", "~> 0"
  s.add_runtime_dependency "dorian-yaml-compare", "~> 0"
  s.add_runtime_dependency "dorian-yaml-read-write", "~> 0"

  s.metadata = { "rubygems_mfa_required" => "true" }
end
