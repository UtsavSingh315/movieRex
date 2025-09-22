import { db } from "@/db";
import { userMovieRec, movies } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { userid: string } }
) {
  try {
    const { userid } = params;
    console.log('Fetching movies for userid:', userid);

    // Join user_movie_rec with movies
    const results = await db
      .select({
        title: movies.title,
        genres: movies.genres,
        imdbid: movies.imdbid,
        rating: userMovieRec.rating,
      })
      .from(userMovieRec)
      .innerJoin(movies, eq(userMovieRec.movieid, movies.movieid))
      .where(eq(userMovieRec.userid, userid));

    console.log('Raw database results:', results);
    console.log('Number of results:', results.length);

    const transformed = results.map((row) => {
      // Extract year from title (last 4 digits inside parentheses)
      const yearMatch = row.title.match(/\((\d{4})\)$/);
      const year = yearMatch ? parseInt(yearMatch[1], 10) : null;

      // Remove year part from title
      const cleanTitle = row.title.replace(/\s*\(\d{4}\)$/, "");

      // Split genres string into array
      const genresArray = row.genres ? row.genres.split("|") : [];

      // Pad imdbId to 7 digits
      const imdbIdPadded = row.imdbid ? row.imdbid.padStart(7, "0") : "0000000";

      return {
        title: cleanTitle,
        year,
        genres: genresArray,
        imdbId: imdbIdPadded,
        rating: parseFloat(row.rating),
      };
    });

    console.log('Transformed results:', transformed);
    return NextResponse.json(transformed);
  } catch (error) {
    console.error("Error fetching user movies:", error);
    console.error("Error details:", error.message);
    console.error("Error stack:", error.stack);
    return NextResponse.json(
      { error: "Failed to fetch user movies" },
      { status: 500 }
    );
  }
}