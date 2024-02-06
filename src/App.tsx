import React from 'react';
import { Provider } from 'react-redux';
import store from './store'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/LoginForm';
import JoinForm from './pages/JoinForm';
import HomeForm from './pages/HomeForm'
import './lib/styles/index.scss'

const App = () => {
  return (


    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/join' element={<JoinForm />} />
      <Route path='/home' element={<HomeForm />} />
      <Route path='/settings' element={<HomeForm />} />
      <Route path='/view' element={<HomeForm />} />
    </Routes>

  );
};

export default App;