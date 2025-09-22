'use client';

import Link from 'next/link';
import { ArrowLeft, Star, Calendar, Clock, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import MovieCard from '../../components/MovieCard';

interface Movie {
  title: string;
  rating: number;
  year: number;
  runtime: string;
  genre: string;
  director: string;
  description: string;
  poster: string;
  backdrop: string;
  imdbUrl: string;
}

interface SimilarMovie {
  id: number;
  title: string;
  rating: number;
  likes: number;
  poster: string;
  year: number;
  genre: string;
  imdbUrl: string;
}

interface MovieDetailClientProps {
  movie: Movie;
  similarMovies: SimilarMovie[];
}

export default function MovieDetailClient({ movie, similarMovies }: MovieDetailClientProps) {
  return (
    <div className="min-h-screen">
      {/* Hero Section with Movie Details */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-black/30 z-10"></div>
        <div 
          className="h-[80vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('${movie.backdrop}')`
          }}
        >
          <div className="relative z-20 h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="mb-6">
                <Link href="/">
                  <Button variant="ghost" className="text-white hover:text-orange-400 hover:bg-white/10 -ml-4">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Movies
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Movie Poster */}
                <div className="w-72 flex-shrink-0">
                  <div className="glass-card p-4 glow-orange">
                    <img 
                      src={movie.poster} 
                      alt={movie.title}
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                </div>
                
                {/* Movie Info */}
                <div className="flex-1 space-y-6">
                  <div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
                      {movie.title}
                    </h1>
                    
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 star-rating fill-current" />
                        <span className="text-white font-bold text-xl">{movie.rating}</span>
                        <span className="text-gray-400">/10</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Calendar className="h-4 w-4" />
                        <span>{movie.year}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 text-gray-300">
                        <Clock className="h-4 w-4" />
                        <span>{movie.runtime}</span>
                      </div>
                      
                      <Badge className="bg-orange-500/20 text-orange-300">
                        {movie.genre}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-lg text-gray-300 leading-relaxed max-w-2xl">
                    {movie.description}
                  </p>
                  
                  <div className="text-gray-400">
                    <p><strong>Director:</strong> {movie.director}</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Button 
                      asChild
                      size="lg" 
                      className="bg-orange-500 hover:bg-orange-600 text-white px-8 glow-orange"
                    >
                      <a href={movie.imdbUrl} target="_blank" rel="noopener noreferrer">
                        View on IMDb
                      </a>
                    </Button>
                    
                    <Button 
                      size="lg" 
                      variant="outline" 
                      className="border-white/20 text-white hover:bg-white/10 backdrop-blur-sm"
                    >
                      <Heart className="mr-2 h-4 w-4" />
                      Add to Favorites
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Similar Movies Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center space-x-3 mb-8">
            <Users className="h-6 w-6 text-orange-500" />
            <h2 className="text-3xl font-bold text-white">Movies Similar to {movie.title}</h2>
            <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-1"></div>
            <Badge variant="secondary" className="bg-white/10 text-gray-300">
              {similarMovies.length} movies
            </Badge>
          </div>

          {/* Recommendation Algorithm Info */}
          <Card className="glass-card mb-8">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Users className="h-5 w-5 text-orange-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">How we find similar movies</h3>
                  <p className="text-gray-400 leading-relaxed">
                    Our algorithm analyzes genre, director, cast, plot themes, user ratings, and viewing patterns 
                    to find movies that share similar qualities with <strong className="text-white">{movie.title}</strong>.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {similarMovies.map((similarMovie) => (
              <MovieCard key={similarMovie.id} {...similarMovie} showLikes={true} />
            ))}
          </div>
          
          {/* Load More Section */}
          <div className="text-center mt-12">
            <Card className="glass-card max-w-md mx-auto">
              <CardContent className="p-6 text-center">
                <Users className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-white mb-2">Discover More Similar Movies</h3>
                <p className="text-gray-400 text-sm mb-4">
                  We have hundreds more movies similar to {movie.title}
                </p>
                <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">
                  Load More Movies
                </button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}