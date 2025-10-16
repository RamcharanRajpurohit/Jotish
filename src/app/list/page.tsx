'use client';
import AuthCheck from '../../components/AuthCheck';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import ListScreen from '../../components/ListScreen';
import { useAppContext } from '../../context/AppContext';
import type { Employee } from '../../types/employee';

const ITEMS_PER_PAGE = 9;

export default function List() {
  const router = useRouter();
  const { employees, setSelectedEmployee, handleLogout } = useAppContext();
  const [displayedEmployees, setDisplayedEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize with first batch of employees
    setDisplayedEmployees(employees.slice(0, ITEMS_PER_PAGE));
  }, [employees]);

  const handleShowMore = async () => {
    setLoading(true);
    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 500));
    setDisplayedEmployees(employees);
    setLoading(false);
  };

  const handleSelectEmployee = (emp: Employee) => {
    setSelectedEmployee(emp);
    router.push('/details');
  };

  return (
    <AuthCheck>
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <LoadingSpinner />
        </div>
      )}
      <div className="w-full max-w-screen-xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
        <ListScreen
          employees={displayedEmployees}
          onSelectEmployee={handleSelectEmployee}
          onLogout={() => {
            handleLogout();
            router.push('/');
          }}
          onShowChart={() => router.push('/chart')}
          onShowMap={() => router.push('/map')}
        />
        
        {displayedEmployees.length < employees.length && (
          <div className="flex justify-center p-2 sm:p-4 mb-8">
            <button
              onClick={handleShowMore}
              disabled={loading}
              className="w-full sm:w-auto bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded disabled:opacity-50 text-sm sm:text-base"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 sm:h-5 sm:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Loading...
                </span>
              ) : (
                'Show More'
              )}
            </button>
          </div>
        )}
      </div>
    </AuthCheck>
  );
}
