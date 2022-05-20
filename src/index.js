import Fastify from 'fastify';

import { users } from './users';

const fastify = Fastify({
  logger: true,
});
fastify.register(import('@fastify/cors'));
fastify.register(import('@fastify/multipart'), {
  addToBody: true,
});
fastify.register(import('@fastify/cookie'));

fastify.post('/uppercase', (request, reply) => {
  let str = request.body;
  if (str.toUpperCase().includes('FUCK')) {
    return reply.status(403).send('unresolved');
  }
  return reply.status(200).send(str.toUpperCase());
});

fastify.post('/lowercase', (request, reply) => {
  let str = request.body;
  if (str.toLowerCase().includes('fuck')) {
    return reply.status(403).send('unresolved');
  }
  return reply.status(200).send(str.toLowerCase());
});

fastify.get('/user/:id', (request, reply) => {
  let { id } = request.params;
  if (users.hasOwnProperty(id)) {
    return reply.send(users[id]);
  }
  return reply.status(400).send('User not exist');
  // for (const [key, value] of Object.entries(users)) {
  //   if (id === key) {
  // return reply.send(value)
  //   }

  // }
  //  return reply.status(400).send('User not exist');
});

fastify.get('/users', (request, reply) => {
  const arrUsers = Object.values(users);

  let { filter, value } = request.query;
   if (filter === undefined && value === undefined) {
    return arrUsers;
  }
  const filteredArr = arrUsers.filter((element) => {
    return String(element[filter]) === value;
  });
  return reply.send(filteredArr);
});

// const opts = {
//   type: 'object',
//   properties: {
//     filter: { type: 'string' },
//     value: { type: 'integer' },
//   },
// };

// fastify.get('/', opts, (request, reply) => {
//   reply.send({ params: request.query });
// });

// fastify.get('/users', opts, (request, reply) => {
//   const arrUsers = Object.values(users);

//   let { filter, value } = request.query;
//   if (filter === undefined && value === undefined) {
//     return arrUsers;
//   }
//   const filteredArr = arrUsers.filter((element) => {
//     return String(element[filter]) === value;
//   });
//   return reply.send(filteredArr);
// });

// fastify.get('/users', (request, reply) => {
//   const arrUsers = Object.values(users);
//   let incorrect = false;
//   if (request.query === null) {
//     return arrUsers;
//   }
//   let { filter, value } = request.query;

//   const filteredArr = arrUsers.filter((element) => {
//     if(!element.hasOwnProperty(filter)) {
//       incorrect = true
//     }

//     return String(element[filter]) === value;
//   });
//   if (incorrect) {
//     return reply.send(arrUsers);
//   }
//   return reply.send(filteredArr);
// });

export default fastify;
