import { useState } from "react";

const AddItem = ({ addTask }) => {
  const [input, setInput] = useState("");
  const [date, setDate] = useState("");

  const handleAddTask = () => {
    if (input.trim() !== "" && date !== "") {
      addTask(input, date);
      setInput("");
      setDate("");
    }
  };

  return (
    <div className="d-flex mb-3">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="form-control me-2"
        placeholder="Add a new task..."
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="form-control me-2"
      />
      <button
        onClick={handleAddTask}
        className="btn btn-primary"
      >
        Add
      </button>
    </div>
  );
};

export default AddItem;
