import PageContainer from '../components/layout/PageContainer';

import Card from '../components/ui/Card';
import PageHeader from '../components/ui/PageHeader';
import TaskCard from '../components/ui/TaskCard';
import TaskTable from '../components/ui/Table/TaskTable';
import { useIsMobile } from '../CustomHooks/useIsMobile';
import { usePagination } from '../CustomHooks/usePagination';
import Pagination from '../components/ui/Pagination';

function Dashboard() {
    const dummyTasks = [
        {
            id: 1,
            name: "Design Homepage UI",
            priority: "high",
            status: "in progress",
            dueDate: "2023-10-31",
            assignee: "John Doe"
        },
        {
            id: 2,
            name: "Setup Backend Database",
            priority: "high",
            status: "pending",
            dueDate: "2023-11-05",
            assignee: "Jane Smith"
        },
        {
            id: 3,
            name: "Update Documentation",
            priority: "low",
            status: "completed",
            dueDate: "2023-10-20",
            assignee: "John Doe"
        }
    ];
const isMobile = useIsMobile();
const { currentPage, totalPages, currentData, handlePrev, handleNext } = usePagination(dummyTasks);

    return ( <>
    
    <PageContainer>
<div className='flex flex-col gap-y-8'>
    <PageHeader head='Dashboard' subhead='Oversee statistics and most recent activity'/>
        <section className='stats flex flex-wrap md:justify-between gap-4'>
            <Card   title='Total' count={dummyTasks.length}/>
            <Card  title='Completed' count='0'/>
            <Card  title='Pending' count='0'/>
            <Card  title='Teams' count='0'/>
        </section>
        <h1 className='text-2xl font-bold text-[#434652]'>Recent Tasks</h1>
     <section className='tasks'>
        {isMobile ? (
            <div className="flex flex-col gap-4">
                {currentData.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
                <Pagination currentPage={currentPage} totalPages={totalPages} handlePrev={handlePrev} handleNext={handleNext} />
            </div>
        ) : (
            <TaskTable tasks={dummyTasks}/>
        )}
    </section>
    </div>
</PageContainer>
    
    
   
  
    </> );
}

export default Dashboard;