'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Employee } from '../types/employee';

type AppContextType = {
  employees: Employee[];
  selectedEmployee: Employee | null;
  capturedImage: string | null;
  setEmployees: (employees: Employee[]) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
  setCapturedImage: (image: string | null) => void;
  handleLogout: () => void;
};

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedState = localStorage.getItem('appState');
      if (savedState) {
        const { employees, selectedEmployee, capturedImage } = JSON.parse(savedState);
        setEmployees(employees || []);
        setSelectedEmployee(selectedEmployee || null);
        setCapturedImage(capturedImage || null);
      }
    } catch (error) {
      console.error("Failed to parse state from localStorage", error);
      localStorage.removeItem('appState');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!loading) {
      const appState = { employees, selectedEmployee, capturedImage };
      localStorage.setItem('appState', JSON.stringify(appState));
    }
  }, [employees, selectedEmployee, capturedImage, loading]);

  const handleLogout = () => {
    setEmployees([]);
    setSelectedEmployee(null);
    setCapturedImage(null);
    localStorage.removeItem('appState');
  };

  if (loading) return <div>Loading session...</div>;

  return (
    <AppContext.Provider value={{
      employees,
      selectedEmployee,
      capturedImage,
      setEmployees,
      setSelectedEmployee,
      setCapturedImage,
      handleLogout
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within AppProvider');
  return context;
};
