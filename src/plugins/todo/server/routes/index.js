module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: 'myController.index',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/find',
    handler: 'todo.find',
    config: {
      policies: [],
      auth: false
    },
  },
];
