'use client';

import Link from 'next/link';
import { Film, Home, User, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Navigation() {
  return (
    <nav className="glass-nav sticky top-0 z-50 px-4 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 group">
          <Film className="h-8 w-8 text-orange-500 group-hover:text-orange-400 transition-colors" />
          <span className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
            CinePick
          </span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="flex items-center space-x-1 text-gray-300 hover:text-orange-400 transition-colors">
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <Link href="/user/1" className="flex items-center space-x-1 text-gray-300 hover:text-orange-400 transition-colors">
            <User className="h-4 w-4" />
            <span>My Recommendations</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="sm" className="text-gray-300 hover:text-orange-400 hover:bg-orange-500/10">
            <Search className="h-4 w-4" />
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6">
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}