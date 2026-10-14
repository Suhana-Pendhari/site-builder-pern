import { ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/');
  };

  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-gradient-to-br from-violet-900/30 via-indigo-900/30 to-fuchsia-900/30 border border-violet-500/20 rounded-3xl p-12 md:p-16 overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 to-indigo-600/10 pointer-events-none" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 text-center">
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles className="w-6 h-6 text-violet-400" />
              <span className="text-violet-400 font-medium">Ready to Build?</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Start Creating Your Website Today
            </h2>
            
            <p className="text-lg text-gray-300 mb-10 max-w-2xl mx-auto">
              Join thousands of creators who are building beautiful websites with AI. No credit card required to get started.
            </p>
            
            <button
              onClick={handleGetStarted}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white px-8 py-4 rounded-xl font-medium text-lg transition-all duration-200 shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50"
            >
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
