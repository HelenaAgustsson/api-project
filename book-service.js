import pool from "./mysql-pool";

class BookService {
    get(book_id) {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Books WHERE id = ?", [book_id], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            pool.query("SELECT * FROM Books", (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    create(task) {
        return new Promise((resolve, reject) => {
            pool.query("INSERT INTO Books SET ?", task, (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }

    delete(taskId) {
        return new Promise((resolve, reject) => {
            pool.query("DELETE FROM Books WHERE id = ?", [taskId], (error, results) => {
                if (error) return reject(error);
                resolve(results);
            });
        });
    }
}

const bookService = new BookService();
export default bookService;
