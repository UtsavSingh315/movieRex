'use client';

import { useState } from 'react';
import { Search, TrendingUp, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import MovieCard from './components/MovieCard';

const featuredMovies = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    rating: 9.3,
    poster: "https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 1994,
    genre: "Drama",
    imdbUrl: "https://www.imdb.com/title/tt0111161/"
  },
  {
    id: 2,
    title: "The Dark Knight",
    rating: 9.0,
    poster: "https://images.pexels.com/photos/8263345/pexels-photo-8263345.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 2008,
    genre: "Action",
    imdbUrl: "https://www.imdb.com/title/tt0468569/"
  },
  {
    id: 3,
    title: "Pulp Fiction",
    rating: 8.9,
    poster: "https://images.pexels.com/photos/7991669/pexels-photo-7991669.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 1994,
    genre: "Crime",
    imdbUrl: "https://www.imdb.com/title/tt0110912/"
  },
  {
    id: 4,
    title: "The Godfather",
    rating: 9.2,
    poster: "https://images.pexels.com/photos/8263317/pexels-photo-8263317.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 1972,
    genre: "Crime",
    imdbUrl: "https://www.imdb.com/title/tt0068646/"
  },
  {
    id: 5,
    title: "Inception",
    rating: 8.8,
    poster: "https://images.pexels.com/photos/7991686/pexels-photo-7991686.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 2010,
    genre: "Sci-Fi",
    imdbUrl: "https://www.imdb.com/title/tt1375666/"
  },
  {
    id: 6,
    title: "Interstellar",
    rating: 8.6,
    poster: "https://images.pexels.com/photos/8263283/pexels-photo-8263283.jpeg?auto=compress&cs=tinysrgb&w=400",
    year: 2014,
    genre: "Sci-Fi",
    imdbUrl: "https://www.imdb.com/title/tt0816692/"
  }
];

const genres = ["All", "Action", "Drama", "Comedy", "Sci-Fi", "Crime", "Thriller"];

export default function Home() {
  const [selectedGenre, setSelectedGenre] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMovies = featuredMovies.filter(movie => {
    const matchesGenre = selectedGenre === "All" || movie.genre === selectedGenre;
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesGenre && matchesSearch;
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent z-10"></div>
        <div 
          className="h-[70vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1600')"
          }}
        >
          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="max-w-2xl space-y-6">
                <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                  <span className="text-white">Discover</span>
                  <br />
                  <span className="bg-gradient-to-r from-orange-500 to-orange-300 bg-clip-text text-transparent">
                    Amazing Movies
                  </span>
                </h1>
                
                <p className="text-xl text-gray-300 leading-relaxed max-w-lg">
                  Get personalized movie recommendations powered by AI. Find your next favorite film from millions of titles.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    size="lg" 
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 text-lg glow-orange"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Get Recommendations
                  </Button>
                  
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white/20 text-white hover:bg-white/10 px-8 py-3 text-lg backdrop-blur-sm"
                  >
                    Browse Movies
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="glass-card p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search movies..." 
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <div className="flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <Badge
                      key={genre}
                      variant={selectedGenre === genre ? "default" : "secondary"}
                      className={`cursor-pointer transition-colors ${
                        selectedGenre === genre 
                          ? "bg-orange-500 text-white hover:bg-orange-600" 
                          : "bg-white/10 text-gray-300 hover:bg-white/20"
                      }`}
                      onClick={() => setSelectedGenre(genre)}
                    >
                      {genre}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Movies Grid */}
      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-3 mb-8">
            <Star className="h-6 w-6 text-orange-500" />
            <h2 className="text-3xl font-bold text-white">Featured Movies</h2>
            <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-1"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))}
          </div>
          
          {filteredMovies.length === 0 && (
            <div className="text-center py-12">
              <div className="glass-card p-8 max-w-md mx-auto">
                <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">No movies found</h3>
                <p className="text-gray-400">Try adjusting your search or filter criteria.</p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}