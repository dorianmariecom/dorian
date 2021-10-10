Gem::Specification.new do |s|
  s.name = 'dorian'
  s.version = '0.1.5'
  s.summary = 'A collection of gems'
  s.description = s.summary
  s.authors = ['Dorian Marié']
  s.email = 'dorian@dorianmarie.fr'
  s.homepage = 'https://github.com/dorianmariefr/gem'
  s.license = 'MIT'

  s.add_runtime_dependency 'dorian-all', '~> 0.1.4'
  s.add_runtime_dependency 'dorian-each', '~> 0.1.3'
  s.add_runtime_dependency 'dorian-git-tree', '~> 0.1.2'
  s.add_runtime_dependency 'dorian-replace', '~> 0.1.5'
  s.add_runtime_dependency 'dorian-shuffle', '~> 0.1.2'
  s.add_runtime_dependency 'dorian-times', '~> 0.1.0'
  s.add_runtime_dependency 'dorian-yaml-compare', '~> 0.1.0'
  s.add_runtime_dependency 'dorian-yaml-read-write', '~> 0.1.0'
end
