Gem::Specification.new do |s|
  s.name = "dorian"
  s.version = "0.1.0"
  s.summary = "A collection of gems"
  s.description = "dorian-each, dorian-all, dorian-replace, dorian-shuffle"
  s.authors = ["Dorian Marié"]
  s.email = "dorian@dorianmarie.fr"
  s.homepage = "https://github.com/dorianmariefr/gem"
  s.license = "MIT"

  s.add_runtime_dependency 'dorian-each'
  s.add_runtime_dependency 'dorian-all'
  s.add_runtime_dependency 'dorian-replace'
  s.add_runtime_dependency 'dorian-shuffle'
end
