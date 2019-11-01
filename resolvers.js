const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { AuthenticationError } = require("apollo-server-lambda");
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
        },
        login: (_, args) => {
            let user;
            return db.getTable("usersTable").scan().only().eq("email", [args.input.email]).exec().then(data => {
                if (data.Count == 0) {
                    throw new AuthenticationError(
                        'No user found with this login credentials.',
                    );
                }

                user = data.Items[0]

                return bcrypt.compare(args.input.password, user.password);
            })
            .then(result => {
                if (!result) {
                    throw new AuthenticationError(
                        'No user found with this login credentials.',
                    );
                }

                const token = jwt.sign({ email: user.email }, "secretkey", { algorithm: "HS256" });

                return { token: token };
            })
            .catch(err => {
                throw err;
            });
        }
    }
}

module.exports = resolver;