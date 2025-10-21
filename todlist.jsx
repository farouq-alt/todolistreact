import { useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const taskRef = useRef();

  const handleSubmit = () => {
    const value = taskRef.current.value.trim();
    if (value === "") return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = value;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, {text:value, done:false}]);
    }

    taskRef.current.value = ""; 
  };

  const handleDelete = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    taskRef.current.value = tasks[index].text;
    setEditIndex(index);
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  return (
    <div className="container mt-5 d-flex justify-content-center">
      <div className="card shadow p-4" style={{ width: "400px" }}>
        <h4 className="text-center mb-4 text-primary">📝 Ma TodoList</h4>

        <div className="input-group mb-3">
          <input
            type="text"
            ref={taskRef}
            className="form-control"
            placeholder="Ajouter une tâche..."
          />
          <button className="btn btn-success" onClick={handleSubmit}>
            {editIndex !== null ? "Modifier" : "Ajouter"}
          </button>
        </div>

        <ul className="list-group">
          {tasks.map((item, i) => (
            <li
              key={i}
              onClick={() => toggleDone(i)}
              className="list-group-item d-flex justify-content-between align-items-center"
              style={{
                textDecoration: item.done ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              <span>{item.text}</span>
              <div>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleEdit(i);
                  }}
                >
                  ✏️
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(i);
                  }}
                >
                  🗑️
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
