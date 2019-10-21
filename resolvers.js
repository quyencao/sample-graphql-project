const db = require('./db');

const resolver = {
    Query: {
        getTodo: (_, args) => {
            return db.getTable("todosTable").getRecordById(args.id).then(data => {
                return data.Item
            }).catch(err => null);
        },
        getTodos: (_, args) => {
            return  db.getTable("todosTable").getRecords({}).then(data => {
                return data.Items
            }).catch(err => null);
        },
        getUser: (_, args) => {
            return db.getTable("usersTable").getRecordById(args.id).then(data => {
                return data.Item
            }).catch(err => null);
        },
        getUsers: (_, args) => {
            return  db.getTable("usersTable").getRecords({}).then(data => {
                return data.Items
            }).catch(err => null);
        },
    },
    Mutation: {
        createTodo: (_, args) => {
            return db.getTable("todosTable")
            .insertRecord(args.input)
            .then(data => data)
            .catch(err => {
                throw err;
            })
        },
        deleteTodo: (_, args) => {
            return db.getTable("todosTable")
                .deleteRecordById(args.id)
                .then(data => true)
                .catch(err => false);
        },
        updateTodo: (_, args) => {
            return db.getTable("todosTable")
                .updateRecordById(args.id, args.input)
                .then(data => data.Attributes)
                .catch(err => null);
        },
        createUser: (_, args) => {
            return db.getTable("usersTable")
            .insertRecord(args.input)
            .then(data => data)
            .catch(err => {
                throw err;
            })
        },
        deleteUser: (_, args) => {
            return db.getTable("usersTable")
                .deleteRecordById(args.id)
                .then(data => true)
                .catch(err => false);
        },
        updateUser: (_, args) => {
            return db.getTable("usersTable")
                .updateRecordById(args.id, args.input)
                .then(data => data.Attributes)
                .catch(err => null);
        },
    }
}

module.exports = resolver;
