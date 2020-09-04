

// Book object
function Book(title, author, pageAmt, isRead) {
    this.title = title;
    this.author = author;
    this.pageAmt = pageAmt;
    this.isRead = isRead;
}

// Function to add a book to the array
function addBookToLibrary(book, array) {
    array.push(book);
    return array;
}

function editColumns(columnNeeded) {

    switch(columnNeeded) {
        case(3):
            columnSize = `30vw`
            break;
        case(2):
            columnSize = `45vw`
            break;
        case(1):
            columnSize = `90vw`
            break;
    }

    let columnStr = '';
    for(let i=0; i<columnNeeded; i++) {
        // console.log(`columnNeeded, columnStr: ${columnStr}`)
        columnStr = `${columnStr} ${columnSize}`
    }
    
    editRows(myBooks, columnNeeded);

    bookDiv.style.gridTemplateColumns = `${columnStr}`
}

// Function to add amount of rows needed 
// to display each book
function editRows(bookArray, columnAmt) {
    let rowAmtNeeded = (bookArray.length/columnAmt);
    let rowStr = '';
    rowAmt = 0;
    while(rowAmt < rowAmtNeeded) {
        // console.log(rowStr)
        rowStr = `${rowStr} 120px`
        bookDiv.style.gridTemplateRows = rowStr;
        rowAmt ++;
    } 


}

function renderBooks(bookArray) {

    // decide how many rows and columns are needed
    let bodyWidth = document.body.clientWidth + 31;
    // console.log(`Body Width: ${bodyWidth}`)
    if (bodyWidth >= 950) {
        columnAmt = 3;
    } else if (bodyWidth < 950 && bodyWidth >= 620) {
        columnAmt = 2;
    } else if (bodyWidth < 620 && bodyWidth >= 340) {
        columnAmt = 1;
    }  
    editColumns(columnAmt);

    // For each book, create a container
    // Add title, author to each container,
    // Add animation to make container larger and show more information
    // Render it to screen

    myBooks.forEach(book => {

        // create container for book information
        bookCont = document.createElement('div');
        bookCont.id = book.title;
        bookCont.style.display = 'flex';
        bookCont.style.flexDirection = 'column';
        bookCont.style.border = "1px solid gray"

        // Add book title to the container
        bookHeader = document.createElement('h2');
        bookHeader.textContent = book.title;
        bookCont.appendChild(bookHeader);

        // Add book author to the container
        bookAuthor = document.createElement('p');
        bookAuthor.style.fontStyle = 'italic'
        bookAuthor.textContent = `by ${book.author}`
        bookCont.appendChild(bookAuthor)

        // bookPageAmt = document.createElement('p');
        // bookPageAmt.style.fontWeight = 'lighter';
        // bookPageAmt.textContent = `Page Amount : ${book.pageAmt}`;
        // bookCont.appendChild(bookPageAmt);

        bookCont.style.backgroundColor = 'lightskyblue'

        // add each book to book container
        bookDiv.appendChild(bookCont);
    });

    // Add hover effect when mouse hovers over each book 
    const books = bookDiv.querySelectorAll('div');
    books.forEach(book => {
    
        book.onmouseover = function() {
            book.style.backgroundColor = 'lightslategray'
        }
        book.onmouseout = function() {
            book.style.backgroundColor = 'lightskyblue'
        }
    
    });

    const body = document.querySelector('body');
    window.addEventListener("resize", function() {
        bodyWidth = document.body.clientWidth + 31;
        // console.log(`Body Width: ${bodyWidth}`)
        if (bodyWidth >= 950) {
            columnAmt = 3;
        } else if (bodyWidth < 900 && bodyWidth >= 620) {
            columnAmt = 2;
        } else if (bodyWidth < 620 && bodyWidth >= 340) {
            columnAmt = 1;
        }  
        editColumns(columnAmt);
    });

}

// Book container 
bookDiv = document.querySelector('#book-container');
// Amount of rows on screen 
let rowAmt = 0;
let columnAmt = 3;

// Array of books to be printed on screen
let myBooks = [];

// Placeholder books
book1 = new Book('Fuck', 'fucker', 4, false);
book2 = new Book('Book that has an even longer title', 'shitter', 6, true);
book3 = new Book('Book that has a long title', 'writer', 999, false);

// Adding placeholder books to array of books
myBooks = addBookToLibrary(book1, myBooks);
myBooks = addBookToLibrary(book2, myBooks);
myBooks = addBookToLibrary(book3, myBooks);
myBooks = addBookToLibrary(book3, myBooks);
myBooks = addBookToLibrary(book1, myBooks);
myBooks = addBookToLibrary(book2, myBooks);
myBooks = addBookToLibrary(book3, myBooks);
myBooks = addBookToLibrary(book3, myBooks);
myBooks = addBookToLibrary(book1, myBooks);
myBooks = addBookToLibrary(book2, myBooks);
myBooks = addBookToLibrary(book3, myBooks);
myBooks = addBookToLibrary(book3, myBooks);
myBooks = addBookToLibrary(book1, myBooks);
myBooks = addBookToLibrary(book2, myBooks);
myBooks = addBookToLibrary(book3, myBooks);
myBooks = addBookToLibrary(book3, myBooks);
myBooks = addBookToLibrary(book1, myBooks);
myBooks = addBookToLibrary(book2, myBooks);
myBooks = addBookToLibrary(book3, myBooks);

renderBooks(myBooks)

