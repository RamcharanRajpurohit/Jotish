import React from 'react';

interface LoginScreenProps {
  onLogin: () => void;
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  loading: boolean;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, username, setUsername, password, setPassword, loading }) => {
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
};

export default LoginScreen;
