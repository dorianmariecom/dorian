# frozen_string_literal: true

def sum_of_even_numbers(array)
  sum = 0
  array.each { |number| sum += number if number.even? }
  sum
end

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

sum_of_even_numbers(numbers)
