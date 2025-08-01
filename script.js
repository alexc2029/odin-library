class Book {
	constructor(title, author, pages, read) {
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;
		this.id = crypto.randomUUID();
	}

	info() {
		return (
			this.title +
			" by " +
			this.author +
			", " +
			this.pages +
			" pages, " +
			this.read
		);
	}
	toggleRead() {
		if (this.read == "read") this.read = "not read yet";
		else if (this.read == "not read yet") this.read = "read";
		UI.displayBooks();
	}
}

class Library {
	constructor() {
		this.books = [];
	}
	addBookToLibrary(title, author, pages, read) {
		let book = new Book(title, author, pages, read);
		this.books.push(book);
	}
	removeBook(id) {
		const index = this.books.findIndex((book) => book.id == id);
		this.books.splice(index, 1);
	}
}

class UI {
	static library = new Library();

	static displayBooks() {
		const container = document.getElementById("books");
		container.innerHTML = "";
		for (const book of UI.library.books) {
			const para = document.createElement("p");
			const info = book.info();
			const text = document.createTextNode(info);
			para.appendChild(text);

			const removeButton = document.createElement("button");
			removeButton.innerText = "Remove book";

			const toggleReadButton = document.createElement("button");
			toggleReadButton.innerText = "Toggle Read";

			const div = document.createElement("div");
			div.setAttribute("data-id", book.id);

			div.appendChild(para);
			div.appendChild(toggleReadButton);
			div.appendChild(removeButton);

			container.appendChild(div);

			removeButton.addEventListener("click", () => {
				div.remove();
				UI.library.removeBook(div.dataset.id);
			});
			toggleReadButton.addEventListener("click", () => {
				const index = UI.library.books.findIndex(
					(book) => book.id == div.dataset.id
				);
				UI.library.books[index].toggleRead();
			});
		}
	}
	static initializeModal() {
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
			UI.library.addBookToLibrary(
				title.value,
				author.value,
				pages.value,
				read.value
			);
			title.value = "";
			author.value = "";
			pages.value = "";
			read.value = "";
			addBookModal.close();
			UI.displayBooks();
		});
	}
}

UI.initializeModal();
