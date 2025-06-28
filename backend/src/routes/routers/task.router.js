const express = require('express');
const { authenticateUser } = require('../../middlewares/auth.middleware');
const { body } = require('express-validator');
const validateRequest = require('../../middlewares/validator');
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require('../../controllers/task.controller');

const taskRouter = express.Router();

// Create Task
taskRouter.post(
    '/',
    authenticateUser,
    [
        body('title').notEmpty().withMessage('Title is required'),
        body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium, or High'),
        body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date')
    ],
    validateRequest,
    createTask
);

// Get All Tasks for User
taskRouter.get('/', authenticateUser, getTasks);

// Get Single Task by ID
taskRouter.get('/:id', authenticateUser, getTaskById);

// Update Task
taskRouter.put(
    '/:id',
    authenticateUser,
    [
        body('title').optional().notEmpty().withMessage('Title cannot be empty'),
        body('priority').optional().isIn(['Low', 'Medium', 'High']).withMessage('Priority must be Low, Medium, or High'),
        body('dueDate').optional().isISO8601().withMessage('Due date must be a valid date'),
        body('completed').optional().isBoolean().withMessage('Completed must be a boolean')
    ],
    validateRequest,
    updateTask
);

// Delete Task
taskRouter.delete('/:id', authenticateUser, deleteTask);

module.exports = taskRouter;