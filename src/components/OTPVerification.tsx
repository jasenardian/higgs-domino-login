import { useState } from 'react';
import './OTPVerification.css';

interface OTPVerificationProps {
  onClose?: () => void;
  onSubmitOTP: (otp: string, method: 'wa' | 'email') => void;
  playClickSound?: () => void;
}

const OTPVerification = ({ onClose, onSubmitOTP, playClickSound }: OTPVerificationProps) => {
  const [otpMethod, setOtpMethod] = useState<'wa' | 'email' | null>(null);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleMethodSelect = (method: 'wa' | 'email') => {
    if (playClickSound) playClickSound();
    setOtpMethod(method);
    setOtpCode('');
  };

  const handleOTPSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpMethod || !otpCode || otpCode.length !== 6) return;
    
    setLoading(true);
    
    // Simulate OTP verification delay
    setTimeout(() => {
      onSubmitOTP(otpCode, otpMethod);
      setLoading(false);
    }, 2000);
  };

  const handleBackToMethodSelection = () => {
    if (playClickSound) playClickSound();
    setOtpMethod(null);
    setOtpCode('');
  };

  // Method Selection Screen
  if (!otpMethod) {
    return (
      <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-pop-in">
        <div className="otp-method-container">
          <div className="otp-method-header">
            <h2 className="text-2xl font-bold text-white mb-2">Pilih Metode Verifikasi</h2>
            <p className="text-gray-300 mb-6">Silakan pilih metode untuk menerima kode OTP</p>
          </div>
          
          <div className="otp-method-options">
            <div 
              className="otp-method-card wa-card"
              onClick={() => handleMethodSelect('wa')}
            >
              <img src="/verifikasihp.png" alt="WhatsApp" className="method-icon" />
              <div className="method-content">
                <h3 className="text-lg font-semibold text-white">WhatsApp</h3>
                <p className="text-gray-300 text-sm">Kirim OTP via WhatsApp</p>
              </div>
            </div>
            
            <div 
              className="otp-method-card email-card"
              onClick={() => handleMethodSelect('email')}
            >
              <img src="/verifikasiemail.png" alt="Email" className="method-icon" />
              <div className="method-content">
                <h3 className="text-lg font-semibold text-white">Email</h3>
                <p className="text-gray-300 text-sm">Kirim OTP via Email</p>
              </div>
            </div>
          </div>
          
          <button 
            className="otp-close-btn"
            onClick={onClose}
            aria-label="Close"
          >
            ✕
          </button>
        </div>
      </div>
    );
  }

  // OTP Input Screen
  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-pop-in">
      <div className="otp-input-container">
        <div className="otp-input-header">
          <button 
            className="back-btn"
            onClick={handleBackToMethodSelection}
            aria-label="Back"
          >
            ←
          </button>
          <h2 className="text-2xl font-bold text-white">Verifikasi OTP</h2>
          <p className="text-gray-300 mt-2">
            {otpMethod === 'wa' 
              ? 'Masukkan kode 6 digit yang dikirim ke WhatsApp Anda' 
              : 'Masukkan kode 6 digit yang dikirim ke Email Anda'
            }
          </p>
        </div>
        
        <form onSubmit={handleOTPSubmit} className="otp-form">
          <div className="otp-input-group">
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              value={otpCode}
              onChange={(e) => {
                const value = e.target.value.replace(/\D/g, '');
                if (value.length <= 6) {
                  setOtpCode(value);
                }
              }}
              className="otp-input"
              placeholder="______"
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            className={`otp-submit-btn ${(!otpCode || otpCode.length !== 6 || loading) ? 'disabled' : ''}`}
            disabled={!otpCode || otpCode.length !== 6 || loading}
          >
            {loading ? 'Memverifikasi...' : 'Verifikasi'}
          </button>
        </form>
        
        <button 
          className="otp-close-btn"
          onClick={onClose}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default OTPVerification;
