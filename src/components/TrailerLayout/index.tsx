import LocalMoviesIcon from "@mui/icons-material/LocalMovies";
import YouTube from "react-youtube";

export const TrailerLayout = ({ trailerKey }: { trailerKey: string }) => {
  return (
    <div className="px-10 mt-20">
      <h3 className="text-xl text-[#FF6F61] font-semibold mt-10">
        <LocalMoviesIcon sx={{ marginRight: 1, marginBottom: 0.5, color: "#FF6F61" }} />
        Watch the Official Trailer
      </h3>
      <div className="mt-2 youtube-responsive w-full">
        <YouTube
          videoId={trailerKey}
          opts={{
            playerVars: {

              enablejsapi: 1,
              modestbranding: 1,
            },
          }}
        />
      </div>
    </div>
  );
};
