var array = ["hello", "faith", "queue", "green", "eight"]
var currentRow = 0;
var todayWord = array[Math.floor(Math.random() * array.length)];
var input = "";
var solved = false;

document.addEventListener('keydown', function(event) {
    if (event.defaultPrevented) {
        return; // Do nothing if the event was already processed
      }
    var key = event.key;
    letterPress(key);
    event.preventDefault();
}, true);

function letterPress(value)
{
    if (solved)
        return ;
    if (value.length == 1 
        && (value.toUpperCase() != value.toLowerCase()) 
        && input.length < 5)
    {
        input += value;
        updateRow();
    }
    else if ((input.length > 0)
            && (value === "Backspace" ||  value === "Delete"))
    {
        input = input.substring(0, input.length - 1);
        updateRow();
    }
    else if ((input.length == 5)
            && (value === "Enter"))
    {
        submitWord();
    }
}

function updateRow()
{
    input = input.toUpperCase();
    if (input.length > 5)
        input.substring(0,5);
    var table = document.getElementById("table");
    for (var i = 0; i < 5; i++)
    {
        var character = "";
        if (i < input.length)
            character = input[i];
        table.rows[currentRow].cells[i].innerHTML = character;
    }
}

function    clearWord()
{
    input = "";
    for (var i = 0; i < 5; i++)
    {
        table.rows[currentRow].cells[i].innerHTML = "";
    }
    updateRow();
}

function    backspaceLetter()
{
    if (input.length > 0)
        input = input.substring(0, input.length - 1);
    updateRow();
}

function    submitWord()
{
    var correctLetters = 0;
    word = todayWord.toUpperCase();
    var row = document.getElementById("table").rows[currentRow];
    if (input.length != 5)
        return ;
    for (var c = 0; c < 5; c++)
    {
        cell = row.cells[c];
        if (word[c] === input[c])
        {
            cell.className += (cell.className ? " " : "")+"Correct";
            document.getElementById(input[c]).className = "Correct";
            correctLetters += 1;
        }
        else if (word.search(cell.innerHTML) != -1)
        {
            cell.className += (cell.className ? " " : "")+"Present";
            if (document.getElementById(input[c]).className != "Correct")
              document.getElementById(input[c]).className = "Present";
        }
           
        else
        {
            cell.className += (cell.className ? " " : "")+"Nothing";
            if (document.getElementById(input[c]).className != "Correct" 
                 && document.getElementById(input[c]).className != "Present")
                document.getElementById(input[c]).className = "Nothing";
        }
    }
    currentRow += 1;
    input = "";
    if (correctLetters == 5)
        solved = true;
}

function newWord()
{
    solved = false;
    input = "";
    while (currentRow >= 0)
    {
        for (var i = 0; i < 5; i++)
        {
            table.rows[currentRow].cells[i].innerHTML = "";
            table.rows[currentRow].cells[i].className = "";
        }
        currentRow -= 1;
    }
    for (var c = "A".charCodeAt(0); c <= "Z".charCodeAt(0); c++)
    {
        document.getElementById(String.fromCharCode(c)).className = "";
    }
    currentRow = 0;
    todayWord = array[Math.floor(Math.random() * array.length)];
}