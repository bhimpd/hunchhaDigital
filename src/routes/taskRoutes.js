const express = require("express");
const router = express.Router();

const {validateToken} = require("../middleware/validateToken")
const {createTask,getAllTasks,getSingleTask,updateTask,deleteTask} = require("../controllers/taskController")

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: APIs for managing tasks
 */


/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */

/**
 * @swagger
 * security:
 *   - bearerAuth: []
 */

/**
 * @swagger
 * /task:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Task created successfully
 *               task:
 *                 taskid: 1
 *                 title: Sample Task
 *                 status: pending
 *       '400':
 *         description: Bad Request, title and status are required
 *         content:
 *           application/json:
 *             example:
 *               message: Title and status are required fields.
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */

router.route("/").post(createTask);


/**
 * @swagger
 * /task:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     responses:
 *       '200':
 *         description: All tasks retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: All tasks...
 *               tasks:
 *                 - taskid: 1
 *                   title: Sample Task
 *                   status: pending
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */
router.route("/").get(getAllTasks);



/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get details of a single task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Task details retrieved successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Task details for id 1.
 *               task:
 *                 taskid: 1
 *                 title: Sample Task
 *                 status: pending
 *       '404':
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: Task with id 1 not found. Enter a correct id.
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */
router.route("/:id").get(getSingleTask);




/**
 * @swagger
 * /task/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Task with id 1 updated successfully.
 *               updatedTask:
 *                 taskid: 1
 *                 title: Updated Task
 *                 status: completed
 *       '400':
 *         description: Bad Request, title and status are required
 *         content:
 *           application/json:
 *             example:
 *               message: Title and status are required fields.
 *       '404':
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: Task with id 1 not found. Enter a correct id.
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */


router.route("/:id").put(validateToken,updateTask);

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: Task with id 1 deleted successfully.
 *       '404':
 *         description: Task not found
 *         content:
 *           application/json:
 *             example:
 *               message: Task with id 1 not found. Enter a correct id.
 *       '500':
 *         description: Server error
 *         content:
 *           application/json:
 *             example:
 *               message: Server error
 */

router.route("/:id").delete(validateToken,deleteTask);

module.exports = router;