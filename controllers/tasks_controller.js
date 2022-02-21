import TasksDAO from '../dao/tasksDAO.js'

class TasksController {

    // Add new Task via POST
    static async PostTask(req, res) {
        try{
            const task = req.body.task
            const priority = req.body.priority
            const dueDate = req.body.dueDate
            const description = req.body.description || ""
            

            const response = await TasksDAO.addTask(task, priority, dueDate, description)
            res.json({status: "success"});

        } catch(error) {
            res.status(500).json({error: error.message});
        }
    }

    // Update Task via PUT
    static async UpdateTask(req, res) {
        try{
            const taskId = req.params.id
            const task = req.body.task
            const priority = req.body.priority
            const dueDate = req.body.dueDate
            const description = req.body.description || ""

            const response = await TasksDAO.updateTask(taskId, task, priority, dueDate, description)
            res.json({status: "success"});

        } catch(error) {
            res.status(500).json({error: error.message});
        }
    }

    // Delete Task via DELETE
    static async DeleteTask(req, res) {
        try{
            const taskId = req.params.id
            const response  = await TasksDAO.deleteTask(taskId)
            res.json({status: "success"});

        } catch(error) {
            res.status(500).json({error: error.message});
        }
    }

    // Retrieve all Tasks via GET
    static async GetTasks(req, res) {
        try{
            const response = await TasksDAO.getTasks()
            res.json(response);

        } catch(error) {
            res.status(500).json({error: error.message});
        }
    }
}

export default TasksController;