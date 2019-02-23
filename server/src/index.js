import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { makeExecutableSchema } from 'graphql-tools';
import { createServer } from 'http';
import bodyParser from 'body-parser';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import { auth } from './services/auth'
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.set('debug', true); // debug mode on

try {
    mongoose.connect('mongodb://testuser:aq20132014@ds149754.mlab.com:49754/gql', {
        useMongoClient: true,
    });
} catch (err) {
    mongoose.createConnection('mongodb://testuser:aq20132014@ds149754.mlab.com:49754/gql', {
        useMongoClient: true,
    });
}
mongoose.connection
    .once('open', () => console.log('MongoDB Running'))
    .on('error', e => {
        throw e;
    });

const app = express(); // create an instance of express
app.use(bodyParser.json()); // add body-parser as the json parser middleware
app.use(auth);
app.use((req, res, next) => setTimeout(next, 0));
app.use(
    '/graphiql',
    graphiqlExpress({
        endpointURL: '/graphql',
        subscriptionsEndpoint: 'ws://localhost:4000/subscriptions'

    }),
);
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

app.use('/graphql',
    graphqlExpress(req => (
        {
            schema,
            context: {
                user: req.user
            }
        }
    )),
);
const graphQLServer = createServer(app);

graphQLServer.listen(process.env.PORT || 4000, err => {
    if (err) {
        console.error(err);
    } else {
        new SubscriptionServer({ // eslint-disable-line
            schema,
            execute,
            subscribe
        }, {
                server: graphQLServer,
                path: '/subscriptions'
            })
        console.log('App listen on port: 4000');
    }
});
