const todos = [
    {
        _id: 11111,
        text: "todo111111",
        completed: false
    },
    {
        _id: 22222,
        text: "todo2222222",
        completed: true
    }
];

const resolver = {
    Query: {
        getTodos: () => {
            return todos;
        }
    },
    Mutation: {
        createTodo: (_, args) => {
            const newTodo = {
                _id: Math.random().toString(),
                text: args.text,
                completed: false
            };

            todos.push(newTodo);

            return newTodo
        }
    }
}

module.exports = resolver;
