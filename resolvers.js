const bcrypt = require("bcryptjs");
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
            return bcrypt.genSalt(10)
                .then(salt => {
                    return bcrypt.hash(args.input.password, salt);
                })
                .then(hash => {
                    return db.getTable("usersTable").insertRecord({ email: args.input.email, password: hash });
                })
                .then(data => data)
                .catch(err => {
                    throw err;
                })
        }
    }
}

module.exports = resolver;