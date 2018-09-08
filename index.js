const express = require('express')
const bodyParser = require('body-parser')
const { ApolloServer } = require('apollo-server-express')
const expressGraphQL = require('express-graphql')
const { makeExecutableSchema } = require('graphql-tools')
const cors = require('cors')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')
const config = {
  // If set to to true, GitHunt will use `extractgql` in order to
  // map query ids received from the client to GraphQL documents.
  //
  // Note that the same option must be enabled on the client
  // and the extracted_queries.json file in both the client and API server
  // must be the same.
  persistedQueries: false,
  sessionStoreSecret: 'your secret'
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

const apollo = new ApolloServer({
  typeDefs,
  resolvers,
  uploads: false,
  playground: {
    settings: {
      'editor.theme': 'light'
    }
  }
})
const app = express()

app.use('*', cors({ origin: `http://localhost:3000` }))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/graphql', (req, res, next) => {
  if (config.persistedQueries) {
    // eslint-disable-next-line no-param-reassign
    // req.body.query = invertedMap[req.body.id]
  }
  next()
})

app.use('/graphql', expressGraphQL({
  schema,
  tracing: true,
  cacheControl: true
}))

apollo.applyMiddleware({ app })

const ws = createServer(app)

ws.listen(4000, () => {
  console.log('Go to http://localhost:4000/graphiql to run queries!')

  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema
    },
    {
      server: ws,
      path: '/subscriptions'
    }
  )
  return ws
})
