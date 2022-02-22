import { ObjectId } from "mongodb";

let tasks;

export default class TasksDAO {
    // Method to connect to a specific database and collection using .env identifiers
    static async injectDB(connect) {
        if (tasks) {
            return
        }
        try {
            tasks = await connect.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION)
        }
        catch(error) {
            console.error(`Unable to establish connection handle in tasksDAO: ${error}`);
        }
    }

    // Create a task Document in Mongo by passing in todo object
    static async addTask(task, priority, dueDate, description) {
        try {
            const taskDoc = {
                task: task, 
                priority: priority, 
                dueDate: dueDate, 
                description: description,
                dateCreated: new Date()
            }
            return await tasks.insertOne(taskDoc)
        } 
        catch (error) {
            console.error(`Unable to post task: ${error}`);
            return {error: error}
        }
    }

    // Update task Document based on Mongo ObjectId. Task is an object of new info
    static async updateTask(taskId, task, priority, dueDate, description) {
        try {
            const updateResponse = await tasks.updateOne(
                {"_id": ObjectId(taskId)}, 
                {$set: {
                    task: task, 
                    priority: priority, 
                    description: description, 
                    dueDate: dueDate}}
            )   
            return updateResponse
        } 
        catch (error) {
            console.error(`Unable to update task: ${error}`);
            return {error: error}
        }
    }

    // Delete task Document based on Mongo ObjectId
    static async deleteTask(taskId) {
        try {
            const deleteResponse = await tasks.deleteOne({"_id": ObjectId(taskId)});
            return deleteResponse
        } 
        catch (error) {
            console.error(`Unable to delete task: ${error}`);
            return {error: error}
        }
    }

    static async getTasks() {
        let cursor;
        try{
            cursor = await tasks.find();
            const tasksList = await cursor.toArray();
            return tasksList
        }
        catch(error) {
            console.error(`Unable to issue find command, ${error}`);
            let tasksList = [];
            return tasksList
        }
    }

    static async getTask(taskId) {
        let cursor;
        try{
            cursor = await tasks.find({"_id": ObjectId(taskId)});
            const tasksList = await cursor.toArray();
            return tasksList
        }
        catch(error) {
            console.error(`Unable to issue find command, ${error}`);
            let tasksList = [];
            return tasksList
        }
    }
}
