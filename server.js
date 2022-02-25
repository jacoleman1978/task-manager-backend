// Dependencies
import express from 'express';
import cors from 'cors';
import tasks from './controllers/tasks_router.js';

// Application
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/tasks', tasks);

app.use('/', (req,res) => {
    res.status(200).json({status: "success"})
})

app.use('*', (req,res) => {
    res.status(404).json({error: "Page not found"})
})

export default app;