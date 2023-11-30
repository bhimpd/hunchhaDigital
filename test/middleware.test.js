// middleware.test.js
const { expect } = require('chai');
const sinon = require('sinon');
const { validateToken } = require('../src/middleware/validateToken');

describe('Authentication Middleware', () => {
  let req, res, next, sandbox;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    req = { header: sandbox.stub() };
    res = { status: sandbox.stub(), json: sandbox.stub() };
    next = sandbox.stub();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should return 401 if no token is provided', () => {
    validateToken(req, res, next);

    expect(res.status.calledWith(401)).to.be.true;
    expect(res.json.calledWith({ message: 'Unauthorized: Token not provided' })).to.be.true;
    expect(next.called).to.be.false;
  });

  // Add more test cases for valid and invalid tokens if needed
});
