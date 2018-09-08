const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const NOTIFICATION_SUBSCRIPTION_TOPIC = 'newNotifications'

const notifications = []
const resolvers = {
  Query: {
    notifications: (root, args) => {
      return []
    }
  },
  Mutation: {
    pushNotification: (root, args) => {
      const newNotification = { label: args.label }
      notifications.push(newNotification)

      return newNotification
    }
  },
  Subscription: {
    newNotification: {
      subscribe: () => pubsub.asyncIterator(NOTIFICATION_SUBSCRIPTION_TOPIC)
    }
  }
}
module.exports.resolvers = resolvers
