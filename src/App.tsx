import React from 'react';


import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/LoginForm';
import JoinForm from './pages/JoinForm';
import HomeForm from './pages/HomeForm'
import ExportForm from './pages/ExportForm'
import SettingForm from './pages/SettingForm';
import './lib/styles/index.scss'

const App = () => {
  return (


    <Routes>
      <Route path='/' element={<LoginForm />} />
      <Route path='/join' element={<JoinForm />} />
      <Route path='/home' element={<HomeForm />} />
      <Route path='/export' element={<ExportForm />} />
      <Route path='/settings' element={<SettingForm />} />
      <Route path='/view' element={<SettingForm />} />
    </Routes>

  );
};

export default App;