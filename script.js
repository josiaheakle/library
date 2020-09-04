

// Book object
function Book(title, author, pageAmt, isRead) {
    this.title = title;
    this.author = author;
    this.pageAmt = pageAmt;
    this.isRead = isRead;
}

Book.prototype.getBook = function() {
    return this;
}

// Function to add a book to the array
function addBookToLibrary(book, array) {
    array.push(book);
    return array;
}

// edit amount of columns if the width is too small/ too large
function editColumns(bookArray) {

    // decide how many rows and columns are needed
    let bodyWidth = document.body.clientWidth + 31;
    if (bodyWidth >= 1050) {
        columnAmt = 3;
    } else if (bodyWidth < 1050 && bodyWidth >= 700) {
        columnAmt = 2;
    } else if (bodyWidth < 700) {
        columnAmt = 1;
    }  

    switch(columnAmt) {
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
    for(let i=0; i<columnAmt; i++) {
        columnStr = `${columnStr} ${columnSize}`
    }
    
    editRows(myBooks, columnAmt);

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

let animOpen = false;
let bookChosen = false;

function animateClickBook(book) {
    clickBookDiv = document.querySelector('#click-book-container');

    let id;

    if(animOpen == false) {
        id = setInterval(frame, 2);
    }

    let pxAmt = 0;
    let pxStr = `${pxAmt}px`
    console.log(`animOpen: ${animOpen}`)
    // if(animOpen == false) {
        function frame() {
            console.log(`animOpen: ${animOpen}`)
            if(pxAmt == 400) {
                animOpen = true;
                clearInterval(id);
            } else {
                // console.log(pxStr);
                pxAmt+=5;
                pxStr = `${pxAmt}px`
                clickBookDiv.style.gridTemplateRows = pxStr;
            }
        }
    // }

    let focusBook = makeFocusBook(getBookById(book.id));


   
    
    // book.style.backgroundColor = 'lightslategray'
    if(!bookChosen) {
        clickBookDiv.appendChild(focusBook);
        bookChosen = true;
    }

    // console.log(`book.id clicked: ${book.id}`)
    // let id = setInterval(frame, 5);
    // let bool = false;
    // function frame() {
    //     if (/* check if animation has happened */ bool) {
    //         clearInterval(id);
    //     } else {
    //         book.style.height = '300px';
    //     }
    // }

}

function getBookById(index) {
    return myBooks[index];
}

function makeFocusBook(book) {
    focusBook = document.createElement('div');
    focusBook.style.backgroundColor = 'lightslategray';
    focusBook.style.display = 'flex';
    focusBook.style.flexDirection = 'column'
    focusBook.style.border = "1px solid gray"
    // focusBook.style.alignContent = 'center'
    focusBook.style.textAlign = 'center'
    
    focusTitle = document.createElement('h2');
    focusTitle.style.fontSize = '5em'
    focusTitle.textContent = book.title;
    focusTitle.style.marginBottom = '0px';

    focusBook.appendChild(focusTitle);

    focusAuthor = document.createElement('p');
    focusAuthor.style.fontSize = '2em'
    focusAuthor.style.marginBottom = '0px'
    focusAuthor.textContent = `by ${book.author}`;

    focusBook.appendChild(focusAuthor)

    focusPgAmt = document.createElement('p');
    focusPgAmt.style.fontSize = '1.5em'
    focusPgAmt.style.marginBottom = '0px'
    focusPgAmt.textContent = `Length - ${book.pageAmt} pages`

    focusBook.appendChild(focusPgAmt);

    focusIsRead = document.createElement('p');
    focusIsRead.style.fontSize = '1.5em'
    focusIsRead.textContent = ((book.isRead) ? `Read` : `Not Read`);

    focusBook.appendChild(focusIsRead)

    return focusBook;
}

function renderBooks(bookArray) {


    editColumns(bookArray);

    // For each book, create a container
    // Add title, author to each container,
    // Add animation to make container larger and show more information
    // Render it to screen

    let bkIndex = 0;

    myBooks.forEach(book => {

        // create container for book information
        bookCont = document.createElement('div');
        // bookCont.id = book.title;
        bookCont.style.display = 'flex';
        bookCont.style.flexDirection = 'column';
        bookCont.style.border = "1px solid gray"

        bookCont.id = bkIndex ++;

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

        bookCont.style.backgroundColor = 'lightskyblue';

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

        book.addEventListener('click', function() {
            animateClickBook(book);
        });
    
    });

    window.addEventListener("resize", function() {
        editColumns(bookArray);
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

