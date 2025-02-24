const express = require("express");
const mongoose =require ("mongoose");
const cors=require("cors")
const dotenv=require("dotenv")

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect('mongodb+srv://krishnendumaity2110:bopJ0KapTPT94Iy8@cluster0.jxxop.mongodb.net/Todo')
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.error(err));

const taskSchema = new mongoose.Schema({
  text: String,
  date: String,
  completed: Boolean,
});

const Task = mongoose.model("Task", taskSchema);

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

app.post("/tasks", async (req, res) => {
  const { text, date } = req.body;
  const newTask = new Task({ text, date, completed: false });
  await newTask.save();
  res.json(newTask);
});

app.put("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});
app.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.listen(4001, () => console.log(`Server running on port http://localhost:4001`));
