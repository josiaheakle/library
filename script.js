// ID index to add book id functionality -
// this will be used when remove book is functional
let idNum = 0;
// Book object
function Book(title, author, pageAmt = 0, isRead = false, ISBN = '', pubDate = '') {
    this.title = title;
    this.author = author;
    this.pageAmt = pageAmt;
    this.isRead = isRead;
    this.isbn = ISBN;
    this.pubDate = pubDate;
    this.id = idNum++;
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

function removeBook(index) {
    myBooks.forEach(book => {
        if(book.id >= index) {
            book.id--;
        }
    })
    myBooks.splice(index, 1);
}

// edit amount of columns if the width is too small/ too large
let inputSize = '50vw';
let clickBookSize = '52vw';
function editColumns(bookArray) {

    // console.log(`edit columns run`)

    // decide how many rows and columns are needed
    let bodyWidth = document.body.clientWidth + 31;
    
    // input type to add resize funtionality
    const input = document.querySelectorAll('.add-book-class')
    const clickBookCont = document.querySelector('#click-book-div')
    const headerText = document.querySelector('header h1')
    if (bodyWidth >= 1050) {
        inputSize = '50vw'
        clickBookSize = '52vw'
        columnAmt = 3;
        headerText.style.fontSize = '28px'
    } else if (bodyWidth < 1050 && bodyWidth >= 700) {
        inputSize = '65vw'
        clickBookSize = '67vw'
        columnAmt = 2;
        headerText.style.fontSize = '22px'
    } else if (bodyWidth < 700) {
        inputSize = '80vw'
        clickBookSize = '82vw'
        columnAmt = 1;
        headerText.style.fontSize = '18px'

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
    if(!clickBookCont == undefined) {
        clickBookCont.style.width = clickBookSize;
    }
    // if(input) {
    input.forEach(cont => {
        // console.log(`container id: ${cont.id}`)
        if(cont.type == 'submit') {
            cont.style.width = inputSize/2;
        } else if (cont.type == 'checkbox' || cont.id == 'bottom-row-input') {
            
        } else if (cont.id == 'pageAmt') {
            cont.style.width = inputSize/2;
        } else {
            cont.style.width = inputSize;
        }
    });
        // inputForm.style.width = inputSize;
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

// remove all the inputs from screen
function closeForm() {
    const inputs = inputForm.querySelectorAll('.add-book-class')
    inputs.forEach(formItem => {
        inputForm.removeChild(formItem);
    });
}

// get book information from input form,
// add to myBooks array
function addBookFromForm() {

    let title = inputForm.querySelector('#title').value;
    let author = inputForm.querySelector('#author').value;
    let pageAmt = inputForm.querySelector('#pageAmt').value;
    let isRead = inputForm.querySelector('#is-read').checked;

    if(title == '' || author == '') {
        return false;
    }

    if(pageAmt == undefined) pageAmt = '';
    if(isRead == undefined) isRead = false;

    let book = new Book(title, author, pageAmt, isRead)
    myBooks = addBookToLibrary(book, myBooks)
    closeForm();
    renderBooks(myBooks);

    // return false so the page is not reloaded
    return false;
}

let clicked = false;

function bookClickForm(bookId) {

    // console.log(clicked)

    if(!clicked) {
        clicked = true;

    book = getBookById(bookId)
    // console.log(bookId)
    
    bookClickDiv = document.createElement('div')
    bookClickDiv.id = 'click-book-div'
    bookClickDiv.style.height = '200px'
    bookClickDiv.style.width = clickBookSize
    bookClickDiv.style.backgroundColor = '#606c38'
    bookClickDiv.style.border = '1px solid black'
    bookClickDiv.style.justifySelf = 'center'
    bookClickDiv.style.justifyContent = 'center'
    bookClickDiv.style.alignContent = 'center'
    bookClickDiv.style.display = 'grid'
    bookClickDiv.style.gridTemplateColumns = '100%'
    bookClickDiv.style.gridTemplateRows = '20% 40% 40%'
    // bookClickDiv.

    buttonCont = document.createElement('div')
    buttonCont.style.display = 'grid'
    buttonCont.style.gridTemplateColumns= '10% 80% 10'
    
    isReadButton = document.createElement('button')
    isReadButton.id = 'is-read-button'
    if(book.isRead) {
        isReadButton.textContent = 'Read'
    } else {
        isReadButton.textContent = 'Not Read'
    }
    isReadButton.style.width = '50%'
    isReadButton.style.gridColumnStart = '1'
    isReadButton.style.gridColumnEnd = '2'
    isReadButton.style.margin = '1vmin'
    isReadButton.style.backgroundColor = '#bc6c25'

    closeButton = document.createElement('button')
    closeButton.id = 'close-button'
    closeButton.textContent = 'Close'
    closeButton.style.width = '50%'
    closeButton.style.gridColumnStart = '3'
    closeButton.style.gridColumnEnd = '4'
    closeButton.style.justifySelf = 'end'
    closeButton.style.margin = '1vmin'
    closeButton.style.backgroundColor = '#bc6c25'

    removeButton = document.createElement('button')
    removeButton.id = 'remove-button'
    removeButton.textContent = 'Remove'
    removeButton.style.width = '%50'
    removeButton.style.justifySelf = 'center'
    removeButton.style.margin = '1vmin'
    removeButton.style.backgroundColor = '#bc6c25'
    
    buttonCont.appendChild(isReadButton)
    buttonCont.appendChild(removeButton)
    buttonCont.appendChild(closeButton)

    bookInfoCont = document.createElement('div')
    bookInfoCont.style.display = 'flex'
    bookInfoCont.style.flexDirection = 'row'
    bookInfoCont.style.justifyContent = 'center'

    bookInfoCont2 = document.createElement('div')
    bookInfoCont2.style.display = 'flex'
    bookInfoCont2.style.flexDirection = 'row'
    bookInfoCont2.style.justifyContent = 'center'

    bookTitle = document.createElement('h2')
    bookTitle.textContent = book.title

    bookAuthor = document.createElement('p');
    bookAuthor.style.fontStyle = 'italic'
    if(book.pageAmt > 0) {
        bookAuthor.textContent = `by ${book.author} ... ${book.pageAmt} pages`
    } else {
        bookAuthor.textContent = `by ${book.author}`
    }

    bookInfoCont.appendChild(bookTitle)
    bookInfoCont2.appendChild(bookAuthor)

    bookClickDiv.appendChild(buttonCont)
    bookClickDiv.appendChild(bookInfoCont)
    bookClickDiv.appendChild(bookInfoCont2)


    bookFormDiv.appendChild(bookClickDiv)

    btns = bookFormDiv.querySelectorAll('button')
    btns.forEach(btn => {
        btn.addEventListener('click', function() {
            // console.log(btn.id)

            switch(btn.id) {
                case('is-read-button'):
                    myBooks[bookId].isRead = !myBooks[bookId].isRead
                    if(myBooks[bookId].isRead)
                        btn.textContent = 'Read'
                    else 
                        btn.textContent = 'Not Read'
                    break;
                case('close-button'):
                    bookFormDiv.removeChild(bookClickDiv)
                    clicked = false
                    renderBooks(myBooks);
                    break;
                case('remove-button'):
                    removeBook(bookId);
                    bookFormDiv.removeChild(bookClickDiv)
                    clicked = false
                    renderBooks(myBooks)
                    break;
            }
        })
    });
    }
    // console.log(`REMOVE OR MAKE READ for ID: ${bookId}`)
}

// Create and render new book form on screen
// Input book information and add it to the array,
// Call render books 
function addBook(bookArray) {

    closeForm()

    // Create form to input book information
    titleInput = document.createElement('input');
    titleInput.id = 'title';
    titleInput.className = 'add-book-class'
    titleInput.type = 'text';
    titleInput.name = 'title'
    titleInput.maxLength = '40'
    titleInput.placeholder = 'Book Title'
    titleInput.required = 'true'
    titleInput.style.width = inputSize
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
    authorInput.style.marginTop = '10px'
    inputForm.appendChild(authorInput)

    pageAmtInput = document.createElement('input');
    pageAmtInput.id = 'pageAmt'
    pageAmtInput.className = 'add-book-class'
    pageAmtInput.type = 'number';
    pageAmtInput.min = '1'
    pageAmtInput.name = 'page-amount'
    pageAmtInput.maxLength = '40'
    pageAmtInput.placeholder = 'Page Amount'
    pageAmtInput.style.width = inputSize/2
    pageAmtInput.style.justifySelf = 'start'
    pageAmtInput.style.marginLeft = '0px'
    pageAmtInput.style.marginTop = '10px'
    inputForm.appendChild(pageAmtInput)

    isReadDiv = document.createElement('div')
    isReadDiv.style.display = 'flex'
    isReadDiv.className = 'add-book-class'
    isReadDiv.id = 'bottom-row-input'
    isReadDiv.style.width = '100vw'
    isReadDiv.style.flexDirection = 'row'
    isReadDiv.style.justifyContent = 'center'
    isReadDiv.style.marginTop = '10px'

    isReadCheck = document.createElement('input')
    isReadCheck.type = 'checkbox'
    isReadCheck.id = 'is-read'
    isReadCheck.name = 'read'
    isReadCheck.style.marginTop = '0px'
    isReadCheck.textContent = 'read'

    isReadLabel = document.createElement('label');
    isReadLabel.for = 'is-read'
    isReadLabel.style.alignSelf = 'center'
    isReadLabel.style.fontSize = '1em'
    isReadLabel.textContent = 'Read';
    isReadLabel.style.marginLeft = '1vw'

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

// Run when search button is clicked,
// Create and show form on screen,
// If the book has any relating information,
// Show the book on screen
function search(bookArray) {

    closeForm()

    searchInput = document.createElement('input');
    searchInput.id = 'search';
    searchInput.className = 'add-book-class' // add to this class so close form works
    searchInput.type = 'text';
    searchInput.name = 'search'
    searchInput.maxLength = '40'
    searchInput.placeholder = 'Search'
    searchInput.required = 'true'
    searchInput.style.width = inputSize
    searchInput.style.height = '30px'
    searchInput.style.textAlign = 'center'
    searchInput.style.fontSize = '1em'
    searchInput.style.alignSelf = 'center'
    inputForm.appendChild(searchInput)

    submitButton = document.createElement('input');
    submitButton.className = 'add-book-class'
    submitButton.type = 'submit'
    submitButton.name = 'submit-button'
    submitButton.value = 'Search'
    submitButton.style.width = inputSize/2;
    submitButton.style.height = '30px'
    submitButton.style.textAlign = 'center'
    submitButton.style.fontSize = '1em'
    submitButton.style.backgroundColor = '#bc6c25'
    submitButton.style.alignSelf = 'center'
    submitButton.style.marginTop = '10px'
    
    inputForm.appendChild(submitButton)

    

    let resultArray = [];
    submitButton.addEventListener('click', function() {
        let searchText = inputForm.querySelector('#search').value.toLowerCase()
        if(searchText !== '') {
            resultArray = [];
            bookArray.forEach(book => {
                if(book.title.toLowerCase().includes(searchText) || book.author.toLowerCase().includes(searchText)
                || book.pageAmt.toLowerCase().includes(searchText)) {
                    resultArray.push(book);
                }
            })
            renderBooks(resultArray);
        }
    });
    
    return resultArray;
}

// Clears the forms and removes them from the screen
function clear() {
    removeOldBooks();
    closeForm();
    renderBooks(myBooks);
}

// Clears old array from screen so new render can happen
function removeOldBooks() {
    oldBooks = bookDiv.querySelectorAll('div')
    oldBooks.forEach(book => {
        bookDiv.removeChild(book);
    });
}

// Render all the books in my array to the HTML doc
function renderBooks(bookArray) {

    editColumns(bookArray);
    removeOldBooks();

    // For each book, create a container
    // Add title, author to each container,
    // Add animation to make container larger and show more information
    // Render it to screen

    bookArray.forEach(book => {

        // create container for book information
        bookCont = document.createElement('div');
        bookCont.class = 'book';
        bookCont.style.display = 'flex';
        bookCont.style.flexDirection = 'column';
        bookCont.style.border = "1px solid #283618"
        bookCont.id = book.id;

        // Add book title to the container
        bookHeader = document.createElement('h2');
        bookHeader.style.marginTop = '20px'
        if(!book.isRead) {
            bookHeader.textContent = book.title;
        } else {
            bookHeader.textContent = `${book.title} ✔`;
        }
        bookCont.appendChild(bookHeader);

        // Add book author to the container
        bookAuthor = document.createElement('p');
        bookAuthor.style.fontStyle = 'italic'
        if(book.pageAmt > 0) {
        bookAuthor.textContent = `by ${book.author} ... ${book.pageAmt} pages`
        } else {
            bookAuthor.textContent = `by ${book.author}`
        }
        bookCont.appendChild(bookAuthor)

        bookCont.style.backgroundColor = '#606c38';

        removeButton = document.createElement('button');
        removeButton.textContent = 'Remove Book'

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

        // add click functionality - ------------------------------------------ EDIT THIS TO 
        //                                                                      JUST REMOVE THE BOOK
        book.addEventListener('click', function() {
            // console.log(`${book.id} clicked`)
            bookClickForm(book.id)
        });
    
    });

    window.addEventListener("resize", function() {
        editColumns(bookArray);
    });

    btns = document.querySelectorAll('button');
    btns.forEach(btn => {
        btn.onmouseup = function() {
            switch(btn.id) {
                case('add-book'):
                    myBooks = addBook(myBooks);
                    renderBooks(myBooks);

                    break;
                case('search'):

                    let searchBooks = search(bookArray);
                    break;

                case('clear'):
                    clear();

                    break;
            }
        }
    });

}

// Book container 
bookDiv = document.querySelector('#book-container');
clickBookDiv = document.querySelector('#click-book-container')
inputForm = document.querySelector('#input')
bookFormDiv = document.querySelector('#book-form')

// Amount of rows on screen 
let rowAmt = 0;
let columnAmt = 3;

// Array of books to be printed on screen
let myBooks = [];


// for(let i=0; i<12; i++) {
//     book = new Book('title', 'author', '123', true)
//     myBooks = addBookToLibrary(book, myBooks)
// }

renderBooks(myBooks)

