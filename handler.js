const AWS = require('aws-sdk');
const uuid = require('uuid/v4');

// create client for interacting with dynamodb
const dynamoDbDocClient = new AWS.DynamoDB.DocumentClient();

/**
 * hello world lambda
 *
 * @param {object} event - request data
 * @param {object} context - aws data
 * @param {function} callback - called with either error as first argument, or
 * success response for second argument
 * @returns void
 */
const helloWorld = (event, context, callback) => {
  // first argumnet is error, second is success
  callback(null, 'Hello world');
};

/**
 * return a promise instead of invoking the callback
 *
 * @param {object} event - request data
 * @returns {Promise}
 */
const helloPromise = event => {
  return Promise.resolve('hello promise, reloaded');
};

/**
 * define the function as async
 *
 * @param {object} event - request data
 * @returns {Promise}
 */
const helloAsync = async event => {
  return 'hello async';
};

/**
 * define a function that can be called via API Gateway
 *
 * @param {object} event - request data
 * @returns {object}
 */
const helloGetEvent = async event => {
  return {
    statusCode: 200,
    body: JSON.stringify({message: 'hello world'}),
  };
};

/**
 * createTodo
 *
 * @param {object} event - request data
 * @returns {undefined}
 */
const createTodo = async event => {
  const data = JSON.parse(event.body);
  const params = {
    TableName: 'todos',
    Item: {
      checked: false,
      id: uuid(),
      text: data.text,
    },
  };

  try {
    await dynamoDbDocClient.put(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify(err),
    };
  }
};

module.exports = {
  createTodo,
  helloAsync,
  helloGetEvent,
  helloPromise,
  helloWorld,
};
