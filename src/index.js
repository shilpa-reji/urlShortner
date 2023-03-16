import cors from 'cors';
import express from 'express';
import { ApolloServer,  } from 'apollo-server-express';
import 'dotenv/config';

import schema from './schema';
import resolvers from './resolvers';
import models, { sequelize } from './models';

const app = express();
app.use(cors());

var Bugsnag = require('@bugsnag/js')
var BugsnagPluginExpress = require('@bugsnag/plugin-express')
Bugsnag.start({
  apiKey: '3df437fe0a8924b0d796cc0dce00f0d9',
  plugins: [BugsnagPluginExpress]
})
var middleware = Bugsnag.getPlugin('express')
app.use(middleware.requestHandler)
app.use(middleware.errorHandler)

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  formatError: (error) => {
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');
    return {
      ...error,
      message,
    };
  },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
      };
    }
    if (req) {
      return {
        models,
      };
    }
  },
});

server.applyMiddleware({ app, path: '/graphql' });

const eraseDatabaseOnSync = false;

sequelize.sync({ force: eraseDatabaseOnSync }).then(async () => {


  app.listen({ port: process.env.PORT }, () => {
    console.log('Apollo Server on http://localhost:80/graphql');
  });
}).catch((Err) => {
  throw Err;
});
