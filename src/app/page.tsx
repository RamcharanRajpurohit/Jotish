"use client";
import React, { useState, useRef, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Camera, LogOut, MapPin, User, Briefcase } from 'lucide-react';

interface Employee {
  name: string;
  position: string;
  office: string;
  extnumber: string;
  startdate: string;
  salary: string;
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (username === 'testuser' && password === 'Test123') {
      setLoading(true);
      try {
        // Example in your List Page
        const response = await fetch("/api/proxy", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "test",
            password: "123456",
          }),
        });

        if (!response.ok) {
          throw new Error('API request failed');
        }

        const data = await response.json();

        if (data.TABLE_DATA && data.TABLE_DATA.data) {
          const parsedEmployees = data.TABLE_DATA.data.map((row: string[]) => ({
            name: row[0],
            position: row[1],
            office: row[2],
            extnumber: row[3],
            startdate: row[4],
            salary: row[5],
          }));

          setEmployees(parsedEmployees);
          setCurrentScreen('list');
          setUsername('');
          setPassword('');
        } else {
          throw new Error('Invalid response format');
        }
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
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      alert('Unable to access camera');
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
    return <ListScreen employees={employees} onSelectEmployee={(emp: Employee) => { setSelectedEmployee(emp); setCurrentScreen('details'); }} onLogout={handleLogout} onShowChart={() => setCurrentScreen('chart')} onShowMap={() => setCurrentScreen('map')} />;
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

function LoginScreen({ onLogin, username, setUsername, password, setPassword, loading }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2 text-gray-800">Welcome</h1>
        <p className="text-center text-gray-600 mb-8">Employee Management System</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="testuser"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Test123"
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          <button
            onClick={onLogin}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-gray-700"><strong>Demo Credentials:</strong></p>
          <p className="text-sm text-gray-600">Username: testuser</p>
          <p className="text-sm text-gray-600">Password: Test123</p>
        </div>
      </div>
    </div>
  );
}

function ListScreen({ employees, onSelectEmployee, onLogout, onShowChart, onShowMap }: any) {
  const [searchTerm, setSearchTerm] = useState('');
  const filteredEmployees = employees.filter((emp: Employee) =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <nav className="bg-white shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Employee Dashboard</h1>
          <div className="flex gap-3">
            <button onClick={onShowChart} className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">📊 Salary Chart</button>
            <button onClick={onShowMap} className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition">🗺️ City Map</button>
            <button onClick={onLogout} className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center gap-2"><LogOut size={18} /> Logout</button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search employees by name or position..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee: Employee, index: number) => (
            <div
              key={index}
              onClick={() => onSelectEmployee(employee)}
              className="bg-white rounded-xl shadow-md hover:shadow-xl cursor-pointer transition transform hover:scale-105 p-6 border-l-4 border-blue-500"
            >
              <h3 className="text-xl font-bold text-gray-800 mb-2">{employee.name}</h3>
              <p className="text-blue-600 font-semibold mb-3 flex items-center gap-2"><Briefcase size={16} /> {employee.position}</p>
              <p className="text-gray-600 flex items-center gap-2 mb-2"><MapPin size={16} /> {employee.office}</p>
              <p className="text-gray-600 text-sm mb-2">Ext: {employee.extnumber}</p>
              <p className="text-green-600 font-bold text-lg">{employee.salary}</p>
              <p className="text-gray-500 text-xs mt-2">Started: {employee.startdate}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DetailsScreen({ employee, videoRef, canvasRef, onCapture, onBack }: any) {
  const [showCamera, setShowCamera] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">← Back</button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center gap-4 mb-6 pb-6 border-b-2">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{employee.name}</h1>
              <p className="text-blue-600 font-semibold">{employee.position}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-gray-600 text-sm">Office Location</p>
              <p className="text-xl font-bold text-gray-800 flex items-center gap-2"><MapPin size={20} className="text-blue-600" /> {employee.office}</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-gray-600 text-sm">Extension</p>
              <p className="text-xl font-bold text-gray-800">{employee.extnumber}</p>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <p className="text-gray-600 text-sm">Annual Salary</p>
              <p className="text-xl font-bold text-gray-800">{employee.salary}</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <p className="text-gray-600 text-sm">Start Date</p>
              <p className="text-xl font-bold text-gray-800">{employee.startdate}</p>
            </div>
          </div>

          {!showCamera ? (
            <button
              onClick={() => setShowCamera(true)}
              className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
            >
              <Camera size={24} /> Capture Photo
            </button>
          ) : (
            <div className="space-y-4">
              <video ref={videoRef} autoPlay className="w-full rounded-lg border-4 border-blue-500" style={{ maxHeight: '400px' }} />
              <canvas ref={canvasRef} width={640} height={480} className="hidden" />
              <div className="flex gap-3">
                <button
                  onClick={onCapture}
                  className="flex-1 px-6 py-3 bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition"
                >
                  📸 Take Photo
                </button>
                <button
                  onClick={() => setShowCamera(false)}
                  className="flex-1 px-6 py-3 bg-gray-400 text-white font-bold rounded-lg hover:bg-gray-500 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PhotoResultScreen({ image, onBack }: any) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">← Back to List</button>

      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
            <h1 className="text-3xl font-bold text-white">📸 Captured Photo</h1>
          </div>
          <div className="p-8">
            <img src={image} alt="Captured" className="w-full rounded-lg shadow-lg mb-6" />
            <button
              onClick={onBack}
              className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ChartScreen({ employees, onBack }: any) {
  const chartData = employees.slice(0, 10).map((emp: Employee) => ({
    name: emp.name.split(' ')[0],
    salary: parseInt(emp.salary.replace(/[$,]/g, '')),
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">← Back</button>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">📊 Top 10 Employees - Salary Analysis</h1>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
            <YAxis />
            <Tooltip formatter={(value: number) => `$${value.toLocaleString()}`} />
            <Legend />
            <Bar dataKey="salary" fill="#3b82f6" name="Annual Salary" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function MapScreen({ employees, onBack }: any) {
  const cities = [...new Set(employees.map((emp: Employee) => emp.office))] as string[];
  interface CityCount {
    city: string;
    count: number;
  }
  const cityCounts: CityCount[] = cities.map(city => ({
    city,
    count: employees.filter((emp: Employee) => emp.office === city).length,
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <button onClick={onBack} className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">← Back</button>

      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">🗺️ Employees by City</h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cityCounts.map((item, index) => (
              <div key={index} className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-6 text-white shadow-lg">
                <p className="text-4xl font-bold">{item.count}</p>
                <p className="text-lg font-semibold">{item.city}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Employee Details by City</h2>
          <div className="space-y-4">
            {cityCounts.map((item, index) => (
              <div key={index} className="border-l-4 border-blue-500 pl-4 py-2">
                <p className="font-bold text-lg text-gray-800">{item.city}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  {employees.filter((emp: Employee) => emp.office === item.city).map((emp: Employee, i: number) => (
                    <p key={i} className="text-sm text-gray-600">• {emp.name}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}