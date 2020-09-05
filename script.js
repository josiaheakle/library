

// Book object
function Book(title, author, pageAmt, isRead, ISBN = '', pubDate = '0/0/0', notes = '') {
    this.title = title;
    this.author = author;
    this.pageAmt = pageAmt;
    this.isRead = isRead;
    this.isbn = ISBN;
    this.pubDate = pubDate;
    this.notes = notes;
}

// Function to add a book to the array
function addBookToLibrary(book, array) {
    array.push(book);
    return array;
}

// returns the book in the array by the proper index
// this returns the book not the element containing the information in the book
function getBookById(index) {
    return myBooks[index];
}

let inputSize = '50vw';
// edit amount of columns if the width is too small/ too large
function editColumns(bookArray) {
    // decide how many rows and columns are needed
    let bodyWidth = document.body.clientWidth + 31;
    
    const input = document.querySelectorAll('input')
    if (bodyWidth >= 1050) {
        
        inputSize = '50vw'
        columnAmt = 3;
    } else if (bodyWidth < 1050 && bodyWidth >= 700) {
        inputSize = '65vw'
        columnAmt = 2;
    } else if (bodyWidth < 700) {
        inputSize = '80vw'
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
    // if(input) {
        input.forEach(cont => {
            if(cont.value == 'Submit') {
                cont.style.width = inputSize/2;
            } else if (cont.type == 'checkbox') {
                
            } else {
                cont.style.width = inputSize;
            }
        });
    // }
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

function closeForm() {
    const inputs = inputForm.querySelectorAll('.add-book-class')
    inputs.forEach(formItem => {
        console.log(inputForm.id)
        inputForm.removeChild(formItem);
    });
}

function addBookFromForm() {

    let title = inputForm.querySelector('#title').value;
    let author = inputForm.querySelector('#author').value;
    let pageAmt = inputForm.querySelector('#pageAmt').value;
    let isbn = inputForm.querySelector('#isbn').value;
    let isRead = inputForm.querySelector('#is-read').checked;
    let pubDate = inputForm.querySelector('#pub-date');

    let book = new Book(title, author, pageAmt, isRead, isbn, pubDate)
    myBooks = addBookToLibrary(book, myBooks)
    closeForm();
    renderBooks();
    

    // return false so the page is not reloaded
    return false;
}

// Create and render new book form on screen
// Input book information and add it to the array,
// Call render books 
function addBook(bookArray) {


/*
    this.title = title;
    this.author = author;
    this.pageAmt = pageAmt;
    this.isRead = isRead;
    this.isbn = ISBN;
    this.pubDate = pubDate;
    this.notes = notes;
*/

    // create form and render to screen
    inputForm;// input form

    titleInput = document.createElement('input');
    titleInput.id = 'title';
    titleInput.className = 'add-book-class'
    titleInput.type = 'text';
    titleInput.name = 'title'
    titleInput.maxLength = '40'
    titleInput.placeholder = 'Book Title'
    titleInput.required = 'true'
    titleInput.style.width = inputSize
    titleInput.style.height = '30px'
    titleInput.style.textAlign = 'center'
    titleInput.style.fontSize = '1em'
    titleInput.style.alignSelf = 'center'
    inputForm.appendChild(titleInput)

    authorInput = document.createElement('input');
    authorInput.id = 'author'
    authorInput.className = 'add-book-class'
    authorInput.type = 'text';
    authorInput.name = 'author'
    authorInput.maxLength = '40'
    authorInput.placeholder = 'Author'
    authorInput.required = 'true'
    authorInput.style.width = inputSize
    authorInput.style.height = '30px'
    authorInput.style.textAlign = 'center'
    authorInput.style.fontSize = '1em'
    authorInput.style.alignSelf = 'center'
    authorInput.style.marginTop = '10px'
    inputForm.appendChild(authorInput)

    pageAmtInput = document.createElement('input');
    pageAmtInput.id = 'pageAmt'
    pageAmtInput.className = 'add-book-class'
    pageAmtInput.type = 'text';
    pageAmtInput.name = 'page-amount'
    pageAmtInput.maxLength = '40'
    pageAmtInput.placeholder = 'Page Amount'
    pageAmtInput.style.width = inputSize
    pageAmtInput.style.height = '30px'
    pageAmtInput.style.textAlign = 'center'
    pageAmtInput.style.fontSize = '1em'
    pageAmtInput.style.alignSelf = 'center'
    pageAmtInput.style.marginTop = '10px'
    inputForm.appendChild(pageAmtInput)

    pubDateInput = document.createElement('input');
    pubDateInput.id = 'pub-date'
    pubDateInput.className = 'add-book-class'
    pubDateInput.type = 'text';
    pubDateInput.name = 'pub-date'
    pubDateInput.maxLength = '40'
    pubDateInput.placeholder = 'Publish Year'
    pubDateInput.style.width = inputSize
    pubDateInput.style.height = '30px'
    pubDateInput.style.textAlign = 'center'
    pubDateInput.style.fontSize = '1em'
    pubDateInput.style.alignSelf = 'center'
    pubDateInput.style.marginTop = '10px'
    inputForm.appendChild(pubDateInput)

    isbnInput = document.createElement('input');
    isbnInput.id = 'isbn'
    isbnInput.className = 'add-book-class'
    isbnInput.type = 'text';
    isbnInput.name = 'isbn'
    isbnInput.maxLength = '40'
    isbnInput.placeholder = 'ISBN'
    isbnInput.style.width = inputSize
    isbnInput.style.height = '30px'
    isbnInput.style.textAlign = 'center'
    isbnInput.style.fontSize = '1em'
    isbnInput.style.alignSelf = 'center'
    isbnInput.style.marginTop = '10px'
    inputForm.appendChild(isbnInput)

    isReadDiv = document.createElement('div')
    isReadDiv.style.display = 'flex'
    isReadDiv.className = 'add-book-class'
    isReadDiv.style.flexDirection = 'row'
    isReadDiv.style.justifyContent = 'center'
    isReadDiv.style.marginTop = '10px'


    isReadCheck = document.createElement('input')
    isReadCheck.type = 'checkbox'
    isReadCheck.id = 'is-read'
    isReadCheck.name = 'read'
    isReadCheck.textContent = 'read'

    isReadLabel = document.createElement('label');
    isReadLabel.for = 'is-read'
    isReadLabel.textContent = 'Read';

    isReadDiv.appendChild(isReadCheck);
    isReadDiv.appendChild(isReadLabel);

    inputForm.appendChild(isReadDiv)

    submitButton = document.createElement('input');
    submitButton.className = 'add-book-class'
    submitButton.type = 'submit'
    submitButton.name = 'submit-button'
    submitButton.value = 'Submit'
    submitButton.style.width = inputSize/2;
    submitButton.style.height = '30px'
    submitButton.style.textAlign = 'center'
    submitButton.style.fontSize = '1em'
    submitButton.style.backgroundColor = '#bc6c25'
    submitButton.style.alignSelf = 'center'
    submitButton.style.marginTop = '10px'
    
    inputForm.appendChild(submitButton)

    submitButton.addEventListener('click', function() {
        addBookFromForm();
        closeForm();
    })


    return bookArray;
}

function removeOldBooks() {
    oldBooks = bookDiv.querySelectorAll('div')
    oldBooks.forEach(book => {
        bookDiv.removeChild(book);
    });
}

// Render all the books in my array to the HTML doc
function renderBooks() {

    editColumns(myBooks);
    removeOldBooks();

    // For each book, create a container
    // Add title, author to each container,
    // Add animation to make container larger and show more information
    // Render it to screen

    let bkIndex = 0;

    myBooks.forEach(book => {

        // create container for book information
        bookCont = document.createElement('div');
        bookCont.class = 'book';
        // bookCont.id = book.title;
        bookCont.style.display = 'flex';
        bookCont.style.flexDirection = 'column';
        bookCont.style.border = "1px solid #283618"

        bookCont.id = bkIndex ++;

        // Add book title to the container
        bookHeader = document.createElement('h2');
        bookHeader.style.marginTop = '20px'
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

        bookCont.style.backgroundColor = '#606c38';

        // add each book to book container
        bookDiv.appendChild(bookCont);
    });

    // Add hover effect when mouse hovers over each book 
    const books = bookDiv.querySelectorAll('div');
    books.forEach(book => {
    
        book.onmouseover = function() {
            book.style.backgroundColor = '#283618'
            book.style.color = '#fefae0'
        }
        book.onmouseout = function() {
            book.style.backgroundColor = '#606c38'
            book.style.color = 'black'
        }

        book.addEventListener('click', function() {
            animateClickBook(book);
        });
    
    });

    window.addEventListener("resize", function() {
        editColumns(myBooks);
    });

    btns = document.querySelectorAll('button');
    btns.forEach(btn => {
        btn.onmouseup = function() {
            switch(btn.id) {
                case('add-book'):
                    // console.log(`click`)
                    
                    myBooks = addBook(myBooks);
                    renderBooks();

                    break;
                case('search'):
                    break;
            }
        }
    });

}


// Animation bool false if animation hasn't occured yet
// Book Chosen bool false if no book has been chosen yet
let animOpen = false;
let bookChosen = false;

// Animate the click book container to open
// Send chosen book to the click book container

// IN DEVELOPMENT VERY BUGGY ---------------------------------------------------------

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

// Creates the focused element when a book is chosen
// remove from library button, close button

// IN DEVELOPMENT - VERY BUGGY -------------------------------------------------

function makeFocusBook(book) {
    focusBook = document.createElement('div');
    focusBook.style.backgroundColor = 'white';
    focusBook.style.display = 'grid';
    // focusBook.style.flexDirection = 'column'
    focusBook.style.border = "1px solid gray"
    // focusBook.style.alignContent = 'center'
    focusBook.style.textAlign = 'center'

    focusBook.style.gridTemplateColumns = '50% 50%'
    focusBook.style.gridTemplateRows    = '20px 100px 40px 60px 60px 60px  60px'

    focusCloseDiv = document.createElement('div');
    // focusCloseDiv.style.justifyContent = 'end'
    focusCloseDiv.style.gridColumnStart = '1'
    focusCloseDiv.style.gridColumnEnd   = '3'
    focusCloseDiv.style.display = 'flex'
    focusCloseDiv.style.justifyContent = 'flex-end'

    focusClose = document.createElement('div');
    focusClose.textContent = 'x';
    focusClose.height = '1vw'
    focusClose.width = '1vw'
    focusClose.style.border = 'solid 1px black'
    focusClose.style.fontSize = '1em'
    focusClose.style.marginRight = '5vw'

    focusCloseDiv.appendChild(focusClose)


    focusBook.appendChild(focusCloseDiv)
    
    focusTitle = document.createElement('h2');
    focusTitle.style.fontSize = '4em'
    focusTitle.textContent = book.title;
    focusTitle.style.marginBottom = '0px';
    focusTitle.style.gridColumnStart = '1'
    focusTitle.style.gridColumnEnd   = '3'

    focusBook.appendChild(focusTitle);

    focusAuthor = document.createElement('p');
    focusAuthor.style.fontSize = '2em'
    focusAuthor.style.marginBottom = '20px'
    focusAuthor.style.gridColumnStart = '1'
    focusAuthor.style.gridColumnEnd   = '3'
    focusAuthor.textContent = `by ${book.author}`;

    focusBook.appendChild(focusAuthor)

    focusPgAmt = document.createElement('p');
    // focusPgAmt.style.fontSize = '1.5em'
    focusPgAmt.style.marginBottom = '0px'
    focusPgAmt.textContent = `Length - ${book.pageAmt} pages`

    focusBook.appendChild(focusPgAmt);

    focusIsRead = document.createElement('p');
    focusIsRead.style.fontSize = '1.5em'
    focusIsRead.textContent = ((book.isRead) ? `Read` : `Not Read`);

    focusBook.appendChild(focusIsRead)



    return focusBook;
}


// Book container 
bookDiv = document.querySelector('#book-container');
inputForm = document.querySelector('#input')

// Amount of rows on screen 
let rowAmt = 0;
let columnAmt = 3;

// Array of books to be printed on screen
let myBooks = [];

// // Placeholder books
// book1 = new Book('Fuck', 'fucker', 4, false);
// book2 = new Book('Book that has an even longer title', 'shitter', 6, true);
// book3 = new Book('Book that has a long title', 'writer', 999, false);

// // Adding placeholder books to array of books
// myBooks = addBookToLibrary(book1, myBooks);
// myBooks = addBookToLibrary(book2, myBooks);
// myBooks = addBookToLibrary(book3, myBooks);

renderBooks(myBooks)

