import { Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const examplePrompts = [
  "Create a modern portfolio website for a software developer",
  "Build a restaurant website with a menu and reservation form",
  "Design a landing page for a SaaS product",
  "Make a personal blog with a clean, minimal design"
];

const HeroSection = () => {
  const [prompt, setPrompt] = useState('');
  const navigate = useNavigate();

  const handleGenerate = () => {
    if (prompt.trim()) {
      navigate('/projects/new', { state: { prompt } });
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <section className="relative px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/20 via-indigo-900/10 to-fuchsia-900/20 pointer-events-none" />
      
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        {/* Logo/branding */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <Sparkles className="w-8 h-8 text-violet-400" />
          <h1 className="text-2xl font-bold text-white">SiteSpark AI</h1>
        </div>

        {/* Main heading */}
        <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
          Turn Your Ideas Into
          <span className="block bg-gradient-to-r from-violet-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent">
            Websites
          </span>
        </h2>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Describe your vision in plain English and watch AI transform it into a fully functional, modern website in seconds. No coding required.
        </p>

        {/* Prompt input area */}
        <div className="max-w-3xl mx-auto mb-8">
          <div className="relative bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-2 shadow-2xl">
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe the website you want to build..."
              className="w-full bg-transparent text-white placeholder-gray-500 p-4 outline-none resize-none h-32 text-lg"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleGenerate();
                }
              }}
            />
            <div className="flex items-center justify-between px-4 pb-4">
              <span className="text-sm text-gray-500">{prompt.length}/2000</span>
              <button
                onClick={handleGenerate}
                disabled={!prompt.trim()}
                className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg shadow-violet-900/20"
              >
                Generate Website
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Example prompts */}
        <div className="max-w-3xl mx-auto">
          <p className="text-sm text-gray-500 mb-3">Try these examples:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {examplePrompts.map((example, index) => (
              <button
                key={index}
                onClick={() => handleExampleClick(example)}
                className="text-sm text-gray-400 hover:text-white bg-gray-800/50 hover:bg-gray-700/50 border border-gray-700/50 hover:border-gray-600/50 px-4 py-2 rounded-lg transition-all duration-200"
              >
                {example}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
