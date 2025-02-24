import { MdOutlineDeleteOutline } from "react-icons/md";

const TotalItem = ({ tasks, toggleTask, deleteTask }) => {
  return (
    <ul className="list-group">
      {tasks.map((task) => (
        <li
          key={task._id}
          className="list-group-item d-flex justify-content-between align-items-center"
        >
          <div 
            className={`flex-grow-1 ${task.completed ? "text-decoration-line-through text-muted" : ""}`} 
            onClick={() => toggleTask(task._id)}
            style={{ cursor: "pointer" }}
          >
            <strong>{task.text}</strong>
            <small className="p-3 text-muted">{task.date}</small>
          </div>
          <button
            onClick={() => deleteTask(task._id)}
            className="btn btn-danger btn-sm d-flex align-items-center"
          >
            <MdOutlineDeleteOutline size={20} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TotalItem;
