'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchEmployees } from '../services/api';
import LoginScreen from '../components/LoginScreen';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setEmployees, employees } = useAppContext();

  const handleLogin = async () => {
    if (
      username === process.env.NEXT_PUBLIC_USERNAME &&
      password === process.env.NEXT_PUBLIC_PASSWORD
    ) {
      setLoading(true);
      try {
        const employeeData = await fetchEmployees();
        setEmployees(employeeData);
        router.push('/list');
      } catch (error) {
        console.error('Login error:', error);
        alert('Failed to fetch employee data. Please try again.');
      } finally {
        setLoading(false);
      }
    } else {
      alert(`Invalid credentials. Use ${process.env.NEXT_PUBLIC_USERNAME} / ${process.env.NEXT_PUBLIC_PASSWORD}`);
    }
  };

  useEffect(() => {
    if (employees && employees.length > 0) {
      router.push('/list');
    }
  }, [employees]);

  return (
    <LoginScreen
      onLogin={handleLogin}
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      loading={loading}
    />
  );
}
