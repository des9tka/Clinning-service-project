import logo from './logo.svg';
import './App.css';
import axios from "axios";
import {useEffect, useState} from "react";

function App() {
    let [users, setUsers] = useState([]);
    let [services, setServices] = useState([]);
    useEffect(() => {
        axios.get('/api/users').then(value => setUsers(value.data.data))
        axios.get('/api/services').then(value => setServices(value.data.data))
    }, [])
    const post = () => {
        axios.patch('/api/services/1', {
            name: 'Clininggggggggg'
        }).then(function (response) {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
        });
      }
    return (
        <div className="App">
            {users.map(user => <div key={user.id}>email - {user.email} && id - {user.id}</div>)}
            {services.map(service => <div key={service.id}>service - {service.name} && id - {service.id}</div>)}
            <button onClick={() => post()}>post</button>
        </div>
    );
}

export default App;
