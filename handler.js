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

module.exports = {
  helloAsync,
  helloGetEvent,
  helloPromise,
  helloWorld,
};
