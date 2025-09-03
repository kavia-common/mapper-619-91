import React from 'react';

interface TableProps {
  headers: React.ReactNode[];
  children: React.ReactNode;
  isLoading?: boolean;
}

// PUBLIC_INTERFACE
const Table: React.FC<TableProps> = ({ headers, children, isLoading }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="table-container">
            <table className="table-base">
              <thead className="table-header">
                <tr>
                  {headers.map((header, index) => (
                    <th key={index} scope="col" className="table-header-cell">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-body">
                {isLoading ? (
                  <tr>
                    <td colSpan={headers.length} className="text-center p-6">
                      Loading...
                    </td>
                  </tr>
                ) : (
                  children
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
