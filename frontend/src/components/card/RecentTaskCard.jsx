import React from 'react'
import Badge from '../ui/Badge'

function RecentTaskCard({ task }) {

    return (

        <div className='p-4 flex flex-col gap-4 bg-white shadow-md rounded-xl border border-gray-100'>

            <div className='flex justify-between items-start gap-3'>

                <div className='min-w-0'>

                    <h1 className='text-lg font-semibold text-gray-800 wrap-break-words whitespace-normal'>
                        {task.name}
                    </h1>

                    <p className='text-sm text-gray-500 mt-1 wrap-break-words whitespace-normal'>
                        Assigned to: {task.assignee}
                    </p>

                </div>

                <Badge stat={task.priority} />

            </div>

            <div className='flex justify-between items-center gap-3'>

                <h2 className='text-sm font-medium text-gray-600'>
                    Due: {task.dueDate}
                </h2>

                <Badge stat={task.status} />

            </div>

        </div>

    )

}

export default RecentTaskCard