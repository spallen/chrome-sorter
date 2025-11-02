"use client";

import { Video } from "@/types/watchlist";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock } from "lucide-react";

interface VideoListProps {
  videos: Video[];
  selectedVideos: Set<string>;
  onVideoSelect: (videoId: string) => void;
}

export function VideoList({
  videos,
  selectedVideos,
  onVideoSelect,
}: VideoListProps) {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  if (videos.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No videos found. Try adjusting your search or filters.
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {videos.map((video) => (
        <div
          key={video.id}
          className={`flex items-start gap-3 p-3 rounded-lg border transition-colors hover:bg-accent ${
            selectedVideos.has(video.id) ? "bg-accent" : ""
          }`}
        >
          <Checkbox
            checked={selectedVideos.has(video.id)}
            onCheckedChange={() => onVideoSelect(video.id)}
          />

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex items-start gap-3">
              <div className="relative flex-shrink-0">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-40 h-24 object-cover rounded"
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
                  {video.duration}
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium line-clamp-2 mb-1">{video.title}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {video.channel}
                </p>

                <div className="flex flex-wrap gap-2">
                  <Badge variant="secondary" className="text-xs">
                    <Calendar className="h-3 w-3 mr-1" />
                    Added: {formatDate(video.addedDate)}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    Published: {formatDate(video.publishDate)}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
