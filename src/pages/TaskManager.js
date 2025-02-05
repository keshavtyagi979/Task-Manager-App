import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:5000/api/tasks', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setTasks(res.data))
      .catch(err => console.log(err));
  }, [token]);

  const addTask = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/tasks', { title, description }, { headers: { Authorization: `Bearer ${token}` } });
    setTasks([...tasks, res.data]);
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <form onSubmit={addTask}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <button type="submit">Add Task</button>
      </form>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>{task.title} - {task.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
