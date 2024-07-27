const { useState } = React;

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  const handleInputChange = (e) => {
    setTaskInput(e.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;
    setTasks([...tasks, { text: taskInput, completed: false }]);
    setTaskInput("");
  };

  const toggleTaskCompletion = (index) => {
    const newTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const editTask = (index) => {
    setTaskInput(tasks[index].text);
    setEditingTask(index);
  };

  const saveTask = (e) => {
    e.preventDefault();
    if (taskInput.trim() === "") return;
    const newTasks = tasks.map((task, i) =>
      i === editingTask ? { ...task, text: taskInput } : task
    );
    setTasks(newTasks);
    setTaskInput("");
    setEditingTask(null);
  };

  return (
    <div className="container">
      <h1>To-Do List</h1>
      <form onSubmit={editingTask !== null ? saveTask : addTask}>
        <input
          type="text"
          value={taskInput}
          onChange={handleInputChange}
          placeholder="Add a new task"
        />
        <button type="submit">{editingTask !== null ? "Save" : "Add"}</button>
      </form>
      <ul>
        {tasks.map((task, index) => (
          <li key={index} className={task.completed ? "completed" : ""}>
            <span onClick={() => toggleTaskCompletion(index)}>
              {task.text}
            </span>
            <div>
              <button className="edit-btn" onClick={() => editTask(index)}>
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteTask(index)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
