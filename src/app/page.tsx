"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchEmployees } from '../services/api';
import LoginScreen from '../components/LoginScreen';
import { useAppContext } from '../context/AppContext';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setEmployees } = useAppContext();

  const handleLogin = async () => {
    if (username === 'testuser' && password === 'Test123') {
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
      alert('Invalid credentials. Use testuser / Test123');
    }
  };

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
