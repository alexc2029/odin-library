let Library = [];

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

function removeBook(id) {
	const index = Library.findIndex((book) => book.id == id);
	Library.splice(index, 1);
}

function displayBooks() {
	const container = document.getElementById("books");
	container.innerHTML = "";
	for (const book of Library) {
		const para = document.createElement("p");
		const info = book.info();
		const text = document.createTextNode(info);
		para.appendChild(text);

		const removeButton = document.createElement("button");
		removeButton.innerText = "Remove book";

		const div = document.createElement("div");
		div.setAttribute("data-id", book.id);

		div.appendChild(para);
		div.appendChild(removeButton);

		container.appendChild(div);

		removeButton.addEventListener("click", () => {
			div.remove();
			const parent = removeButton.parentElement;
			removeBook(parent.dataset.id);
		});
	}
}

const addBookButton = document.querySelector("[data-open-modal]");
const addBookModal = document.querySelector("[data-modal]");

addBookButton.addEventListener("click", () => {
	addBookModal.showModal();
});

let submitBookButton = document.getElementById("submitBook");

submitBookButton.addEventListener("click", (e) => {
	e.preventDefault();
	const title = document.getElementById("title");
	const author = document.getElementById("author");
	const pages = document.getElementById("pages");
	const read = document.getElementById("read");
	addBookToLibrary(title.value, author.value, pages.value, read.value);
	title.value = "";
	author.value = "";
	pages.value = "";
	read.value = "";
	addBookModal.close();
	displayBooks();
});
