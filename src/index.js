import './index.css';
import reportWebVitals from './reportWebVitals';
import store from "./redux/redux-store";
import React from 'react';
import ReactDOM from 'react-dom/client';
import MainApp from './App';

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <MainApp store={store}/>
)
reportWebVitals()
