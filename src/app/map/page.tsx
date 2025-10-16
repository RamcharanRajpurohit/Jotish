'use client';
import { useRouter } from 'next/navigation';
import MapScreen from '../../components/MapScreen';
import { useAppContext } from '../../context/AppContext';
import AuthCheck from '../../components/AuthCheck';

export default function Map() {
  const router = useRouter();
  const { employees } = useAppContext();

  if (!employees.length) {
    router.push('/list');
    return null;
  }

  return (
    <AuthCheck>
      <MapScreen
        employees={employees}
        onBack={() => router.push('/list')}
      />
    </AuthCheck>
  );
}
