import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from "react-bootstrap";
import EditTask from '../../Modal/Add_edit_task_form';
import ViewTask from '../../Modal/View_task_form';
import axios from 'axios';

const AllTask = (props) => {
    // console.log(props);
    const [modalShow, setmodalShow] = useState(false);
    const [viewModalShow, setviewModalShow] = useState(false);
    const [tasks, setTasks] = useState([]);

    const [updateData, setupdateData] = useState({
        id: "",
        summary: "",
        description: "",
        dueDate: "",
        priority: "",
    });

    const onInputChanges = (event) => {
        setupdateData({ ...updateData, [event.target.name]: event.target.value });
    };

    const openEditModal = () => { setmodalShow(true) }
    const openViewModal = () => { setviewModalShow(true) }

    useEffect(() => {
        loadTasks();
    }, []);

    // load the tasks
    const loadTasks = async () => {
        await axios({
            method: "get",
            url: "http://localhost:3003/tasks",
        })
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.log(error.data);
            })
    }

    // delete the task
    const deleteTask = async (id) => {
        await axios({
            method: "delete",
            url: `http://localhost:3003/tasks/${id}`,
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error.data);
            })
        loadTasks();
    };

    // load data for update the task
    const loadTask = async (id) => {
        await axios({
            method: "get",
            url: `http://localhost:3003/tasks/${id}`,
        })
            .then((response) => {
                // console.log(response.data)
                setupdateData(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // update task
    const updateTask = async () => {
        await axios({
            method: "put",
            url: `http://localhost:3003/tasks/${updateData.id}`,
            data: updateData
        })
            .then((response) => {
                // console.log(response.data)
                setmodalShow(false);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    // complete the task
    const completeTask = (id) => {
        // In forEach loop check task id is equal to completeTask id then if equal then using for loop
        // data value task is equal to status
        tasks.forEach((task, index) => {
            if (task.id === id) {
                for (var value in task) {
                    if (value === "status") {
                        // store the tasks in updateTask using spread opereator
                        const newTasks = [...tasks];
                        // now change the status of particular task to false by deault it is true
                        const updateTaskStatus = { ...newTasks[index] };
                        updateTaskStatus[value] = !updateTaskStatus[value];
                        newTasks[index] = updateTaskStatus;
                        // update data in json server using put request
                        axios({
                            method: "put",
                            url: `http://localhost:3003/tasks/${id}`,
                            data: updateTaskStatus,
                        })
                            .then((response) => {
                                console.log(response.data)

                            })
                            .catch((error) => {
                                console.log(error);
                            })
                        setTasks(newTasks);
                        console.log(updateTaskStatus);
                    }
                }
            }
        });
    }

    let data = props.searchData.map((task) => (
        <tr key={task.id} style={{ textDecoration: task.status ? "" : "line-through" }}>
            <td onClick={() => { loadTask(task.id); openViewModal() }}>{task.summary}</td>
            <td>{task.priority}</td>
            <td>{task.createdOn}</td>
            <td>{task.dueDate}</td>
            <td>
                <button className="btn btn-primary mr-2" onClick={() => { loadTask(task.id); openEditModal() }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                    </svg>
                </button>
                <button className="btn mr-2" style={{ backgroundColor: task.status ? "#4CAF50" : "#008CBA" }} onClick={() => completeTask(task.id)}>{task.status ? "Done" : "Re-open"}</button>
                <button className="btn btn-danger" onClick={() => deleteTask(task.id)} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                    </svg>
                </button>
            </td>
        </tr>
    ))

    if (props.searchData.length === 0) {
        data = <h1>No task available</h1>
    }

    return (
        <div>
            <Table bordered style={{ marginTop: '1rem' }}>
                <thead>
                    <tr>
                        <th onClick={() => props.sortFunc("summary")}>Summary</th>
                        <th onClick={() => props.sortPriority("priority")}>Priority</th>
                        <th onClick={() => props.sortFunc("createdOn")}>Created On</th>
                        <th onClick={() => props.sortFunc("dueDate")}>Due Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody >
                    {data}
                </tbody>
            </Table>
            <EditTask
                title={"Edit Data"}
                show={modalShow}
                onHide={() => setmodalShow(false)}
                summary={updateData.summary}
                description={updateData.description}
                dueDate={updateData.dueDate}
                priority={updateData.priority}
                id={updateData.id}
                onInputChanges={onInputChanges}
                addData={updateTask}
            />
            <ViewTask
                show={viewModalShow}
                onHide={() => setviewModalShow(false)}
                summary={updateData.summary}
                description={updateData.description}
                dueDate={updateData.dueDate}
                priority={updateData.priority}
            />
        </div>
    );
}

export default AllTask;
