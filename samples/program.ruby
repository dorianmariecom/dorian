# frozen_string_literal: true

def sum_of_even_numbers(array)
  sum = 0
  array.each do |number|
    if number.even?
      sum += number
    end
  end
  sum
end

numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
result = sum_of_even_numbers(numbers)
puts "The sum of even numbers in the array is: #{result}"
