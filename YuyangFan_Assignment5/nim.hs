import Data.Maybe
import Data.List




type Board = [Int]
initial :: Board
initial = [5,4,3,2,1] -- the initial list

 -- switch the player
switchplayer :: Int -> Int
switchplayer 1 = 2 -- player 1 -> 2
switchplayer 2 = 1 -- player 2 ->1

replaceAtIndex :: Int -> a -> [a] -> [a]    
replaceAtIndex i x xs = take i xs ++ [x] ++ drop (i+1) xs --inver number by taking i number ++ insert number ++ left number drop the head one




-- Get list of the things that need to print
displayboard :: Board -> [Char]
displayboard board = concat (zipWith (++) numbers (starboard board)) -- zip and concat
            where numbers = [ "1. ", "\n2. ", "\n3. ", "\n4. ", "\n5. "] -- numbers for the first col
                  starboard board = [ concat (replicate n "* ") | n <- board] -- get the list of "* " with the size of a board's list





play :: Board -> Int -> IO()
play board num = do putStrLn (displayboard board) -- print the board
                    if board == [0,0,0,0,0] -- check if it finished
						then do putStrLn ("\nWinner is player " ++ (show (switchplayer num))) -- if finished show the winner
                    else do putStrLn ("\nplayer " ++ (show num)) -- show player's turn
                            putStrLn "Enter a row number: " -- get the row number
                            row <- getLine
                            putStrLn "Stars to remove: " -- get the stars number
                            starsnumber <- getLine
                            (if (read row) < 1 || (read row) > 5 || board !! ((read row) -1) < (read starsnumber) || (read starsnumber) < 1 -- if row < 1 || row >5 || board[row-1] < starsnumber || stars number <1
                                then do putStrLn "Invalid Input!!!\n" -- Invalid put
                                        play board num -- recursive
                             else do let newboard = replaceAtIndex (read row -1) (board !! (read row -1) - (read starsnumber) ) board -- get the new board which minue the stars number
                                     let newplayer = switchplayer num -- get the new player 
                                     play newboard newplayer ) -- recursive


nim :: IO ()
nim = play initial 1