import Link from 'next/link';
import { Film, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-nav border-t border-white/10 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Film className="h-6 w-6 text-orange-500" />
              <span className="text-xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                CinePick
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              AI-powered movie recommendations to help you discover your next favorite film.
            </p>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Discover</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Popular Movies
              </Link>
              <Link href="/user/1" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Recommendations
              </Link>
              <Link href="/movie/1" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Similar Movies
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <div className="space-y-2">
              <Link href="#" className="block text-gray-400 hover:text-orange-400 transition-colors">
                About Us
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="block text-gray-400 hover:text-orange-400 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Github className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-orange-400 transition-colors">
                <Mail className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 CinePick. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}