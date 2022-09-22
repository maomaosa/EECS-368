find :: Eq a => a -> [(a,b)] -> [b]
find k t = [v| (k',v) <-t, k==k'] -- get the list of (a,b),return the list of b while a == input k

positions :: Eq a => a -> [a] -> [Int]
positions x xs = find x (zip xs [0..]) -- zip the xs list with list [0..], find the list of order while element same with x