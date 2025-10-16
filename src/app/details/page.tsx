'use client';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import DetailsScreen from '../../components/DetailsScreen';
import { useAppContext } from '../../context/AppContext';

export default function Details() {
  const router = useRouter();
  const { selectedEmployee, setCapturedImage } = useAppContext();
  const videoRef = useRef<HTMLVideoElement>({} as HTMLVideoElement);
  const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        }
      } else {
        alert('Camera not supported on this device/browser.');
      }
    } catch (err) {
      console.error("Camera access error:", err);
      alert('Unable to access camera. Please ensure permissions are granted.');
    }
  };

  const capturePhoto = () => {
    if (canvasRef.current && videoRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
        const imageData = canvasRef.current.toDataURL('image/jpeg');
        setCapturedImage(imageData);

        const stream = videoRef.current.srcObject as MediaStream;
        stream?.getTracks().forEach(track => track.stop());

        router.push('/photo');
      }
    }
  };

  if (!selectedEmployee) {
    router.push('/list');
    return null;
  }

  return (
    <DetailsScreen
      employee={selectedEmployee}
      videoRef={videoRef}
      canvasRef={canvasRef}
      onCapture={capturePhoto}
      onBack={() => router.push('/list')}
      startCamera={startCamera}
    />
  );
}
