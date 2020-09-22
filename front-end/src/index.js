import React from 'react';
import ReactDOM from 'react-dom';
import App from "./App.js"

const userData = {
    token: localStorage.getItem('token'),
    username: localStorage.getItem('username')
};

console.log(userData);

ReactDOM.render(<App userData={userData} />, document.getElementById('root'));
