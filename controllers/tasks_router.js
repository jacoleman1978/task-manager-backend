// Dependencies
import express from 'express';
import TasksController from './tasks_controller.js';

// Express Router
const router = express.Router();

// Routes to retrieve all tasks
router.route('/').get(TasksController.GetTasks);
router.route('/duedates').get(TasksController.GetTasks);

// Route to post a new task
router.route('/new').post(TasksController.PostTask);

// Route to update and delete a task
router.route('/:id')
    .get(TasksController.GetTask)
    .put(TasksController.UpdateTask)
    .delete(TasksController.DeleteTask);

export default router;