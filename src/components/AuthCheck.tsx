'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '../context/AppContext';

export default function AuthCheck({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { employees } = useAppContext();

  useEffect(() => {
    if (!employees || employees.length === 0) {
      router.push('/');
    }
  }, [employees, router]);

  if (!employees || employees.length === 0) {
    return null;
  }

  return <>{children}</>;
}
