"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Employee } from '../types/employee';
import { fetchEmployees } from '../services/api';
import LoginScreen from '../components/LoginScreen';
import ListScreen from '../components/ListScreen';
import DetailsScreen from '../components/DetailsScreen';
import PhotoResultScreen from '../components/PhotoResultScreen';
import ChartScreen from '../components/ChartScreen';
import MapScreen from '../components/MapScreen';

type Screen = 'login' | 'list' | 'details' | 'photo' | 'chart' | 'map';

export default function Home() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    // Demo credentials check
    if (username === 'testuser' && password === 'Test123') {
      setLoading(true);
      try {
        const employeeData = await fetchEmployees();
        setEmployees(employeeData);
        setCurrentScreen('list');
        setUsername('');
        setPassword('');
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

  const handleLogout = () => {
    setCurrentScreen('login');
    setEmployees([]);
    setSelectedEmployee(null);
    setCapturedImage(null);
  };

  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
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

        setCurrentScreen('photo');
      }
    }
  };

  useEffect(() => {
    if (currentScreen === 'details') {
      startCamera();
    }
  }, [currentScreen]);

  if (currentScreen === 'login') {
    return <LoginScreen onLogin={handleLogin} username={username} setUsername={setUsername} password={password} setPassword={setPassword} loading={loading} />;
  }

  if (currentScreen === 'list') {
    return <ListScreen employees={employees} onSelectEmployee={(emp) => { setSelectedEmployee(emp); setCurrentScreen('details'); }} onLogout={handleLogout} onShowChart={() => setCurrentScreen('chart')} onShowMap={() => setCurrentScreen('map')} />;
  }

  if (currentScreen === 'details' && selectedEmployee) {
    return <DetailsScreen employee={selectedEmployee} videoRef={videoRef} canvasRef={canvasRef} onCapture={capturePhoto} onBack={() => setCurrentScreen('list')} />;
  }

  if (currentScreen === 'photo' && capturedImage) {
    return <PhotoResultScreen image={capturedImage} onBack={() => { setCurrentScreen('list'); setCapturedImage(null); }} />;
  }

  if (currentScreen === 'chart') {
    return <ChartScreen employees={employees} onBack={() => setCurrentScreen('list')} />;
  }

  if (currentScreen === 'map') {
    return <MapScreen employees={employees} onBack={() => setCurrentScreen('list')} />;
  }

  return null;
}
