
const typeDefs = `
  type Query {
    notifications: [Notification]
  }
  type Notification {
    label: String
  }

  type Mutation { 
    pushNotification(label: String!): Notification 
  }
`
export default typeDefs
