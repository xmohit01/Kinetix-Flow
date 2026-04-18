import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Activity } from 'lucide-react';

export default function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0e1a] via-[#0f1420] to-[#0a0e1a] flex items-center justify-center">
      <div className="text-center">
        <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-2xl shadow-cyan-500/30">
          <Activity className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-3xl text-white mb-2">PostureAI</h1>
        <p className="text-sm text-gray-400">Smart cardio tracking</p>
      </div>
    </div>
  );
}
