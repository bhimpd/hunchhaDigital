const { expect } = require('chai');
const sinon = require('sinon');
const {
  createTask,
  getAllTasks,
  getSingleTask,
  updateTask,
  deleteTask
} = require('../src/controllers/taskController.js');
const pool = require('../src/db/postgresdb.js');

describe('Task Controller', () => {
  let req, res, next, sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = { body: {}, params: {}, header: sandbox.stub() };
    res = { status: sandbox.stub(), json: sandbox.stub() };
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  // Test cases for createTask
  describe('createTask', () => {
    it('should create a new task', async () => {
      // Arrange
      req.body = { title: 'Test Task', status: 'pending' };
      sandbox.stub(pool, 'query').resolves({ rows: [{ taskid: 1, title: 'Test Task', status: 'pending' }] });

      // Act
      await createTask(req, res);

      // Assert
      expect(res.status.calledWith(201)).to.be.true;
      expect(res.json.calledWith({ message: 'Task created successfully', task: { taskid: 1, title: 'Test Task', status: 'pending' } })).to.be.true;
    });

    // Add more test cases for edge cases and error scenarios
  });

  // Test cases for getAllTasks
  describe('getAllTasks', () => {
    it('should get all tasks', async () => {
      // Arrange
      sandbox.stub(pool, 'query').resolves({ rows: [{ taskid: 1, title: 'Test Task', status: 'pending' }] });

      // Act
      await getAllTasks(req, res);

      // Assert
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'All tasks...', tasks: [{ taskid: 1, title: 'Test Task', status: 'pending' }] })).to.be.true;
    });

    // Add more test cases for edge cases and error scenarios
  });

  // Test cases for getSingleTask
  describe('getSingleTask', () => {
    it('should get details of a single task', async () => {
      // Arrange
      req.params.id = 1;
      sandbox.stub(pool, 'query').resolves({ rows: [{ taskid: 1, title: 'Test Task', status: 'pending' }] });

      // Act
      await getSingleTask(req, res);

      // Assert
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Task details for id 1.', task: { taskid: 1, title: 'Test Task', status: 'pending' } })).to.be.true;
    });

    // Add more test cases for edge cases and error scenarios
  });

  // Test cases for updateTask
  describe('updateTask', () => {
    it('should update a task', async () => {
      // Arrange
      req.params.id = 1;
      req.body = { title: 'Updated Task', status: 'completed' };
      sandbox.stub(pool, 'query')
        .onFirstCall().withArgs('SELECT * FROM tasks WHERE taskid = $1').resolves({ rows: [{ taskid: 1, title: 'Test Task', status: 'pending' }] })
        .onSecondCall().resolves({ rows: [{ taskid: 1, title: 'Updated Task', status: 'completed' }] });

      // Act
      await updateTask(req, res);

      // Assert
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Task with id 1 updated successfully.', updatedTask: { taskid: 1, title: 'Updated Task', status: 'completed' } })).to.be.true;
    });

    // Add more test cases for edge cases and error scenarios
  });

  // Test cases for deleteTask
  describe('deleteTask', () => {
    it('should delete a task', async () => {
      // Arrange
      req.params.id = 1;
      sandbox.stub(pool, 'query')
        .onFirstCall().withArgs('SELECT * from tasks where taskid =$1').resolves({ rows: [{ taskid: 1, title: 'Test Task', status: 'pending' }] })
        .onSecondCall().resolves();

      // Act
      await deleteTask(req, res);

      // Assert
      expect(res.status.calledWith(200)).to.be.true;
      expect(res.json.calledWith({ message: 'Task with id 1 deleted successfully..' })).to.be.true;
    });

    // Add more test cases for edge cases and error scenarios
  });
});
