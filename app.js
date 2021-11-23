import express from 'express';
import books from './data';
 
const app = express();
app.use(express.json());
 
const PORT = 3000;
app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});


app.get('/api/v1/books', (request, response) => {
    response.json(books);
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

app.post('/api/v1/books', (request, response) => {
    const book = request.body;
    
    if (!book.hasOwnProperty('id') ||
        !book.hasOwnProperty('title') || 
        !book.hasOwnProperty('read')) {
            response.status(400).send('A book needs the following properties: id, title and read.');
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