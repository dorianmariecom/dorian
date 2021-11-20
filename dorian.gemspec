Gem::Specification.new do |s|
  s.name = "dorian"
  s.version = "0.3.2"
  s.summary = "A collection of gems"
  s.description = s.summary
  s.authors = ["Dorian Marié"]
  s.email = "dorian@dorianmarie.fr"
  s.homepage = "https://github.com/dorianmariefr/gem"
  s.license = "MIT"

  s.add_runtime_dependency "dorian-all", "~> 0.2.0"
  s.add_runtime_dependency "dorian-dot", "~> 0.1.0"
  s.add_runtime_dependency "dorian-each", "~> 0.2.0"
  s.add_runtime_dependency "dorian-git-tree", "~> 0.2.2"
  s.add_runtime_dependency "dorian-pw", "~> 0.2.0"
  s.add_runtime_dependency "dorian-replace", "~> 0.3.0"
  s.add_runtime_dependency "dorian-shuffle", "~> 0.2.0"
  s.add_runtime_dependency "dorian-sort-json", "~> 0.4.0"
  s.add_runtime_dependency "dorian-sort-yaml", "~> 0.2.0"
  s.add_runtime_dependency "dorian-tailwind", "~> 0.5.0"
  s.add_runtime_dependency "dorian-times", "~> 0.3.0"
  s.add_runtime_dependency "dorian-to_struct", "~> 0.2.0"
  s.add_runtime_dependency "dorian-yaml-compare", "~> 0.3.0"
  s.add_runtime_dependency "dorian-yaml-read-write", "~> 0.2.0"

  s.metadata = { "rubygems_mfa_required" => "true" }
end
