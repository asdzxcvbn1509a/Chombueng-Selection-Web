import React, { useState, useEffect } from 'react';

const LineLiffDemo = () => {
  const [liffInitialized, setLiffInitialized] = useState(false);
  const [status, setStatus] = useState({ message: '', type: '', show: false });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Show status message
  const showStatus = (message, type) => {
    setStatus({ message, type, show: true });
    
    if (type === 'success') {
      setTimeout(() => {
        setStatus(prev => ({ ...prev, show: false }));
      }, 3000);
    }
  };

  // Initialize LIFF
  const initializeLiff = async () => {
    try {
      showStatus('กำลังโหลด LIFF...', 'loading');
      
      // Check if liff is available
      if (typeof window.liff === 'undefined') {
        showStatus('กรุณาเปิดผ่าน LINE App หรือ LINE Browser', 'error');
        return;
      }
      
      // Replace 'YOUR_LIFF_ID' with your actual LIFF ID
      await window.liff.init({ liffId: '2007822748-6AgPK9Bv' });
      
      if (window.liff.isLoggedIn()) {
        setLiffInitialized(true);
        showStatus('เชื่อมต่อ LINE สำเร็จ!', 'success');
        setIsButtonDisabled(false);
      } else {
        showStatus('กรุณาเข้าสู่ระบบ LINE', 'error');
        window.liff.login();
      }
    } catch (error) {
      console.error('LIFF initialization failed:', error);
      showStatus('ไม่สามารถเชื่อมต่อ LINE LIFF ได้ กรุณาเปิดผ่าน LINE App', 'error');
    }
  };

  // Send message function
  const sendMessage = async () => {
    if (!liffInitialized) {
      showStatus('LIFF ยังไม่พร้อมใช้งาน', 'error');
      return;
    }
    
    try {
      showStatus('กำลังส่งข้อความ...', 'loading');
      setIsButtonDisabled(true);
      
      // Send message to LINE chat
      await window.liff.sendMessages([
        {
          type: 'text',
          text: 'สวัสดี'
        }
      ]);
      
      showStatus('ส่งข้อความ "สวัสดี" สำเร็จแล้ว! 🎉', 'success');
      
      // Re-enable button after 2 seconds
      setTimeout(() => {
        setIsButtonDisabled(false);
      }, 2000);
      
    } catch (error) {
      console.error('Failed to send message:', error);
      showStatus('เกิดข้อผิดพลาดในการส่งข้อความ', 'error');
      setIsButtonDisabled(false);
    }
  };

  // Initialize when component mounts
  useEffect(() => {
    const initApp = async () => {
      try {
        // Check if already loaded
        if (window.liff) {
          initializeLiff();
          return;
        }

        // Check if running in LINE environment
        const isLine = window.navigator.userAgent.includes('Line') || 
                      window.location.href.includes('liff.line.me');
        
        if (!isLine) {
          showStatus('กรุณาเปิดผ่าน LINE App', 'error');
          return;
        }

        // Load LIFF SDK with better error handling
        const loadLiffSdk = () => {
          return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = 'https://static.line-scdn.net/liff/edge/2/sdk.js';
            script.async = true;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
          });
        };

        await loadLiffSdk();
        
        // Wait a bit for SDK to be ready
        setTimeout(() => {
          if (window.liff) {
            initializeLiff();
          } else {
            showStatus('LIFF SDK ไม่พร้อมใช้งาน', 'error');
          }
        }, 100);

      } catch (error) {
        console.error('Failed to initialize:', error);
        showStatus('ไม่สามารถโหลด LIFF SDK ได้', 'error');
      }
    };

    initApp();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-purple-700 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-md w-full mx-auto">
        {/* Logo */}
        <div className="w-20 h-20 bg-green-500 rounded-full mx-auto mb-6 flex items-center justify-center text-4xl">
          📱
        </div>
        
        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-3">
          LINE LIFF Demo
        </h1>
        
        {/* Description */}
        <p className="text-gray-600 text-center mb-8 leading-relaxed">
          กดปุ่มด้านล่างเพื่อส่งข้อความ "สวัสดี" ไปยัง LINE OA
        </p>
        
        {/* Send Button */}
        <button
          onClick={sendMessage}
          disabled={isButtonDisabled}
          className={`w-full py-4 px-6 rounded-full text-lg font-bold transition-all duration-300 ${
            isButtonDisabled
              ? 'bg-gray-300 cursor-not-allowed text-gray-500'
              : 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white hover:shadow-lg hover:-translate-y-1 active:translate-y-0'
          }`}
        >
          📤 ส่งข้อความ "สวัสดี"
        </button>
        
        {/* Status */}
        {status.show && (
          <div className={`mt-6 p-4 rounded-xl text-sm text-center transition-all duration-300 ${
            status.type === 'loading' ? 'bg-blue-50 text-blue-700' :
            status.type === 'success' ? 'bg-green-50 text-green-700' :
            'bg-red-50 text-red-700'
          }`}>
            {status.message}
          </div>
        )}
        
        {/* Info Box */}
        <div className="mt-8 bg-gray-50 rounded-xl p-6">
          <h3 className="font-semibold text-gray-800 mb-4">คุณสมบัติ:</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-center">
              <span className="text-green-500 font-bold mr-3">✓</span>
              ส่งข้อความผ่าน LINE LIFF
            </li>
            <li className="flex items-center">
              <span className="text-green-500 font-bold mr-3">✓</span>
              รองรับการใช้งานใน LINE Browser
            </li>
            <li className="flex items-center">
              <span className="text-green-500 font-bold mr-3">✓</span>
              ออกแบบสำหรับมือถือ
            </li>
            <li className="flex items-center">
              <span className="text-green-500 font-bold mr-3">✓</span>
              แสดงสถานะการส่งข้อความ
            </li>
          </ul>
          <p className="text-xs text-gray-500 mt-4">
            <strong>หมายเหตุ:</strong> หน้าเว็บนี้ต้องทำงานผ่าน LINE LIFF URL เท่านั้น
          </p>
        </div>
      </div>
    </div>
  );
};

export default LineLiffDemo;