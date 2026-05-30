import React from 'react'

import { useClickOutside } from '../../CustomHooks/useClickOutside'

function FilterMenuTask({setOpenFilter,setFilters
}) {
    const domref = useClickOutside(() => {
        setOpenFilter(false)
    })
    const applyFilter = (
        type,
        value
    ) => {
        if (type === 'status') {
            setFilters({
                priority: '',
                status: value,
                search: ''
            })

        }
        if (type === 'priority') {
            setFilters({
                priority: value,
                status: '',
                search: ''
            })
        }
        setOpenFilter(false)
    }
    return (
        <>
            <div
                ref={domref}
                className='absolute max-md:right-4 mt-12 w-48 bg-white text-[#434652] shadow-lg rounded-md border border-gray-200 z-10'

            >
                <div className="flex flex-col overflow-y-auto max-h-64 pb-2">
                    <button
                        onClick={() => {
                            setFilters({
                                priority: '',
                                status: '',
                                search: ''
                            })
                            setOpenFilter(false)
                        }}
                        className="text-left px-4 py-2 hover:bg-gray-100 font-semibold"
                    >
                        All Tasks
                    </button>
                    <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase mt-2 border-t">
                        By Status
                    </div>
                    <button
                        onClick={() =>
                            applyFilter(
                                'status',
                                'pending'
                            )
                        }
                        className="text-left px-4 py-2 hover:bg-gray-100"
                    >
                        Pending
                    </button>
                    <button
                        onClick={() =>
                            applyFilter(
                                'status',
                                'in progress'
                            )
                        }
                        className="text-left px-4 py-2 hover:bg-gray-100"
                    >
                        In Progress
                    </button>
                    <button

                        onClick={() =>

                            applyFilter(

                                'status',

                                'completed'

                            )

                        }

                        className="text-left px-4 py-2 hover:bg-gray-100"

                    >

                        Completed

                    </button>




                    <div className="px-4 py-1 text-xs font-bold text-gray-400 uppercase mt-2 border-t">

                        By Priority

                    </div>
                    <button

                        onClick={() =>

                            applyFilter(

                                'priority',

                                'high'

                            )

                        }

                        className="text-left px-4 py-2 hover:bg-gray-100"

                    >

                        High

                    </button>
                    <button

                        onClick={() =>

                            applyFilter(

                                'priority',

                                'medium'

                            )

                        }

                        className="text-left px-4 py-2 hover:bg-gray-100"

                    >

                        Medium

                    </button>
                    <button

                        onClick={() =>

                            applyFilter(

                                'priority',

                                'low'

                            )

                        }

                        className="text-left px-4 py-2 hover:bg-gray-100"

                    >

                        Low

                    </button>

                </div>

            </div>

        </>

    )

}




export default FilterMenuTask