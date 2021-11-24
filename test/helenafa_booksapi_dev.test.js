import axios from "axios";
import pool from "../mysql-pool";
import todoApi from "../todo-api";
import bookService from "../book-service";

axios.defaults.baseURL = "http://localhost:3000";

