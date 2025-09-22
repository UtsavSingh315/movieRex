import { User, Sparkles, Clock, Heart } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import MovieCard from "../../components/MovieCard";

interface Movie {
  title: string;
  year: number | null;
  genres: string[];
  imdbId: string;
  rating: number;
}

interface UserData {
  name: string;
  totalRecommendations: number;
  watchedMovies: number;
  favoriteGenres: string[];
}

async function fetchUserMovies(userId: string): Promise<Movie[]> {
  try {
    console.log("Fetching movies for user:", userId);
    const apiUrl = `${
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    }/api/userMovies/${userId}`;
    console.log("API URL:", apiUrl);

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
      }/api/userMovies/${userId}`,
      {
        cache: "no-store", // Ensure fresh data on each request
      }
    );

    console.log("Response status:", response.status);
    console.log("Response ok:", response.ok);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error("Failed to fetch user movies");
    }

    const data = await response.json();
    console.log("API Response data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching user movies:", error);
    return [];
  }
}

function getUserData(movies: Movie[], userId: string): UserData {
  const genreCount: { [key: string]: number } = {};

  movies.forEach((movie) => {
    movie.genres.forEach((genre) => {
      genreCount[genre] = (genreCount[genre] || 0) + 1;
    });
  });

  const favoriteGenres = Object.entries(genreCount)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([genre]) => genre);

  return {
    name: userId, // use the userId from params
    totalRecommendations: movies.length,
    watchedMovies: movies.length,
    favoriteGenres,
  };
}

/**
 * Fixes MovieLens-style titles where articles (The, A, An)
 * are placed at the end after a comma.
 *
 * Examples:
 *   "Godfather, The" -> "The Godfather"
 *   "Beautiful Mind, A" -> "A Beautiful Mind"
 *   "Man Who Knew Too Much, An" -> "An Man Who Knew Too Much"
 */
export function fixMovieLensTitle(title: string): string {
  // Regex: match any title ending with ", The", ", A", ", An"
  const regex = /(.*),\s(The|A|An)$/;

  const match = title.match(regex);
  if (!match) {
    return title; // return unchanged if no match
  }

  const [, mainTitle, article] = match;
  return `${article} ${mainTitle}`;
}

function transformMovieForCard(movie: Movie, index: number) {
  return {
    id: index + 1,
    title: fixMovieLensTitle(movie.title),
    rating: movie.rating,
    poster: `https://www.imdb.com/title/tt${movie.imdbId}/mediaviewer`,
    year: Number(movie.year),
    genre: movie.genres[0] || "Unknown",
    imdbUrl: `https://www.imdb.com/title/tt${movie.imdbId}/`,
  };
}

export async function generateStaticParams() {
  // Return all possible user IDs for static generation
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

export default async function UserRecommendations({
  params,
}: {
  params: { id: string };
}) {
  const userId = params.id;

  const movies = await fetchUserMovies(userId);
  const userData = getUserData(movies, userId);
  const recommendedMovies = movies.map(transformMovieForCard);

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* User Profile Header */}
        <div className="glass-card p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <User className="h-10 w-10 text-white" />
            </div>

            <div className="flex-1 space-y-4">
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome back, User #{userData.name}
                </h1>
                <p className="text-gray-400">
                  Here are your personalized movie recommendations based on your
                  viewing history and preferences.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2 glass-card px-4 py-2">
                  <Sparkles className="h-4 w-4 text-orange-400" />
                  <span className="text-white font-medium">
                    {userData.totalRecommendations}
                  </span>
                  <span className="text-gray-400 text-sm">Recommendations</span>
                </div>

                <div className="flex items-center space-x-2 glass-card px-4 py-2">
                  <Clock className="h-4 w-4 text-blue-400" />
                  <span className="text-white font-medium">
                    {userData.watchedMovies}
                  </span>
                  <span className="text-gray-400 text-sm">Movies Watched</span>
                </div>

                <div className="flex items-center space-x-2 glass-card px-4 py-2">
                  <Heart className="h-4 w-4 text-red-400" />
                  <span className="text-gray-400 text-sm">
                    Favorite Genres:
                  </span>
                  <div className="flex space-x-1">
                    {userData.favoriteGenres.map((genre, index) => (
                      <Badge
                        key={genre}
                        variant="secondary"
                        className="bg-orange-500/20 text-orange-300">
                        {genre}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations Section */}
        <div className="flex items-center space-x-3 mb-8">
          <Sparkles className="h-6 w-6 text-orange-500" />
          <h2 className="text-3xl font-bold text-white">
            Your Recommendations
          </h2>
          <div className="h-px bg-gradient-to-r from-orange-500/50 to-transparent flex-1"></div>
          <Badge className="bg-orange-500/20 text-orange-300">
            Updated Daily
          </Badge>
        </div>

        {/* Recommendation Explanation */}
        <Card className="glass-card mb-8">
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Sparkles className="h-5 w-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">
                  How we pick your movies
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  Our AI analyzes your viewing history, ratings, and preferences
                  to recommend movies you'll love. The more you watch and rate,
                  the better our recommendations become.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Movies Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {recommendedMovies.length > 0 ? (
            recommendedMovies.map((movie) => (
              <MovieCard key={movie.id} {...movie} />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <Card className="glass-card max-w-md mx-auto">
                <CardContent className="p-6 text-center">
                  <Sparkles className="h-8 w-8 text-orange-400 mx-auto mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    No recommendations found
                  </h3>
                  <p className="text-gray-400 text-sm">
                    We couldn't find any movie recommendations for this user.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>

        {/* Load More Section */}
        <div className="text-center mt-12">
          <Card className="glass-card max-w-md mx-auto">
            <CardContent className="p-6 text-center">
              <Sparkles className="h-8 w-8 text-orange-400 mx-auto mb-3" />
              <h3 className="text-lg font-semibold text-white mb-2">
                Want more recommendations?
              </h3>
              <p className="text-gray-400 text-sm mb-4">
                Rate more movies to get better personalized suggestions
              </p>
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors">
                Rate Movies
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
