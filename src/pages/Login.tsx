import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, Phone, Lock, Search, UserCheck } from 'lucide-react';

const Login: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'select' | 'phone' | 'otp'>('select');
  const [userType, setUserType] = useState<'investigator' | 'public'>('investigator');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { user, login } = useAuth();

  if (user) {
    return <Navigate to={user.role === 'public' ? '/public-search' : '/dashboard'} />;
  }

  const handleUserTypeSelect = (type: 'investigator' | 'public') => {
    setUserType(type);
    setStep('phone');
    setError('');
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length === 10) {
      setStep('otp');
      setError('');
    } else {
      setError('Please enter a valid 10-digit phone number');
    }
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const success = await login(phone, otp, userType);
      if (!success) {
        setError('Invalid OTP. Please try again.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-blue-500" />
          <h2 className="mt-6 text-3xl font-extrabold text-white">
            AI UPI Trust Portal
          </h2>
          {step === 'select' ? (
            <p className="mt-2 text-sm text-gray-400">
              Choose your access type
            </p>
          ) : (
            <p className="mt-2 text-sm text-gray-400">
              {userType === 'investigator' ? 'Secure access for fraud investigators' : 'Public trust score lookup'}
            </p>
          )}
        </div>

        {step === 'select' ? (
          <div className="mt-8 space-y-4">
            <button
              onClick={() => handleUserTypeSelect('investigator')}
              className="w-full flex items-center justify-center px-6 py-4 border border-gray-600 rounded-lg text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <UserCheck className="w-6 h-6 mr-3 text-blue-400" />
              <div className="text-left">
                <div className="font-medium">Security Investigator</div>
                <div className="text-sm text-gray-400">Full access to fraud detection system</div>
              </div>
            </button>
            <button
              onClick={() => handleUserTypeSelect('public')}
              className="w-full flex items-center justify-center px-6 py-4 border border-gray-600 rounded-lg text-white bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              <Search className="w-6 h-6 mr-3 text-green-400" />
              <div className="text-left">
                <div className="font-medium">Public Lookup</div>
                <div className="text-sm text-gray-400">Check trust score for phone/UPI ID</div>
              </div>
            </button>
          </div>
        ) : step === 'phone' ? (
          <form className="mt-8 space-y-6" onSubmit={handlePhoneSubmit}>
            <div>
              <label htmlFor="phone" className="sr-only">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Send OTP
              </button>
            </div>
          </form>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleOtpSubmit}>
            <div>
              <p className="text-gray-400 text-sm text-center mb-4">
                OTP sent to +91 {phone}
              </p>
              <label htmlFor="otp" className="sr-only">
                OTP
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  required
                  className="appearance-none rounded-md relative block w-full pl-10 px-3 py-2 border border-gray-600 placeholder-gray-500 text-white bg-gray-800 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">{error}</div>
            )}

            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setStep('select')}
                className="flex-1 py-2 px-4 border border-gray-600 text-gray-300 text-sm font-medium rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Verifying...' : 'Verify OTP'}
              </button>
            </div>

            <div className="text-center">
              <p className="text-xs text-gray-500">
               Demo: Use OTP 123456 for investigators, 654321 for public access
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;