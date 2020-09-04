bookDiv = document.querySelector('#book-container');


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

// Array of books to be printed on screen
let myBooks = [];

// Placeholder books
book1 = new Book('fuck', 'fucker', 4, false);
book2 = new Book('shit', 'shitter', 6, true);
book3 = new Book('book', 'writer', 999, false);

// Adding placeholder books to array of books
myBooks = addBookToLibrary(book1, myBooks);
myBooks = addBookToLibrary(book2, myBooks);
myBooks = addBookToLibrary(book3, myBooks);

// For each book, create a container
// Add title, author, ect to container
// Render it to screen
myBooks.forEach(book => {
    console.log(book.title + '\n' + book.author)

    // create container for book information
    bookCont = document.createElement('div');
    bookCont.id = book.title;
    bookCont.style.display = 'flex';
    bookCont.style.flexDirection = 'column';


    bookHeader = document.createElement('h2');
    // bookHeader.style.fontSize = "2em";
    bookHeader.textContent = book.title;
    bookHeader.style.margin = '0px 0px 0px 0px;'
    bookCont.appendChild(bookHeader);

    bookAuthor = document.createElement('p');
    bookAuthor.textContent = `by ${book.author}`
    bookCont.appendChild(bookAuthor)

    bookPageAmt = document.createElement('p');
    bookPageAmt.style.fontWeight = 'lighter';
    bookPageAmt.textContent = `Page Amount : ${book.pageAmt}`;
    bookCont.appendChild(bookPageAmt);

    if(book.isRead) {
        bookCont.style.backgroundColor = 'lightslategray'
    } else {
        bookCont.style.backgroundColor = 'lightskyblue'
    }

    bookDiv.appendChild(bookCont);
});