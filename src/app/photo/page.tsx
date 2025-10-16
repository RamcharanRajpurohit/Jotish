'use client';
import { useRouter } from 'next/navigation';
import PhotoResultScreen from '../../components/PhotoResultScreen';
import { useAppContext } from '../../context/AppContext';

export default function Photo() {
  const router = useRouter();
  const { capturedImage, setCapturedImage } = useAppContext();

  if (!capturedImage) {
    router.push('/list');
    return null;
  }

  return (
    <PhotoResultScreen
      image={capturedImage}
      onBack={() => {
        setCapturedImage(null);
        router.push('/list');
      }}
    />
  );
}
