"use client";
import React, { useState } from 'react';
import { LogOut, Briefcase, MapPin } from 'lucide-react';
import { Employee } from '../types/employee';
import MobileSidebar from './MobileSidebar';

interface ListScreenProps {
  employees: Employee[];
  onSelectEmployee: (employee: Employee) => void;
  onLogout: () => void;
  onShowChart: () => void;
  onShowMap: () => void;
}

const ListScreen: React.FC<ListScreenProps> = ({ employees, onSelectEmployee, onLogout, onShowChart, onShowMap }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredEmployees = employees.filter((emp) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-stone-100">
   
      <MobileSidebar
        onLogout={onLogout}
        onShowChart={onShowChart}
        onShowMap={onShowMap}
      />

    
      <div className="hidden lg:flex justify-end space-x-4 p-4">
        <button
          onClick={onShowChart}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
        >
          Show Chart
        </button>
        <button
          onClick={onShowMap}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded"
        >
          Show Map
        </button>
        <button
          onClick={onLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
       
        <div className="pt-16 lg:pt-0 mb-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 sm:py-3 text-sm sm:text-base border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredEmployees.map((employee, index) => (
            <div
              key={index}
              onClick={() => onSelectEmployee(employee)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transition transform hover:scale-105 p-6 border-l-4 border-gray-500"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{employee.name}</h3>
              <p className="text-blue-600 font-semibold mb-3 flex items-center gap-2"><Briefcase size={16} /> {employee.position}</p>
              <p className="text-gray-600 flex items-center gap-2 mb-2"><MapPin size={16} /> {employee.office}</p>
              <p className="text-gray-600 text-sm mb-2">Ext: {employee.extnumber}</p>
              <p className="text-green-600 font-bold text-lg">{employee.salary}</p>
              <p className="text-gray-500 text-xs mt-2">Started: {employee.startdate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ListScreen;
