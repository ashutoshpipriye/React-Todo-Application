import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal } from "react-bootstrap";

const AddTask = (props) => {
    // console.log(props.show);

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    {props.title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <div className="form-group">
                        <label htmlFor="summary">Summary</label>
                        <input
                            type="text"
                            className="form-control"
                            name="summary"
                            placeholder="Summary"
                            id="summary"
                            value={props.summary}
                            minLength={10}
                            maxLength={140}
                            onChange={e => props.onInputChanges(e)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="desc">Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            name="description"
                            placeholder="Description"
                            id="desc"
                            value={props.description}
                            minLength={10}
                            maxLength={500}
                            onChange={e => props.onInputChanges(e)}
                        />
                    </div>
                    <div className="row">
                        <div className="form-group col-md-6">
                            <label htmlFor="duedate">Due Date</label>
                            <input
                                type="date"
                                className="form-control"
                                name="dueDate"
                                id="duedate"
                                value={props.dueDate}
                                onChange={e => props.onInputChanges(e)}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <label htmlFor="priority">Priority</label>
                            <select
                                className="form-control"
                                id="priority"
                                name="priority"
                                value={props.priority}
                                onChange={e => props.onInputChanges(e)}>
                                <option >Select the priority</option>
                                <option value="None">None</option>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </div>
                    </div>
                </form>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-secondary mr-2" onClick={props.onHide} >Close</button>
                <button className="btn btn-success" onClick={() => props.addData()}>Save</button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddTask;