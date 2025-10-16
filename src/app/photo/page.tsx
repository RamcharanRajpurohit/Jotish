'use client';

import AuthCheck from '../../components/AuthCheck';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import PhotoResultScreen from '../../components/PhotoResultScreen';
import { useAppContext } from '../../context/AppContext';

export default function Photo() {
  const router = useRouter();
  const { capturedImage, setCapturedImage } = useAppContext();

  useEffect(() => {
    if (!capturedImage) {
      router.push('/list');
    }
  }, [capturedImage, router]);

  if (!capturedImage) {
    return null;
  }

  return (
    <AuthCheck>
      <PhotoResultScreen
        image={capturedImage}
        onBack={() => {
          setCapturedImage(null);
          router.push('/list');
        }}
      />
    </AuthCheck>
  );
}
