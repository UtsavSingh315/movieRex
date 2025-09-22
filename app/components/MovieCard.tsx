"use client";

import Link from "next/link";
import { Star, ExternalLink, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface MovieCardProps {
  id: number;
  title: string;
  rating?: number;
  likes?: number;
  poster?: string;
  year?: number;
  genre?: string;
  imdbUrl?: string;
  showLikes?: boolean;
}

export default function MovieCard({
  id,
  title,
  rating,
  likes,
  poster,
  year,
  genre,
  imdbUrl,
  showLikes = false,
}: MovieCardProps) {
  return (
    <Card className="glass-card hover-glow transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <div className="aspect-[2/3] bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
          {poster ? (
            // <img
            //   src={poster}
            //   alt={title}
            //   className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            // />
            <iframe
              src={poster}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"></iframe>
          ) : (
            <div className="text-gray-500 text-center p-4">
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-700 rounded-lg flex items-center justify-center">
                🎬
              </div>
              <p className="text-sm">No poster available</p>
            </div>
          )}
        </div>

        {genre && (
          <Badge className="absolute top-2 left-2 bg-orange-500/90 text-white backdrop-blur-sm">
            {genre}
          </Badge>
        )}

        {rating && (
          <div className="absolute top-2 right-2 glass-card px-2 py-1 flex items-center space-x-1">
            <Star className="h-3 w-3 star-rating fill-current" />
            <span className="text-white text-xs font-medium">
              {rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <h3 className="font-semibold text-white text-lg leading-tight line-clamp-2 group-hover:text-orange-400 transition-colors">
            {title}
          </h3>
          {year && <p className="text-gray-400 text-sm">{year}</p>}
        </div>

        {showLikes && likes !== undefined && (
          <div className="flex items-center space-x-2">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-gray-300 text-sm">
              {likes.toLocaleString()} likes
            </span>
          </div>
        )}

        <div className="flex space-x-2 pt-2">
          <Link href={`/movie/${id}`} className="flex-1">
            <Button
              variant="secondary"
              className="w-full bg-white/10 hover:bg-white/20 text-white border-0">
              View Similar
            </Button>
          </Link>

          {imdbUrl && (
            <Button
              asChild
              className="bg-orange-500 hover:bg-orange-600 text-white px-4">
              <a href={imdbUrl} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
