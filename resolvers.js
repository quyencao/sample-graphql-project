const db = require('./db');

const resolver = {
    Query: {
        getTodo: (_, args) => {
            return db.getTable("todosTable").getRecordById(args.id).then(todo => {
                return todo;
            }).catch(err => null);
        }
    },
    Mutation: {
        createTodo: (_, args) => {
            return db.getTable("todosTable")
            .insertRecord({
                text: args.text,
                completed: false
            })
            .then(data => true)
            .catch(err => false)
        }
    }
}

module.exports = resolver;
