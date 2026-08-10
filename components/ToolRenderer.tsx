import TodoCard from "./TodoCard";

export default function ToolRenderer({
  part,
}: {
  part: any;
}) {

  // Tool input is still streaming
  if (
    part.type === "tool-getTodos" &&
    part.state === "input-streaming"
  ) {
    return (
      <div className="mt-3 p-3 rounded-lg bg-blue-100 border border-blue-300">
        🔵 Preparing todo search...
      </div>
    );
  }


  // Tool received input
  if (
    part.type === "tool-getTodos" &&
    part.state === "input-available"
  ) {
    return (
      <div className="mt-3 p-3 rounded-lg bg-yellow-100 border border-yellow-300">
        🟡 Searching todos for:
        <b className="ml-1">
          {part.input.category}
        </b>
      </div>
    );
  }


  // Tool returned result
  if (
    part.type === "tool-getTodos" &&
    part.state === "output-available"
  ) {
    return (
      <TodoCard data={part.output} />
    );
  }


  // Tool failed
  if (
    part.type === "tool-getTodos" &&
    part.state === "output-error"
  ) {
    return (
      <div className="mt-3 p-3 rounded-lg bg-red-100 border border-red-300">
        🔴 Tool failed:
        <p>
          {part.errorText}
        </p>
      </div>
    );
  }


  return null;
}