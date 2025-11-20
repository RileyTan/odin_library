const myLibrary = []
const cardsContainer = document.querySelector("#cards-container")
const form = document.querySelector("form")
const sidebar = document.getElementById("sidebar")
const sidebarToggle = document.getElementById("sidebar-toggle")



class Book {
    constructor(title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read 
        this.id = crypto.randomUUID()
    }

    info() {
        if (this.read ===  "yes") {
            return `${this.title} by ${this.author}, ${this.pages} pages, has been read`
        }
        return `${this.title} by ${this.author}, ${this.pages} pages, not read yet`
    }

    toggleReadStatus() {
        const bookReadStatusButton = document.querySelector(`[data-book-id="${this.id}"]`)
        bookReadStatusButton.classList.toggle("read")
        if (this.read === "yes") {
            this.read = "no"
        }
        else {
            this.read = "yes"
        }
    }
}

/*
* =============================================
*   adding books to library 
* =============================================
*/
function addBookToLibrary(book) {
    //  take book object as param, create a book then store it in the array
    myLibrary.push(book)
}

form.addEventListener("submit", event => {
    event.preventDefault()
    const read = document.querySelector('input[name="read"]:checked').value
    const book = new Book(title.value, author.value, pages.value, read)
    addBookToLibrary(book)
    display()
    form.reset()
})

/*
* =============================================
*   displaying books in container 
* =============================================
*/
const display = () => {
    cardsContainer.innerHTML = ''
    myLibrary.forEach(book => {
        cardsContainer.insertAdjacentHTML("beforeend", `
            <div class="book-card">
                <div id="identifier">
                    <h4>${book.title}</h4>
                    <h6>by ${book.author}<h6> 
                    
                </div>
                <hr>
                <p>${book.pages} pages</p>
                <div id="buttons">
                    <button class="read-status ${book.read}" data-book-id="${book.id}">Read</button>
                    <button class="remove" data-book-id="${book.id}">Remove</button>
                </div>
                
            </div>
            
            `)
    })
}

/*
* =============================================
*   listens for click on either the remove button or the read-status button
* =============================================
*/

cardsContainer.addEventListener("click", event => {
    // not click on either button 
    if (!event.target.dataset.bookId) {
        return
    }
    const id = event.target.dataset.bookId 
    const arrayId = myLibrary.findIndex(book => book.id === id)
    const book = myLibrary[arrayId]

    if (event.target.classList.contains("remove")) {
        

        if (confirm(`Remove ${book.title} from collection?`)) {
            myLibrary.splice(arrayId, 1)
            display()
        }
    }
    if (event.target.classList.contains("read-status")) {
        book.toggleReadStatus()
    }
})

const exampleBook = new Book("Twilight, Book 1 : Twilight", "Stephenie Meyer", 498, "read")
const exampleBook1 = new Book("The Hunger Games", "Suzanne Collins", 374, "read")
const exampleBook2 = new Book("Harry Potter and the Philosopher's Stone", "J.K. Rowling", 223, "read")
const exampleBook3 = new Book("The Maze Runner", "James Dashner", 375, "read")

addBookToLibrary(exampleBook)
addBookToLibrary(exampleBook1)
addBookToLibrary(exampleBook2)
addBookToLibrary(exampleBook3)
display()



