class Book {
    constructor(title, author, read) {
        this.title = title;
        this.author = author;
        this.read = read;
    }
}

const myLibrary =
    [new Book("The Da Vinci Code", "Dan Brown", true),
    new Book("Firestarter", "Stephen King", false),
    new Book("1984", "George Orwell", false),
    new Book("Inferno", "Dan Brown", true),
    new Book("Brave New World", "Aldous Huxley", false)];

const libraryContainer = document.querySelector(".library");
const dialog = document.querySelector("dialog");
const form = document.querySelector("form");
const addButton = document.querySelector("#add-button");
const removeButton = document.querySelector("#remove-button");


function addBookToContainer(book) {
    const item = document.createElement("div");
    item.setAttribute("class", "item");
    const bookDiv = document.createElement("div");
    bookDiv.setAttribute("class", "book")
    const img = document.createElement("img");
    img.setAttribute("src", "img/book.png");
    img.setAttribute("alt", "BookImage");
    bookDiv.appendChild(img);
    const title = document.createElement("h2");
    title.textContent = book.title;
    bookDiv.appendChild(title);
    const author = document.createElement("h3");
    author.textContent = book.author;
    bookDiv.appendChild(author);
    const status = document.createElement("p");
    status.textContent = "Reading Status : ";
    const statusButton = document.createElement("button");
    statusButton.innerHTML = (book.read) ? "&#9989":"&#8987";
    status.appendChild(statusButton);
    bookDiv.appendChild(status);
    item.appendChild(bookDiv);
    const eraseButton = document.createElement("button");
    eraseButton.textContent = "X";
    eraseButton.classList.add("erase-button");
    eraseButton.hidden = true;
    item.appendChild(eraseButton);
    libraryContainer.appendChild(item);
}

function initLibrary() {
    for (let i = 0; i < myLibrary.length; i++) {
        const item = document.createElement("div");
        item.setAttribute("class", "item");
        const book = document.createElement("div");
        book.setAttribute("class", "book")
        const img = document.createElement("img");
        img.setAttribute("src", "img/book.png");
        img.setAttribute("alt", "BookImage");
        book.appendChild(img);
        const title = document.createElement("h2");
        title.textContent = myLibrary[i].title;
        book.appendChild(title);
        const author = document.createElement("h3");
        author.textContent = myLibrary[i].author;
        book.appendChild(author);
        const status = document.createElement("p");
        status.textContent = "Reading Status : ";
        const statusButton = document.createElement("button");
        statusButton.innerHTML = (myLibrary[i].read) ? "&#9989":"&#8987";
        statusButton.addEventListener("click", statusButtonClicked);
        status.appendChild(statusButton);
        book.appendChild(status);
        item.appendChild(book);
        const eraseButton = document.createElement("button");
        eraseButton.textContent = "X";
        eraseButton.classList.add("erase-button");
        eraseButton.hidden = true;
        item.appendChild(eraseButton);
        libraryContainer.appendChild(item);
    }
}

function setEventListeners() {
    const addButton = document.querySelector("#add-button");
    addButton.addEventListener("click", addButtonClicked);
    const removeButton = document.querySelector("#remove-button");
    removeButton.addEventListener("click", removeButtonClicked)
    const cancelButton = document.querySelector("#form-cancel");
    cancelButton.addEventListener("click", cancelButtonClicked);
    const confirmButton = document.querySelector("#form-confirm");
    confirmButton.addEventListener("click", confirmButtonClicked);
    const dialog = document.querySelector("dialog");
    dialog.addEventListener("close", removeDialog);
}

function statusButtonClicked(e) {
    let title = e.target.parentElement.parentElement.querySelector("h2").textContent;
    let author = e.target.parentElement.parentElement.querySelector("h3").textContent;
    let index = myLibrary.findIndex(book => book.title === title && book.author === author);
    let status = !(myLibrary[index].read);
    myLibrary[index].read = status;
    e.target.innerHTML = (status) ? "&#9989":"&#8987";
}

function addButtonClicked() {
    document.querySelector(".container").classList.add("blur");
    dialog.showModal();
}

function removeButtonClicked() {
    const eraseButtons = document.querySelectorAll(".erase-button");

    for (let i = 0; i < eraseButtons.length; i++) {
        eraseButtons[i].hidden = false;
        eraseButtons[i].addEventListener("click", eraseButtonClicked);
    }
    addButton.hidden = true;
    removeButton.textContent = "Confirm"
    removeButton.classList.remove("unvalid-button");
    removeButton.classList.add("valid-button");
    removeButton.removeEventListener("click", removeButtonClicked)
    removeButton.addEventListener("click", confirmRemovalClicked);
}

function confirmRemovalClicked(e) {
    const eraseButtons = document.querySelectorAll(".erase-button");

    for (let i = 0; i < eraseButtons.length; i++)
        eraseButtons[i].hidden = true;
    addButton.hidden = false;
    removeButton.textContent = "Remove"
    removeButton.classList.remove("valid-button");
    removeButton.classList.add("unvalid-button");
    removeButton.removeEventListener("click", confirmRemovalClicked)
    removeButton.addEventListener("click", removeButtonClicked);
}

function eraseButtonClicked(e) {
    e.target.parentElement.remove();
}

function cancelButtonClicked(e) {
    e.preventDefault();
    dialog.close();
}

function confirmButtonClicked(e) {
    e.preventDefault();
    let title = form.querySelector('input[name="title"]').value;
    let author = form.querySelector('input[name="author"]').value;
    let read = form.querySelector('input[name="read"]').checked;
    /*
    Check Validation -- not implemented yet
    */
    let book = new Book(title, author, read);
    myLibrary.push(book);
    addBookToContainer(book);
    dialog.close();
}

function removeDialog(e) {
    document.querySelector(".container").classList.remove("blur");
}

initLibrary();
setEventListeners();