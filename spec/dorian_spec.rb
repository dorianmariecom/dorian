# frozen_string_literal: true

require "spec_helper"

RSpec.describe "Dorian" do
  it "has the dorian-times gem" do
    expect(`bin/times 3`).to eq("1\n2\n3\n")
  end

  it "has the dorian-each gem" do
    expect(`bin/times 2 | each "puts it.to_i * 2"`).to eq("2\n4\n")
  end
end
