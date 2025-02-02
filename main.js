document.addEventListener('DOMContentLoaded', () => {
  const bookForm = document.getElementById('bookForm');
  const incompleteBookList = document.getElementById('incompleteBookList');
  const completeBookList = document.getElementById('completeBookList');
  const searchBookForm = document.getElementById('searchBook');

  let books = JSON.parse(sessionStorage.getItem('books')) || [];

  bookForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('bookFormTitle').value;
    const author = document.getElementById('bookFormAuthor').value;
    const year = document.getElementById('bookFormYear').value;
    const isComplete = document.getElementById('bookFormIsComplete').checked;

    const book = {
      id: Date.now(),
      title,
      author,
      year,
      isComplete,
    };

    books.push(book);
    sessionStorage.setItem('books', JSON.stringify(books));
    renderBooks();
    bookForm.reset();
  });



  function renderBooks() {
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    books.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.setAttribute('data-bookid', book.id);
      bookItem.setAttribute('data-testid', 'bookItem');

      bookItem.innerHTML = `
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div class="bookItemActions">
          <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
          <button data-testid="bookItemDeleteButton">Hapus Buku</button>
          <button data-testid="bookItemEditButton">Edit Buku</button>
        </div>
      `;

      bookItem.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => {
        if (confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
          books = books.filter(b => b.id !== book.id);
          sessionStorage.setItem('books', JSON.stringify(books));
          renderBooks();
        }
      });

      if (book.isComplete) {
        completeBookList.appendChild(bookItem);
      } else {
        incompleteBookList.appendChild(bookItem);
      }

      bookItem.querySelector('[data-testid="bookItemIsCompleteButton"]').addEventListener('click', () => {
        book.isComplete = !book.isComplete;
        sessionStorage.setItem('books', JSON.stringify(books));
        renderBooks();
      });

      bookItem.querySelector('[data-testid="bookItemDeleteButton"]').addEventListener('click', () => {
        books = books.filter(b => b.id !== book.id);
        sessionStorage.setItem('books', JSON.stringify(books));
        renderBooks();
      });

      bookItem.querySelector('[data-testid="bookItemEditButton"]').addEventListener('click', () => {
        document.getElementById('bookFormTitle').value = book.title;
        document.getElementById('bookFormAuthor').value = book.author;
        document.getElementById('bookFormYear').value = book.year;
        document.getElementById('bookFormIsComplete').checked = book.isComplete;
        books = books.filter(b => b.id !== book.id);
        sessionStorage.setItem('books', JSON.stringify(books));
        renderBooks();
      });
    });
  }

  searchBookForm.addEventListener('input', (event) => {
    const searchTitle = event.target.value.toLowerCase();
    const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTitle));
    incompleteBookList.innerHTML = '';
    completeBookList.innerHTML = '';

    filteredBooks.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.setAttribute('data-bookid', book.id);
      bookItem.setAttribute('data-testid', 'bookItem');

      bookItem.innerHTML = `
        <h3 data-testid="bookItemTitle">${book.title}</h3>
        <p data-testid="bookItemAuthor">Penulis: ${book.author}</p>
        <p data-testid="bookItemYear">Tahun: ${book.year}</p>
        <div>
          <button data-testid="bookItemIsCompleteButton">${book.isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca'}</button>
          <button data-testid="bookItemDeleteButton">Hapus Buku</button>
          <button data-testid="bookItemEditButton">Edit Buku</button>
        </div>
      `;

      if (book.isComplete) {
        completeBookList.appendChild(bookItem);
      } else {
        incompleteBookList.appendChild(bookItem);
      }
    });
  });
 
  renderBooks();
});