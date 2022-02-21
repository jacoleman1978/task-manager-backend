// Dependencies
import express from 'express';
import TasksController from './tasks_controller';

// Express Router
const router = express.Router();

// Routes to retrieve all tasks
router.route('/').get(TasksController.GetTasks);
router.route('/duedates').get(TasksController.GetTasks);

// Route to post a new task
router.route('/new').post(TasksController.PostTask);

// Route to update and delete a task
router.route('/:id')
    .put(TasksController.UpdateTask)
    .delete(TasksController.DeleteTask);

export default router;