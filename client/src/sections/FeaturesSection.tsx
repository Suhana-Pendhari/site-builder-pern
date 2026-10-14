import { Zap, Eye, Code, Smartphone, Layers, Shield } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'AI-Powered Generation',
    description: 'Transform your ideas into complete websites in seconds using advanced AI technology. No coding knowledge required.'
  },
  {
    icon: Eye,
    title: 'Live Preview',
    description: 'See your website come to life in real-time with our instant preview feature. Make changes and watch them appear instantly.'
  },
  {
    icon: Code,
    title: 'Clean Code Export',
    description: 'Download production-ready HTML, CSS, and JavaScript code. Own your code and deploy anywhere you want.'
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Every generated website is fully responsive and optimized for desktop, tablet, and mobile devices automatically.'
  },
  {
    icon: Layers,
    title: 'Iterative Editing',
    description: 'Refine your website with follow-up prompts. Add sections, change styles, or modify content with natural language.'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your projects are securely stored and isolated. Generated code runs in a sandboxed environment for safety.'
  }
];

const FeaturesSection = () => {
  return (
    <section className="px-6 md:px-16 lg:px-24 xl:px-32 py-24 bg-gray-950">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Everything You Need to Build
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Powerful features that make website creation effortless and enjoyable
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group bg-gray-900/50 border border-gray-800 rounded-2xl p-8 hover:border-violet-500/30 hover:bg-gray-900/70 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-violet-600/20 to-indigo-600/20 rounded-xl flex items-center justify-center mb-6 group-hover:from-violet-600/30 group-hover:to-indigo-600/30 transition-all duration-300">
                  <Icon className="w-7 h-7 text-violet-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
