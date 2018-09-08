const express = require('express')
const bodyParser = require('body-parser')
const { graphqlExpress, graphiqlExpress, ApolloServer, gql } = require('apollo-server-express')
const { makeExecutableSchema } = require('graphql-tools')
const cors = require('cors')
const { execute, subscribe } = require('graphql')
const { createServer } = require('http')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { typeDefs } = require('./schema')
const { resolvers } = require('./resolvers')

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

apollo.applyMiddleware({ app })

app.use('*', cors({ origin: `http://localhost:3000` }))
app.use(bodyParser.json())

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

app.use('/graphql', (req, res, next) => {
  graphqlExpress({ schema })
  next()
})

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
})
