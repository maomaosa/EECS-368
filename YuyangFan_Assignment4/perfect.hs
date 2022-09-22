perfects :: Int -> [Int]
perfects num = [p_num | p_num <- [1..num], sum [factors | factors <- [1..(p_num-1)], p_num `mod` factors == 0 ] == p_num ]
-- running the function for num's times, test the numbers from 1 - num
-- determine the sum of specific num's factors, if the sum of factors == num, add it to the list