import express from 'express';
import bookService from './book-service';
import books from './data';
import lists from './lists';
 
const app = express();
app.use(express.json());
 
const PORT = 3000;
app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});


app.get('/api/v1/books', (request, response) => {
    bookService.getAll().then((rows)=>response.json(rows)).catch((error)=> response.status(500).send(error));
}); 

app.get('/api/v1/lists', (request, response) => {
    response.json(lists);
});

app.get('/api/v1/books/:id', (request, response) => {
    const id = request.params.id;
    const book = books.find(t => t.id == id);
    
    if (book) {
        response.json(book);
    } else {
        response.status(404).send(`book with id '${id}' not found.`);
    }
});

app.get('/api/v1/lists/:id', (request, response) => {
    const id = request.params.id;
    const list = lists.find(t => t.id == id);
    
    if (list) {
        response.json(list);
    } else {
        response.status(404).send(`list with id '${id}' not found.`);
    }
});

app.get('/api/v1/lists/:id/books', (request, response) => {
    
    const id = request.params.id;
    const list = lists.find(t => t.id == id);
    const booklist = books.filter(book => book.list_id == id);
    
    if (list) {
        response.json(booklist);
    } else {
        response.status(404).send(`list with id '${id}' not found.`);
    }
});

app.get('/api/v1/lists/:list_id/books/:book_id', (request, response) => {
    const list_id = request.params.list_id;
    const book_id = request.params.book_id
    let booklist = books.filter(book => book.list_id == list_id).filter(book => book.id == book_id);
    
    if (booklist) {
        response.json(booklist);
    } else {
        response.status(404).send(`list with id  not found.`);
    }
});



app.post('/api/v1/books', (request, response) => {
    const book = request.body;
    
    if (!book.hasOwnProperty('id') ||
        !book.hasOwnProperty('title') || 
        !book.hasOwnProperty('list_id') || 
        !book.hasOwnProperty('read')) {
            response.status(400).send('A book needs the following properties: id, title, list_id and read.');
    }
    
    if (books.find(t => t.id == book.id)) {
        response.status(400).send(`A book with id '${book.id}' already exists.`);
    } else {
        books.push(book);
        response.status(201);
        response.location('books/' + book.id);
        response.send();
    }
});

app.delete('/api/v1/books/:id', (request, response) => {
    const id = request.params.id;
    const index = books.findIndex(t => t.id == id); 
    if (index != -1) {
        books.splice(index, 1);
        response.json(books);
    } else {
        response.status(404).send(`Failed to delete book with id '${id}'. Task not found.`);
    }
});

export default app;