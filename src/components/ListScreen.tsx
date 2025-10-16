"use client";
import React, { useState } from 'react';
import { LogOut, Briefcase, MapPin } from 'lucide-react';
import { Employee } from '../types/employee';

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
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">Employee Dashboard</h1>
          <div className="flex gap-3">
            <button onClick={onShowChart} className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition">📊 Salary Chart</button>
            <button onClick={onShowMap} className="px-4 py-2 bg-stone-600 text-white rounded-lg hover:bg-stone-700 transition">🗺️ City Map</button>
            <button onClick={onLogout} className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition flex items-center gap-2"><LogOut size={18} /> Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search employees by name or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-gray-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
