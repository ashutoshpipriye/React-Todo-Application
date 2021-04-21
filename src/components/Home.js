import React, { useState, useEffect, useRef } from 'react'
import Tabs from '../components/Tabs/Tabs';
import Header from './Layout/Header';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import AddTask from './Modal/Add_edit_task_form';
import axios from 'axios';

const Home = () => {
    const inputEl = useRef("");
    const [modalShow, setModalShow] = useState(false);
    const [data, setData] = useState([]);
    const [searchTask, setSearchTask] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [groupby, setGroupby] = useState("");
    let sort = true;

    // Present date of task
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1 + "";
    if (month.length < 2) {
        month = "0" + month;
    }
    var year = new Date().getFullYear();
    const today = year + '-' + month + '-' + date;

    // for addtask
    const [task, setTask] = useState({
        summary: "",
        description: "",
        dueDate: "",
        priority: "",
        createdOn: today,
        status: true
    });

    // for add modal
    const onInputChanges = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    };

    // for group by data
    const updateChanges = (event) => {
        setGroupby(event.target.value);
    };

    // open add modal
    const handleFabClick = () => {
        setModalShow(true);
    }

    useEffect(() => {
        loadTask();
    }, []);

    useEffect(() => {
    }, [data]);

    // load the data first for searching
    const loadTask = async () => {
        await axios.get(`http://localhost:3003/tasks`)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                console.log(error.data);
            })
    }

    // add data to json server
    const addData = async () => {
        await axios({
            method: "post",
            url: "http://localhost:3003/tasks",
            data: task,
        })
            .then((response) => {
                console.log(response.data);
                setModalShow(false)
            })
            .catch((error) => {
                console.log(error.data);
            })
    }

    // function for search task
    const searchHandler = (searchTask) => {
        setSearchTask(searchTask);
        if (searchTask !== "") {
            const newData = data.filter((task) => {
                return Object.values(task)
                    .join(" ")
                    .toLowerCase()
                    .includes(searchTask.toLowerCase());
            });
            setSearchResults(newData);
        } else {
            setSearchResults(data);
        }
    };

    // take input value for search and pass it into function
    const getSearchTask = () => {
        searchHandler(inputEl.current.value);
    };

    // sort data function
    const sortFunc = (name) => {
        // store the data in temporary data using spread operator
        let tempData = [...data];
        // if sort is true then
        if (sort) {
            // using sort function sort the data
            tempData.sort(function (a, b) {
                var nA = a[name].toLowerCase();
                var nB = b[name].toLowerCase();
                if (nA < nB) {
                    return -1;
                }
                if (nA > nB) {
                    return 1;
                }
                return 0;
            });
        } else {
            tempData.sort(function (a, b) {
                var nA = a[name].toLowerCase();
                var nB = b[name].toLowerCase();
                if (nB < nA) {
                    return -1;
                }
                if (nB > nA) {
                    return 1;
                }
                return 0;
            });
        }
        setData(tempData);
        // set sort value to false
        sort = !sort;
        console.log(data); // It is working but I want to use 
    };

    // group by data using priority
    let low = [];
    let medium = [];
    let high = [];
    let none = [];

    let priorityData = data.forEach((task) => {
        if (task.priority === "Low") {
            low.push(task)
        }
        else if (task.priority === "Medium") {
            medium.push(task)
        }
        else if (task.priority === "High") {
            high.push(task)
        }
        else if (task.priority === "None") {
            none.push(task)
        }
    })

    // console.log(low)
    // console.log(medium)
    // console.log(high)
    // console.log(none)

    return (
        <div>
            <CssBaseline />
            <Container>
                <Header handleFabClick={handleFabClick} />
            </Container>
            <div className="row">
                <div className="form-group col-md-4">
                    <label htmlFor="priority">Group By</label>
                    <select
                        className="form-control"
                        id="groupby"
                        name="groupby"
                        value={groupby}
                        onChange={e => updateChanges(e)}>
                        <option value="None">None</option>
                        <option value="createdOn">Created On</option>
                        <option value="pendingOn"> Pending On</option>
                        <option value="priority">Priority</option>
                    </select>
                </div>
                <div className="form-group col-md-8">
                    <label htmlFor="searchTask">Search Task</label>
                    <input
                        ref={inputEl}
                        type="text"
                        className="form-control"
                        name="searchTask"
                        placeholder="Search Task"
                        id="searchTask"
                        value={searchTask}
                        minLength={10}
                        maxLength={140}
                        onChange={getSearchTask}
                    />
                </div>
            </div>
            <Tabs
                searchData={searchTask.length < 1 ? data : searchResults} // searchData send to tabs
                loadTask={loadTask}
                sortFunc={sortFunc}
                groupby={groupby} />
            <AddTask
                title={"Add Data"}
                show={modalShow}  // open the modal
                onHide={() => setModalShow(false)}  // close the modal
                onInputChanges={onInputChanges}
                addData={addData}
                summary={task.summary}
                description={task.description}
                dueDate={task.dueDate}
                priority={task.priority}
            />
        </div>
    )
}

export default Home;