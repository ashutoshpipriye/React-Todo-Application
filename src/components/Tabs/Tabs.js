import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Tabs, Tab } from "react-bootstrap";

import AllTask from '../../components/Tabs/Tab/Alltask';
import Pending from '../../components/Tabs/Tab/Pending';
import Completed from '../../components/Tabs/Tab/Completed';

const AllTabs = (props) => {
    // console.log(props)
    const [key, setKey] = useState('All');

    return (
        <div>
            <Tabs
                id="controlled-tab-example"
                defaultActiveKey="All"
                onSelect={(key) => setKey(key)}
                style={{ marginTop: '1rem' }}
                onClick={(e) => props.loadTask()}>
                <Tab eventKey="All" title="All">
                    <AllTask
                        searchData={props.searchData}
                        sortFunc={props.sortFunc}
                    // loadTask={props.loadTask()}
                    />
                </Tab>
                <Tab eventKey="Pending" title="Pending">
                    <Pending
                        searchData={props.searchData}
                        sortFunc={props.sortFunc} />
                </Tab>
                <Tab eventKey="Completed" title="Completed">
                    <Completed
                        searchData={props.searchData}
                        sortFunc={props.sortFunc} />
                </Tab>
            </Tabs>
        </div>
    );
}

export default AllTabs;
