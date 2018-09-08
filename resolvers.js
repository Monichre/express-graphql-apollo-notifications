const notifications = []
const resolvers = {
  Query: {
    notifications: () => notifications
  },
  Mutation: {
    pushNotification: (root, args) => {
      const newNotification = { label: args.label }
      notifications.push(newNotification)

      return newNotification
    }
  }
}
export default resolvers
