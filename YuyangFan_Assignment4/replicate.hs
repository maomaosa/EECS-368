replicate' :: Int -> a -> [a]
replicate' x y = [i | x' <- [0..x], let i = y ] -- it will running for x times, each time add an y to the list