import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    let greeting;
    if (currentHour < 12) {
      greeting = "Good Morning";
    } else if (currentHour >= 12 && currentHour < 17) {
      greeting = "Good Afternoon";
    } else {
      greeting = "Good Evening";
    }
    return greeting;
  };

  const [taskFormOpen, setTaskFormOpen] = useState(false);
  const openTaskForm = () => {
    setTaskFormOpen(true);
  };
  const closeTaskForm = () => {
    setTaskFormOpen(false);
  };

  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const clearValues = () => {
    setName("");
    setDescription("");
  };

  const [editTaskIndex, setEditTaskIndex] = useState(-1);
  const [editFormOpen, setEditFormOpen] = useState(false);

  const openEditForm = (index) => {
    setEditTaskIndex(index);
    setEditFormOpen(true);
    const taskToEdit = pendingTasks[index];
    setName(taskToEdit.name);
    setDescription(taskToEdit.description);
  };

  const closeEditForm = () => {
    setEditTaskIndex(-1);
    setEditFormOpen(false);
    clearValues();
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const updatedTask = {
      name: name,
      description: description,
      timeAdded: pendingTasks[editTaskIndex].timeAdded,
      timeCompleted: pendingTasks[editTaskIndex].timeCompleted
    };
    const updatedPendingTasks = [...pendingTasks];
    updatedPendingTasks[editTaskIndex] = updatedTask;
    setPendingTasks(updatedPendingTasks);
    closeEditForm();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const currentTime = new Date();
    const newTask = {
      name: name,
      description: description,
      timeAdded: currentTime.toLocaleString(),
      timeCompleted: null
    };
    setPendingTasks([...pendingTasks, newTask]);
    clearValues();
    setTaskFormOpen(false);
  };
  const markTaskAsCompleted = (index) => {
    const taskToMove = pendingTasks[index];
    taskToMove.timeCompleted = new Date().toLocaleString();
    setCompletedTasks([...completedTasks, taskToMove]);
    const updatedPendingTasks = [...pendingTasks];
    updatedPendingTasks.splice(index, 1);
    setPendingTasks(updatedPendingTasks);
  };

  const markTaskAsPending = (index) => {
    const taskToMove = completedTasks[index];
    delete taskToMove.timeCompleted;
    setPendingTasks([...pendingTasks, taskToMove]);
    const updatedCompletedTasks = [...completedTasks];
    updatedCompletedTasks.splice(index, 1);
    setCompletedTasks(updatedCompletedTasks);
  };

  const deleteTask = (index, isCompleted) => {
    if (isCompleted) {
      const updatedCompletedTasks = [...completedTasks];
      updatedCompletedTasks.splice(index, 1);
      setCompletedTasks(updatedCompletedTasks);
    } else {
      const updatedPendingTasks = [...pendingTasks];
      updatedPendingTasks.splice(index, 1);
      setPendingTasks(updatedPendingTasks);
    }
  };

  return (
    <div className="App">
      <header>
        <h1 className="greeting">{getGreeting()}</h1>
        <p>What's on your mind ?</p>
      </header>

      <main>
        <button className="add-task" onClick={openTaskForm}>
          Add Task
        </button>
        {taskFormOpen && (
          <div className="task-form-container">
            <div className="task-form">
              <div style={{ textAlign: "right" }}>
                <button className="close-btn" onClick={closeTaskForm}>
                  &times;
                </button>
              </div>
              <form onSubmit={handleSubmit}>
                <div>
                  <label>
                    Enter Task Name:
                    <br />
                    <input
                      type="text"
                      value={name}
                      maxLength="15"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <br />
                <div>
                  <label>
                    Enter Task Description:
                    <br />
                    <textarea
                      type="text"
                      value={description}
                      maxLength="50"
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      style={{ height: "100px" }}
                    />
                  </label>
                </div>
                <br />
                <div className="form-btn">
                  <button type="submit">Add</button>
                  <button
                    onClick={() => {
                      clearValues();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
        {editFormOpen && (
          <div className="task-form-container">
            <div className="task-form">
              <div style={{ textAlign: "right" }}>
                <button className="close-btn" onClick={closeEditForm}>
                  &times;
                </button>
              </div>
              <form onSubmit={handleEditSubmit}>
                <div>
                  <label>
                    Edit Task Name:
                    <br />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </label>
                </div>
                <br />
                <div>
                  <label>
                    Edit Task Description:
                    <br />
                    <textarea
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      required
                      style={{ height: "100px" }}
                    />
                  </label>
                </div>
                <br />
                <div className="form-btn">
                  <button type="submit">Save</button>
                  <button onClick={closeEditForm}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
        <br />
        <br />
        <div className="tasks">
          <h2>Pending Tasks</h2>
          {pendingTasks.length === 0 ? (
            <p className="empty-list-txt">no pending tasks</p>
          ) : (
            <ul>
              {pendingTasks.map((task, index) => {
                return (
                  <li key={index}>
                    <div>
                      <h3 style={{ textAlign: "center", margin: "0" }}>
                        {index === editTaskIndex ? (
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        ) : (
                          task.name
                        )}
                      </h3>
                      <p>
                        {index === editTaskIndex ? (
                          <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            style={{ height: "100px" }}
                          />
                        ) : (
                          task.description
                        )}
                      </p>
                      <br />
                      <small style={{ textAlign: "right", display: "block" }}>
                        <b>{task.timeAdded}</b>
                      </small>
                      {task.timeCompleted && (
                        <small style={{ textAlign: "right", display: "block" }}>
                          <b>Completed: {task.timeCompleted}</b>
                        </small>
                      )}
                      <br />
                      <div style={{ textAlign: "center" }}>
                        {index === editTaskIndex ? (
                          <>
                            <button onClick={handleEditSubmit}>
                              Save Changes
                            </button>
                            <button onClick={closeEditForm}>Cancel</button>
                          </>
                        ) : (
                          <button onClick={() => markTaskAsCompleted(index)}>
                            Set as Completed
                          </button>
                        )}
                        <button onClick={() => openEditForm(index)}>
                          Edit Task
                        </button>
                        <br />
                        <button onClick={() => deleteTask(index, false)}>
                          Delete Task
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="tasks">
          <h2>Completed Tasks</h2>
          {completedTasks.length === 0 ? (
            <p className="empty-list-txt">no completed tasks</p>
          ) : (
            <ul>
              {completedTasks.map((task, index) => {
                return (
                  <li key={index}>
                    <div>
                      <h3 style={{ textAlign: "center", margin: "0" }}>
                        {task.name}
                      </h3>
                      <p>{task.description}</p>
                      <br />
                      <small style={{ textAlign: "right", display: "block" }}>
                        <b>{task.timeAdded}</b>
                      </small>
                      {task.timeCompleted && (
                        <small style={{ textAlign: "right", display: "block" }}>
                          <b>
                            <span style={{ color: "#7b7b7b" }}>Completed:</span>{" "}
                            {task.timeCompleted}
                          </b>
                        </small>
                      )}
                      <br />
                      <div style={{ textAlign: "center" }}>
                        <button onClick={() => markTaskAsPending(index)}>
                          Set as Pending
                        </button>
                        <br />
                        <button onClick={() => deleteTask(index, true)}>
                          Delete Task
                        </button>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
