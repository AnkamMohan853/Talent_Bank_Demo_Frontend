import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Smartphone, Shield, CheckCircle, ArrowLeft } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

const Login: React.FC = () => {
  const [step, setStep] = useState<'mobile' | 'otp' | 'verifying' | 'success'>('mobile');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleMobileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mobileNumber.length === 10) {
      setIsLoading(true);
      // Simulate API call delay
      setTimeout(() => {
        setIsLoading(false);
        setStep('otp');
      }, 1000);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpVerify = () => {
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      setStep('verifying');
      
      // Mock OTP verification (accept any 6 digits)
      setTimeout(() => {
        setStep('success');
        setTimeout(() => {
          login(mobileNumber);
          navigate('/Vendor');
        }, 1500);
      }, 2000);
    }
  };

  const handleBack = () => {
    setStep('mobile');
    setOtp(['', '', '', '', '', '']);
  };

  const isOtpComplete = otp.every(digit => digit !== '');

  useEffect(() => {
    if (step === 'otp') {
      otpRefs.current[0]?.focus();
    }
  }, [step]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
              {step === 'mobile' && <Smartphone className="w-8 h-8 text-blue-600" />}
              {(step === 'otp' || step === 'verifying') && <Shield className="w-8 h-8 text-blue-600" />}
              {step === 'success' && <CheckCircle className="w-8 h-8 text-green-600" />}
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {step === 'mobile' && 'Welcome Back'}
              {step === 'otp' && 'Verify Your Number'}
              {step === 'verifying' && 'Verifying...'}
              {step === 'success' && 'Success!'}
            </h1>
            <p className="text-gray-600">
              {step === 'mobile' && 'Enter your mobile number to get started'}
              {step === 'otp' && `We sent a code to +91 ${mobileNumber}`}
              {step === 'verifying' && 'Please wait while we verify your code'}
              {step === 'success' && 'You have been successfully verified'}
            </p>
          </div>

          {/* Mobile Number Input */}
          {step === 'mobile' && (
            <form onSubmit={handleMobileSubmit} className="space-y-6">
              <div>
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 text-sm">+91</span>
                  </div>
                  <input
                    type="tel"
                    id="mobile"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 10))}
                    className="block w-full pl-12 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                    placeholder="Enter 10-digit number"
                    required
                  />
                </div>
                {mobileNumber.length > 0 && mobileNumber.length < 10 && (
                  <p className="mt-2 text-sm text-red-600">Please enter a valid 10-digit mobile number</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={mobileNumber.length !== 10 || isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending OTP...
                  </div>
                ) : (
                  'Send OTP'
                )}
              </button>
            </form>
          )}

          {/* OTP Input */}
          {(step === 'otp' || step === 'verifying') && (
            <div className="space-y-6">
              <button
                onClick={handleBack}
                className="flex items-center text-blue-600 hover:text-blue-700 transition-colors duration-200"
                disabled={step === 'verifying'}
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back
              </button>

              <div className="flex justify-center space-x-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (otpRefs.current[index] = el)}
                    type="text"
                    inputMode="numeric"
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl font-semibold border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors duration-200"
                    disabled={step === 'verifying'}
                    maxLength={1}
                  />
                ))}
              </div>

              <button
                onClick={handleOtpVerify}
                disabled={!isOtpComplete || step === 'verifying'}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {step === 'verifying' ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Verifying...
                  </div>
                ) : (
                  'Verify OTP'
                )}
              </button>

              <p className="text-center text-sm text-gray-600">
                Didn't receive the code?{' '}
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Resend OTP
                </button>
              </p>
            </div>
          )}

          {/* Success State */}
          {step === 'success' && (
            <div className="text-center space-y-4">
              <div className="animate-bounce">
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
              </div>
              <p className="text-lg font-medium text-gray-900">Verification Successful!</p>
              <p className="text-gray-600">Redirecting to home page...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full animate-pulse" style={{ width: '100%' }}></div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;