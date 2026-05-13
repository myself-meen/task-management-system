import React from 'react';

function Table() {
    return ( <>
    <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Task</th>
              <th className="py-2 px-4 border-b text-left">Status</th>
              <th className="py-2 px-4 border-b text-left">Priority</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">Design Homepage</td>
              <td className="py-2 px-4 border-b">
                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">In Progress</span>
              </td>
              <td className="py-2 px-4 border-b">
                <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Medium</span>
              </td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
</> );
}

export
 default Table;