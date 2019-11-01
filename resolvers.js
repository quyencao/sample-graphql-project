const db = require('./db');

const resolver = {
    Query: {
        getUsers: (_, args) => {
            return  db.getTable("usersTable")
            .getRecords({})
            .then(data => {
                return data.Items
            })
            .catch(err => null);
        },
    },
    Mutation: {
        register: (_, args) => {
            return db.getTable("usersTable")
            .insertRecord({ email: args.input.email, password: args.input.password })
            .then(data => data)
            .catch(err => {
                throw err;
            })
        }
    }
}

module.exports = resolver;