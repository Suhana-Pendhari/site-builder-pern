import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden px-6 md:px-16 lg:px-24 xl:px-32 w-full text-sm text-white bg-gradient-to-b from-gray-900 to-black pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-14">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link to="/" className="flex items-center gap-2 mb-6">
            <Sparkles className="w-6 h-6 text-violet-400" />
            <span className="text-xl font-bold text-white">SiteSpark AI</span>
          </Link>
          <p className="text-sm/7 mt-6 text-gray-400">From Prompt to Website. Transform your ideas into beautiful, fully functional websites with the power of AI.</p>
        </div>
        <div className="flex flex-col lg:items-center lg:justify-center">
          <div className="flex flex-col text-sm space-y-2.5">
            <h2 className="font-semibold mb-5 text-violet-400">Product</h2>
            <Link to="/" className="hover:text-violet-400 transition text-gray-300">AI Generator</Link>
            <Link to="/projects" className="hover:text-violet-400 transition text-gray-300">My Projects</Link>
            <Link to="/pricing" className="hover:text-violet-400 transition text-gray-300">Pricing</Link>
          </div>
        </div>
        <div>
          <h2 className="font-semibold text-violet-400 mb-5">Subscribe to our newsletter</h2>
          <div className="text-sm space-y-6 max-w-sm">
            <p className="text-gray-400">Get the latest updates on new features, AI improvements, and tips for building better websites.</p>
            <div className="flex items-center">
              <input className="rounded-l-md bg-white/10 border border-white/20 outline-none w-full max-w-64 h-11 px-3 text-white placeholder:text-white/60" type="email" placeholder="Enter your email" />
              <button className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 transition px-4 h-11 text-white rounded-r-md font-medium">Subscribe</button>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-t mt-6 border-white/20">
        <p className="text-center text-gray-400">
          © 2025 SiteSpark AI. Built by Suhana Mirasab Pendhari. All Rights Reserved.
        </p>
        <div className="flex items-center gap-4 text-gray-400">
          <Link to="/" className="hover:text-violet-400 transition">
            Privacy Policy
          </Link>
          <Link to="/" className="hover:text-violet-400 transition">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
