"use client";
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Employee } from '../types/employee';

interface ChartScreenProps {
  employees: Employee[];
  onBack: () => void;
}

const ChartScreen: React.FC<ChartScreenProps> = ({ employees, onBack }) => {
  const chartData = employees.slice(0, 10).map(emp => ({
    name: emp.name.split(' ')[0],
    salary: parseInt(emp.salary.replace(/[$,]/g, '')),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-stone-100 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition">← Back</button>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Top 10 Employees - Salary Analysis</h1>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="salary" fill="#4b5563" name="Annual Salary" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ChartScreen;
