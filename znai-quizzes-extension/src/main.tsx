
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App.tsx'
import registerZnaiCounterComponent from "./ZnaiCounterComponentRegistration";
registerZnaiCounterComponent();
ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)