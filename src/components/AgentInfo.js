import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
export default function AgentInfoPanel({ agent,setShowInfo }) {
  if (!agent || !agent.data || typeof agent.data !== 'object') return null;

  return (
    <div className="pb-10 px-2 bg-gradient-to-br from-gray-900 via-indigo-900 to-black min-h-screen z-50  text-white rounded-xl shadow-xl w-full md:w-3/4 md:p-6 mx-auto overflow-y-auto absolute ">
 
     <button
  className="close-button absolute top-1 end-5 text-red-500 hover:text-red-400 transition-colors duration-200"
  onClick={() => setShowInfo(false)}
  aria-label="Close"
>
  <AiOutlineClose size={24} />
</button>
  <h2 className="text-2xl font-bold border-b border-blue-400 pb-2 mb-4">Demo Information</h2>

  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">


    {Object.entries(agent.data).map(([key, value], index) => (


      <div key={index} className="bg-opacity-50 p-4 rounded-lg shadow-md  overflow-y-auto bg-indigo-900">
        <h3 className="text-lg font-semibold text-blue-200 capitalize mb-2">
          {key.replace(/_/g, ' ')}
        </h3>

        {Array.isArray(value) ? (
          <ul className="list-disc list-inside text-sm text-blue-100 space-y-1">
            {value.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-blue-100">{value}</p>
        )}
      </div>
    ))}

    {agent.tables && Object.entries(agent.tables).map(([key, value], index) => (
  <div
    key={index}
    className='col-span-2 bg-opacity-50 p-4 rounded-lg shadow-md overflow-x-auto bg-indigo-900 text-white mb-6'
  >
    <h2 className="text-xl font-semibold mb-4 capitalize">{key.replace(/_/g, ' ')}</h2>

    {Array.isArray(value) && value.length > 0 && typeof value[0] === 'object' ? (
      <div className="min-w-max">
        <table className="table-auto border border-indigo-700 text-sm whitespace-nowrap">
          <thead className="bg-indigo-800 text-white">
            <tr>
              {Object.keys(value[0]).map((col, i) => (
                <th
                  key={i}
                  className="border border-indigo-700 px-4 py-2 text-left capitalize"
                >
                  {col.replace(/_/g, ' ')}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {value.map((row, ri) => (
              <tr key={ri} className="hover:bg-indigo-700">
                {Object.values(row).map((cell, ci) => (
                  <td
                    key={ci}
                    className="border border-indigo-700 px-4 py-2 text-ellipsis overflow-hidden max-w-xs"
                  >
                    {cell !== null ? cell.toString() : '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <ul className="list-disc list-inside">
        {value.map((item, i) => (
          <li key={i}>
            {typeof item === 'string' ? item : JSON.stringify(item)}
          </li>
        ))}
      </ul>
    )}
  </div>
))}


  </div>
</div>

  );
}
