const todos = [
    {
        id: 1,
        text: "todo1",
        completed: false
    },
    {
        id: 2,
        text: "todo2",
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
                id: Math.random().toString(),
                text: args.text,
                completed: false
            };

            todos.push(newTodo);

            return newTodo
        }
    }
}

module.exports = resolver;
