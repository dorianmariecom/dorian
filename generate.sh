#!/bin/bash

set -e

find . -type f | grep gemspec | grep -v "/gem/" | each "content = File.read(l.strip).lines.map(&:strip); version = content.grep(/s.version/).first.split('= ').last; version = version[0] + '~> ' + version[1..-1]; name = content.grep(/s.name/).first.split('= ').last; puts \"s.add_runtime_dependency #{name}, #{version}\"" | sort

echo

find . -type f | grep gemspec | grep -v "/gem/" | each "content = File.read(l.strip).lines.map(&:strip); name = content.grep(/s.name/).first.split('= ').last[1..-2]; puts \"- [#{name}](https://github.com/dorianmariefr/#{name.gsub('dorian-', '')})\"" | sort

