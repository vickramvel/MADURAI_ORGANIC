
import React, { useState, useEffect, useRef } from 'react';
import { AppView } from '../types';

interface LoginPageProps {
  setView: (view: AppView) => void;
  setUserName: (name: string, phone: string) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ setView, setUserName }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isOtpStage, setIsOtpStage] = useState(false);
  const [pin, setPin] = useState('');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);
  const [showMockSms, setShowMockSms] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const LOGO_URL = "https://img.icons8.com/color/96/leaf.png";
  const BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?q=80&w=2000&auto=format&fit=crop";

  useEffect(() => {
    let interval: any;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleAdminLogin = () => {
    if (pin === '753159') {
      setView(AppView.ADMIN_DASHBOARD);
    } else {
      setError('Invalid Admin PIN');
    }
  };

  const generateAndSendOtp = () => {
    if (name.trim().length < 2) {
      setError('Please enter your full name');
      return;
    }
    if (phone.length < 10) {
      setError('Enter a valid mobile number');
      return;
    }

    setIsSending(true);
    setError('');

    // Simulate network delay for sending OTP
    setTimeout(() => {
      const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(newOtp);
      setIsOtpStage(true);
      setIsSending(false);
      setResendTimer(30);
      setShowMockSms(true);
      
      // Auto-hide mock SMS after 15 seconds
      setTimeout(() => setShowMockSms(false), 15000);
    }, 1200);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const verifyOtp = () => {
    const enteredCode = otp.join('');
    if (enteredCode.length < 6) {
      setError('Please enter the full 6-digit code');
      return;
    }

    if (enteredCode === generatedOtp) {
      setUserName(name.trim(), phone);
      setView(AppView.SHOP);
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans p-4 bg-slate-100">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img 
          src={BACKGROUND_IMAGE} 
          alt="Natural Organic Texture" 
          className="w-full h-full object-cover brightness-[0.5] saturate-[0.8] scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-green-950/70"></div>
        <div className="absolute inset-0 bg-green-900/10 backdrop-blur-[2px]"></div>
      </div>

      {/* Mock SMS Notification - Enhanced Visibility */}
      {showMockSms && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-md animate-in slide-in-from-top-full duration-500">
          <div className="bg-white/95 backdrop-blur-2xl border-2 border-green-500/30 rounded-[32px] p-5 shadow-2xl flex items-start gap-4 ring-4 ring-green-500/10">
            <div className="w-12 h-12 bg-green-600 rounded-2xl flex items-center justify-center text-white text-2xl shrink-0 shadow-lg animate-pulse">
              💬
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-2">
                   <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
                   Simulated SMS • Now
                </span>
                <button onClick={() => setShowMockSms(false)} className="text-slate-300 hover:text-slate-500 p-1">✕</button>
              </div>
              <p className="text-sm font-bold text-slate-900 leading-tight">
                MaduraiOrganic: Your security code is <span className="text-green-600 font-black tracking-[0.2em] text-lg bg-green-50 px-2 py-0.5 rounded-lg border border-green-100">{generatedOtp}</span>. Enter this on the screen to log in.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-[40px] md:rounded-[56px] p-8 md:p-14 shadow-2xl border border-white/40">
        <div className="flex flex-col items-center mb-8 md:mb-10 text-center">
          <div className="relative mb-4 md:mb-6">
             <div className="absolute inset-0 bg-green-500/20 blur-2xl rounded-full scale-150"></div>
             <img src={LOGO_URL} alt="Logo" className="w-16 h-16 md:w-20 md:h-20 relative z-10 drop-shadow-xl" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-2 uppercase tracking-tighter leading-none">
            Madurai <br className="sm:hidden" /> <span className="text-green-600">Organic</span>
          </h1>
          <div className="inline-flex items-center gap-2 bg-green-50 px-3 py-1.5 rounded-full border border-green-100 mt-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isOtpStage ? 'bg-orange-500 animate-pulse' : 'bg-green-500 animate-pulse'}`}></span>
            <p className={`font-bold text-[9px] md:text-[10px] tracking-widest uppercase ${isOtpStage ? 'text-orange-700' : 'text-green-800'}`}>
              {isAdminMode ? 'Secure Admin Portal' : isOtpStage ? 'Identity Verification' : 'Farm-to-Table Access'}
            </p>
          </div>
        </div>

        <div className="space-y-5 md:space-y-6">
          {isAdminMode ? (
            <div className="animate-in fade-in duration-300">
              <div className="mb-6">
                <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 ml-1">Administrative PIN</label>
                <input
                  type="password"
                  placeholder="••••••"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError('');
                  }}
                  className="w-full border border-slate-200 rounded-2xl px-5 py-5 bg-slate-50/50 text-slate-950 font-black placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/10 focus:border-green-600 transition-all text-center text-xl md:text-2xl tracking-[1em]"
                  maxLength={6}
                />
                {error && <p className="text-red-500 text-[10px] md:text-xs font-bold mt-4 text-center uppercase tracking-widest">{error}</p>}
              </div>
              <button
                onClick={handleAdminLogin}
                className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-[20px] md:rounded-[24px] font-black text-base md:text-lg hover:bg-slate-800 transition flex items-center justify-center gap-3 shadow-xl active:scale-95"
              >
                Access Portal <span className="text-xl">🔒</span>
              </button>
              <button
                onClick={() => { setIsAdminMode(false); setError(''); }}
                className="w-full text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-widest hover:text-slate-600 transition mt-4"
              >
                Back to Customer Login
              </button>
            </div>
          ) : isOtpStage ? (
            <div className="animate-in slide-in-from-right-8 duration-500">
               <div className="text-center mb-8">
                 <p className="text-slate-500 font-medium text-sm">We've sent a 6-digit code to</p>
                 <p className="text-slate-900 font-black text-lg">+91 {phone}</p>
                 <div className="mt-3 bg-blue-50 border border-blue-100 p-3 rounded-2xl flex items-center gap-3 justify-center">
                    <span className="text-xl">💡</span>
                    <p className="text-[10px] text-blue-700 font-bold text-left leading-tight uppercase tracking-tight">
                      Check the <span className="font-black">Simulated Notification</span> at the top of this window for your code.
                    </p>
                 </div>
                 <button 
                  onClick={() => { setIsOtpStage(false); setOtp(['', '', '', '', '', '']); }} 
                  className="text-green-600 text-[10px] font-black uppercase tracking-widest mt-4 hover:underline"
                >
                  Change Number
                </button>
               </div>

               <div className="flex justify-between gap-2 md:gap-3 mb-8">
                 {otp.map((digit, idx) => (
                   <input
                     key={idx}
                     ref={(el) => { otpRefs.current[idx] = el; }}
                     type="text"
                     inputMode="numeric"
                     pattern="\d*"
                     maxLength={1}
                     value={digit}
                     onChange={(e) => handleOtpChange(idx, e.target.value)}
                     onKeyDown={(e) => handleKeyDown(idx, e)}
                     className="w-full aspect-square border-2 border-slate-100 rounded-xl md:rounded-2xl bg-slate-50/50 text-center text-xl md:text-2xl font-black text-slate-900 focus:outline-none focus:border-green-600 focus:ring-4 focus:ring-green-600/5 transition-all"
                   />
                 ))}
               </div>

               {error && <p className="text-red-500 text-[10px] font-black mb-6 text-center uppercase tracking-widest animate-pulse">{error}</p>}

               <button
                onClick={verifyOtp}
                className="w-full bg-green-600 text-white py-4 md:py-5 rounded-[20px] md:rounded-[24px] font-black text-base md:text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-green-600/30 active:scale-95"
              >
                Confirm Verification
              </button>

              <div className="mt-8 text-center">
                {resendTimer > 0 ? (
                  <div className="inline-flex items-center gap-2 text-slate-400 font-bold text-[10px] uppercase tracking-widest">
                    <span className="w-1.5 h-1.5 bg-slate-200 rounded-full"></span>
                    Resend code in {resendTimer}s
                  </div>
                ) : (
                  <button 
                    onClick={generateAndSendOtp}
                    className="text-slate-900 font-black text-[10px] uppercase tracking-widest hover:text-green-600 transition flex items-center gap-2 mx-auto"
                  >
                    Resend Verification Code ↻
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in duration-500">
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Your Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Rahul Sharma"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError('');
                    }}
                    className="w-full border border-slate-200 rounded-2xl px-5 py-4 bg-slate-50/50 text-slate-950 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Mobile Number</label>
                  <div className="flex gap-2 md:gap-3">
                    <div className="flex items-center gap-1 md:gap-2 border rounded-2xl px-3 md:px-4 py-4 bg-slate-100/50 w-24 md:w-28 border-slate-200">
                      <span className="text-base md:text-lg">🇮🇳</span>
                      <span className="font-bold text-slate-900 text-sm md:text-base">+91</span>
                    </div>
                    <input
                      type="tel"
                      placeholder="98765 43210"
                      value={phone}
                      onChange={(e) => {
                        setPhone(e.target.value.replace(/\D/g, ''));
                        setError('');
                      }}
                      className="flex-1 border border-slate-200 rounded-2xl px-5 py-4 bg-slate-50/50 text-slate-950 font-bold placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-green-600/5 focus:border-green-600 transition-all text-sm"
                    />
                  </div>
                </div>
                {error && <p className="text-red-500 text-[9px] md:text-[10px] font-black mt-2 ml-1 animate-pulse uppercase tracking-widest">{error}</p>}
              </div>
              
              <button
                onClick={generateAndSendOtp}
                disabled={isSending}
                className="w-full bg-slate-900 text-white py-4 md:py-5 rounded-[20px] md:rounded-[24px] font-black text-base md:text-lg hover:bg-green-600 transition-all duration-500 flex items-center justify-center gap-3 shadow-xl active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSending ? (
                  <span className="flex items-center gap-3">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Requesting Secure Code...
                  </span>
                ) : (
                  <>Send OTP Verification <span className="text-xl">→</span></>
                )}
              </button>
            </div>
          )}
        </div>

        {!isAdminMode && !isOtpStage && (
          <div className="mt-8 md:mt-12 text-center border-t border-slate-100 pt-8">
            <p className="text-slate-400 font-bold text-[10px] md:text-xs uppercase tracking-tight">
              Administrator?{' '}
              <button
                onClick={() => {
                  setIsAdminMode(true);
                  setError('');
                }}
                className="text-green-600 font-black hover:underline underline-offset-4"
              >
                Access Secure Gateway
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
