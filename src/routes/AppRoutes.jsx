import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';

function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
         <Route index element={<Home />}></Route>
         <Route path='tasks' element={<Tasks/>}></Route>
         <Route path='employees' element={<Employees/>}></Route>
        </Route>
      </Routes>
    );
}

export default AppRoutes;