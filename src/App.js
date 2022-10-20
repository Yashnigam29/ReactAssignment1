import React from 'react';
import './App.css';
import Form from './Component/Form/form';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Component/Login/login';
import history from './history';
import Dashboard from './Component/Dashboard/dashboard';


function App() {
  return (
    <Router history={history}>
        <div>
          <Routes>
              <Route exact path='/' element={<Form />} />
              <Route path='/login' element={<Login />} />
              <Route path='/dashboard' element={<Dashboard />} />
         </Routes>
  
        </div>
      </Router>
  );
}

export default App;
