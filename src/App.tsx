import React from 'react';
import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './pages/LoginForm';
import JoinForm from './pages/JoinForm';
import HomeForm from './pages/HomeForm'
import ExportForm from './pages/ExportForm'
import SettingForm from './pages/SettingForm';
import SearchForm from './pages/SearchForm';
import RViewForm from './pages/R_viewForm';
import { response } from './store/slices/authSlice';
import HeaderContainer from './containers/common/header/HeaderContainer'
import NavSearchContainer from './containers/nav_search/NavSearchContainer';
import './lib/styles/index.scss'
const App = () => {
  const { auth } = useSelector(response)
  return (
    <>
      {<HeaderContainer />}
      {<NavSearchContainer />}
      <Routes>
        <Route path='/' element={<LoginForm />} />
        <Route path='/join' element={<JoinForm />} />
        <Route path='/home' element={<HomeForm />} />
        <Route path='/Export' element={<ExportForm />} />
        <Route path='/settings' element={<SettingForm />} />
        <Route path='/view' element={<RViewForm />} />
        <Route path='/search' element={<SearchForm />} />
      </Routes>
    </>

  );
};

export default App;