'use client';
import { useRouter } from 'next/navigation';
import AuthCheck from '../../components/AuthCheck';
import ChartScreen from '../../components/ChartScreen';
import { useAppContext } from '../../context/AppContext';

export default function Chart() {
  const router = useRouter();
  const { employees } = useAppContext();

  if (!employees.length) {
    router.push('/list');
    return null;
  }

  return (
    <AuthCheck>
      <ChartScreen
        employees={employees}
        onBack={() => router.push('/list')}
      />
    </AuthCheck>
  );
}
