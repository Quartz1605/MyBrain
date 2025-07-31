import StyledBrainViewer from "./StyledBrainViewer";
import React, { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";

export const LandingPage = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Animated background shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>
      
      {/* 3D Brain as interactive background */}
      <div className="fixed inset-0 z-0">
        <StyledBrainViewer />
      </div>
      
      {/* Glass morphism overlay */}
      <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px] z-5"></div>
      
      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation Header */}
        <header className="w-full flex justify-between items-center px-8 py-6 bg-white/20 backdrop-blur-md border-b border-white/20">
          <div className={`flex items-center gap-3 transition-all duration-1000 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">🧠</span>
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white animate-pulse"></div>
            </div>
            <span className="text-3xl font-bold text-purple-700 bg-clip-text tracking-tight" >
              MyBrain
            </span>
          </div>
          <div className={`flex gap-4 transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-purple-700 text-white hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-0" 
              onClick={() => navigate('/login')}
            >
              Login
            </Button>
            <Button 
              className="bg-white/90 text-purple-700 border border-purple-200 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 backdrop-blur-sm" 
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </Button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center gap-8 px-8 py-16 text-center">
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="mb-6 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-sm font-medium text-purple-800">Your Digital Mind Palace</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-extrabold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-purple-800 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-2xl" style={{fontFamily: 'Indie Flower, cursive'}}>
                Save, Organize
              </span>
              <br />
              <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent drop-shadow-2xl" style={{fontFamily: 'Indie Flower, cursive'}}>
                & Share Links
              </span>
            </h1>
          </div>

          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl leading-relaxed font-light">
              Transform your browsing chaos into an organized digital brain. 
              <br />
              <span className="font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Store, categorize, and access your favorite links in stunning 3D visualization.
              </span>
            </p>
          </div>

          {/* Feature highlights */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl transition-all duration-1000 delay-900 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🔗</div>
              <h3 className="font-semibold text-purple-800 mb-2">Smart Organization</h3>
              <p className="text-gray-600 text-sm">AI-powered categorization of your links</p>
            </div>
            <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">🌐</div>
              <h3 className="font-semibold text-purple-800 mb-2">3D Visualization</h3>
              <p className="text-gray-600 text-sm">See your digital brain in interactive 3D</p>
            </div>
            <div className="bg-white/30 backdrop-blur-md p-6 rounded-xl border border-white/40 hover:bg-white/40 transition-all duration-300 hover:scale-105 group">
              <div className="text-3xl mb-3 group-hover:scale-110 transition-transform duration-300">⚡</div>
              <h3 className="font-semibold text-purple-800 mb-2">Lightning Fast</h3>
              <p className="text-gray-600 text-sm">Access any link in milliseconds</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 mb-8 transition-all duration-1000 delay-1100 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <Button 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-12 py-4 text-xl rounded-2xl shadow-2xl hover:shadow-3xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-110 transform group border-0" 
              onClick={() => navigate('/signup')}
            >
              <span className="flex items-center gap-2">
                Start Building Your Brain
                <span className="group-hover:translate-x-1 transition-transform duration-300">🚀</span>
              </span>
            </Button>
            <Button 
              className="bg-white/80 text-purple-700 border-2 border-purple-300 px-12 py-4 text-xl rounded-2xl shadow-xl hover:shadow-2xl hover:bg-white transition-all duration-300 hover:scale-105 backdrop-blur-sm" 
              onClick={() => navigate('/login')}
            >
              Already Have an Account?
            </Button>
          </div>

          {/* Social proof */}
          <div className={`text-center transition-all duration-1000 delay-1300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            <p className="text-gray-500 text-sm mb-4">Trusted by knowledge workers worldwide</p>
            <div className="flex items-center justify-center gap-8 opacity-50">
              <div className="flex items-center gap-1">
                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                <span className="text-sm text-gray-600">4.9/5</span>
              </div>
              <div className="text-sm text-gray-600">10,000+ users</div>
              <div className="text-sm text-gray-600">500K+ links saved</div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="w-full text-center py-8 text-gray-500 text-sm bg-white/10 backdrop-blur-md border-t border-white/20">
          <div className="max-w-6xl mx-auto px-8">
            <p>&copy; {new Date().getFullYear()} MyBrain. Organize your digital thoughts.</p>
            <div className="mt-2 flex justify-center gap-6 text-xs">
              <a href="#" className="hover:text-purple-600 transition-colors">Privacy</a>
              <a href="#" className="hover:text-purple-600 transition-colors">Terms</a>
              <a href="#" className="hover:text-purple-600 transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}