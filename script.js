const Library = [];

function Book(title, author, pages, read) {
	if (!new.target)
		throw Error("You must use the 'new' operator to call the constructor");
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.id = crypto.randomUUID();
	this.info = function () {
		return title + " by " + author + ", " + pages + " pages, " + read;
	};
}

function addBookToLibrary(title, author, pages, read) {
	let book = new Book(title, author, pages, read);
	Library.push(book);
}

addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
addBookToLibrary("Harry Potter", "J.K. Rowling", 400, "read");

function displayBooks() {
	for (const book of Library) {
		const para = document.createElement("p");
		const info = book.info();
		const text = document.createTextNode(info);
		para.appendChild(text);

		const container = document.getElementById("books");
		container.appendChild(para);
	}
}

displayBooks();

const addBookButton = document.querySelector("[data-open-modal]");
const addBookModal = document.querySelector("[data-modal]");

addBookButton.addEventListener("click", () => {
	addBookModal.showModal();
});
