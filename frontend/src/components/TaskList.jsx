import { useState } from "react";

function TaskList({ tasks, onAdd, onToggle }) {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");

  const handleAdd = () => {
    if (!title) return;
    onAdd({ title, dueDate });
    setTitle("");
    setDueDate("");
  };

  return (
    <div>
      {/* Add Task */}
      <div className="flex gap-2 mb-4">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 rounded w-full"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button onClick={handleAdd} className="bg-black text-white px-3 rounded">
          Add
        </button>
      </div>

      {/* Task List */}
      {tasks.map((task) => (
        <div key={task._id} className="flex justify-between items-center border-b py-2">
          <div>
            <div className={task.status === "completed" ? "line-through" : ""}>
              {task.title}
            </div>
                <div className="text-xs text-gray-400">
                    {task.dueDate ? new Date(task.dueDate).toISOString().split("T")[0] : ""}
                </div>          
            </div>

          <button
            onClick={() => onToggle(task)}
            className="text-sm text-blue-600"
          >
            {task.status === "completed" ? "Undo" : "Done"}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;