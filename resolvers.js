const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { MQTTPubSub } = require("graphql-mqtt-subscriptions");
const { connect } = require("mqtt");
const { AuthenticationError, UserInputError } = require("apollo-server-lambda");
const db = require('./db');

// const client = connect("mqtt://agrh2cakrugz9-ats.iot.us-east-1.amazonaws.com", {
//     clientId: "graphqltestgroup_Core-c01",
//     port: 8883,
//     protocol: "mqtt",
//     key: fs.readFileSync("./certs/683d04f224.private.key", "utf8"),
//     cert: fs.readFileSync("./certs/683d04f224.cert.pem", "utf8"),
//     ca: fs.readFileSync("./certs/root.ca.pem", "utf8")
// });

// const pubsub = new MQTTPubSub({
//     client
// });

function verifyJWTToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, "secretkey", (err, decodedToken) => {
      if (err || !decodedToken) {
        return reject(err);
      }

      resolve(decodedToken);
    });
  });
}

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
        getUser: (_, args) => {
            return db.getTable("usersTable").scan().only().eq("email", [args.email]).exec().then(data => {
                if (data.Count === 0) {
                    throw new UserInputError("User does not exist");
                }

                return data.Items[0];
            })
            .catch(err => {
                throw err;
            });;
        },
        getLoginUser: (_, args, { headers }) => {
            const token = headers.token || '';

            return verifyJWTToken(token)
                .then(decodedToken => {
                    return db.getTable("usersTable").scan().only().eq("email", [decodedToken.email]).exec();
                })
                .then(data => {
                    if (data.Count == 0) {
                        throw new AuthenticationError(
                            'Your session expired. Login again.',
                        );
                    }

                    return data.Items[0];
                })
                .catch(err => {
                    throw new AuthenticationError(
                        'Your session expired. Login again.',
                    );
                });
        }
    },
    Mutation: {
        register: (_, args) => {
            return db.getTable("usersTable").scan().only().eq("email", [args.email]).exec().then(data => {
                if (data.Count > 0) {
                    throw new UserInputError("Email is already taken");
                }

                return bcrypt.genSalt(10);
            })
            .then(salt => {
                return bcrypt.hash(args.password, salt);
            })
            .then(hash => {
                return db.getTable("usersTable").insertRecord({ email: args.email, password: hash });
            })
            .then(data => data)
            .catch(err => {
                throw err;
            });
        },
        login: (_, args) => {
            let user;
            return db.getTable("usersTable").scan().only().eq("email", [args.email]).exec().then(data => {
                if (data.Count == 0) {
                    throw new AuthenticationError(
                        'No user found with this login credentials.',
                    );
                }

                user = data.Items[0]

                return bcrypt.compare(args.password, user.password);
            })
            .then(result => {
                if (!result) {
                    throw new AuthenticationError(
                        'No user found with this login credentials.',
                    );
                }

                const token = jwt.sign({ email: user.email }, "secretkey", { algorithm: "HS256", expiresIn: "1h" });

                return { token };
            })
            .catch(err => {
                throw err;
            });
        }
    },
    // Subscription: {
    //     subscribe2message: {
    //         resolve: (payload) => {
    //             return payload;
    //         },
    //         subscribe: (_, args) => pubsub.asyncIterator(args.topic)
    //     }
    // }
}

module.exports = resolver;