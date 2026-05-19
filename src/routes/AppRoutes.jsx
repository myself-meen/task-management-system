import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../pages/Dashboard';
import Tasks from '../pages/Tasks';
import Employees from '../pages/Employees';
function AppRoutes() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
         <Route index element={<Dashboard />}></Route>
         <Route path='/tasks' element={<Tasks/>}></Route>
         <Route path='/employees' element={<Employees/>}></Route>
        </Route>
      </Routes>
    );
}

export default AppRoutes;