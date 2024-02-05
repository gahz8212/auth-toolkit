import React from 'react';
import { Provider } from 'react-redux';
import store from './store'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/LoginForm';
import JoinForm from './pages/JoinForm';
import HomeForm from './pages/HomeForm'
import './lib/styles/index.scss'
import { Reset } from 'styled-reset';
const App = () => {
  return (
    <Provider store={store}>
      <Reset />
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/join' element={<JoinForm />} />
        <Route path='/home' element={<HomeForm />} />
      </Routes>
    </Provider>
  );
};

export default App;