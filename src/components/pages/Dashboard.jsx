import React, { Component } from 'react';
import PageContainer from '../layout/PageContainer';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import EmployeeTable from '../ui/EmployeeTable';
import AddTask from '../forms/AddTask';
import AddEmployee from '../forms/AddEmployee';
import EditEmployee from '../forms/EditEmployee';
import EditTask from '../forms/EditTask';


function Dashboard() {
    return ( <>
    <PageContainer> <h1>Dashboard</h1>
    <EditTask/>
    </PageContainer>
   {/* <Card title="Total Tasks" count='12'/>
   <Badge stat='high'/>
  <EmployeeTable/> */}
    </> );
}

export default Dashboard;