console.log("Looping a triangle"); //name of the ex2.1
for (let line = '*'; line.length <= 8; line += '*')//the condition that each time loop with line add with '*'.
//untill its length is bigger than 8.
{
    console.log(line); //print the var line
}

console.log("FizzBuzz"); //name of the ex 2.2
for(var num=1; num<=100; num++) //the condition that loop the munber from 1 to 100)
{
    if(num%5 === 0 && num%7 === 0) //Dvisible by both 5 and 7
    {
        console.log("Dvisible by both 5 and 7");
    }
    else if(num%5 === 0) //Dvisible by 5
    {
        console.log("Dvisible by 5");
    }
    else if (num%7 === 0) //Dvisible by 7, but not 5
    {
        console.log("Dvisible by 7, but not 5");
    }
    else // print the num
    {
        console.log(num);
    }
}


console.log("n-by-n Grid"); //name of the ex 2.3
var size = prompt("take a number"); //get a number from user
console.log(`the size is ${size}`); // print the number
var line = null; // create a line to store the character
for (let row_size =0; row_size <size; row_size ++) //loop this for five times for row
{
    for(let col_size =0; col_size <size; col_size ++)//loop this for five times for coloumn
    {
        if((row_size + col_size)% 2 === 0) //while the row + col === even, add space
        {
            if(line === null) // while it is the first character, initialize the line.
            {
                line = ' ';
            }
            else
            {
                line+=' ';
            }
        }
        if((row_size + col_size)% 2 === 1) //while the row + col === even, add '*'
        {
            if(line === null) // while it is the first character, initialize the line.
            {
                line = '*';
            }
            else
            {
                line+='*';
            }
        }
    }
    line+= '\n'; //switch the line
    
}
console.log(line);// print the string