import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import Dashboard from '../components/pages/Dashboard';
import Tasks from '../components/pages/Tasks';
import Employees from '../components/pages/Employees';
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