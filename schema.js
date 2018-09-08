const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type Query {
    notifications: [Notification]
  }

  type Notification {
    label: String
  }

  type Mutation { 
    pushNotification(label: String!): Notification 
  }

  type Subscription {
    newNotification: Notification
  }
`
module.exports.typeDefs = typeDefs
