export default function TodoCard({
  data,
}: {
  data: {
    category: string;
    todos: {
      id: number;
      title: string;
      completed: boolean;
    }[];
  };
}) {
  return (
    <div className="border rounded-xl p-4 mt-3 bg-white shadow">

      <h2 className="text-lg font-bold mb-2">
        Todo Results: {data.category}
      </h2>

      <div className="space-y-2">

        {data.todos.map((todo) => (
          <div
            key={todo.id}
            className="flex justify-between items-center border rounded-lg p-2"
          >

            <span>
              {todo.title}
            </span>

            <span>
              {todo.completed ? "✅ Done" : "⏳ Pending"}
            </span>

          </div>
        ))}

      </div>

    </div>
  );
}