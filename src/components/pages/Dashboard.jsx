import React, { Component } from 'react';
import PageContainer from '../layout/PageContainer';
import Badge from '../ui/Badge';
import Card from '../ui/Card';
import Table from '../ui/Table';

function Dashboard() {
    return ( <>
    <PageContainer> <h1>Dashboard</h1></PageContainer>
   <Card title="Total Tasks" count='12'/>
   <Badge stat='high'/>
   <Table/>
    </> );
}

export default Dashboard;