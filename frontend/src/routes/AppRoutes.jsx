import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Tasks = lazy(() => import('../pages/Tasks'));
const Employees = lazy(() => import('../pages/Employees'));

function AppRoutes() {
    return (
      <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
         <Route index element={<Dashboard />}></Route>
         <Route path='/tasks' element={<Tasks/>}></Route>
         <Route path='/employees' element={<Employees/>}></Route>
        </Route>
      </Routes>
      </Suspense>
    );
}

export default AppRoutes;