"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowRight, Trash2 } from "lucide-react";
import { Playlist } from "@/types/watchlist";

interface PlaylistSelectorProps {
  selectedCount: number;
  onMove: (playlistId: string, removeFromWatchlist: boolean) => void;
}

export function PlaylistSelector({
  selectedCount,
  onMove,
}: PlaylistSelectorProps) {
  const [selectedPlaylist, setSelectedPlaylist] = useState<string>("");
  const [removeFromWatchlist, setRemoveFromWatchlist] = useState(false);

  // Mock playlists - in a real app, these would come from YouTube API
  const playlists: Playlist[] = [
    { id: "1", name: "Watch Later", videoCount: 45 },
    { id: "2", name: "Tutorials", videoCount: 23 },
    { id: "3", name: "Music", videoCount: 67 },
    { id: "4", name: "Favorites", videoCount: 12 },
  ];

  const handleMove = () => {
    if (selectedPlaylist) {
      onMove(selectedPlaylist, removeFromWatchlist);
      setSelectedPlaylist("");
      setRemoveFromWatchlist(false);
    }
  };

  return (
    <Card className="p-4 bg-muted/50">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Move Selected Videos</h3>
          <span className="text-sm text-muted-foreground">
            {selectedCount} video{selectedCount !== 1 ? "s" : ""} selected
          </span>
        </div>

        <div className="flex flex-wrap gap-3 items-end">
          <div className="flex-1 min-w-[200px]">
            <Label htmlFor="playlist-select" className="text-sm mb-2 block">
              Select Playlist
            </Label>
            <Select value={selectedPlaylist} onValueChange={setSelectedPlaylist}>
              <SelectTrigger id="playlist-select">
                <SelectValue placeholder="Choose a playlist..." />
              </SelectTrigger>
              <SelectContent>
                {playlists.map((playlist) => (
                  <SelectItem key={playlist.id} value={playlist.id}>
                    {playlist.name} ({playlist.videoCount} videos)
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleMove}
            disabled={!selectedPlaylist}
            className="gap-2"
          >
            <ArrowRight className="h-4 w-4" />
            Move Videos
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="remove-from-watchlist"
            checked={removeFromWatchlist}
            onCheckedChange={(checked) =>
              setRemoveFromWatchlist(checked as boolean)
            }
          />
          <Label
            htmlFor="remove-from-watchlist"
            className="text-sm cursor-pointer flex items-center gap-2"
          >
            <Trash2 className="h-3 w-3" />
            Remove from watchlist after moving
          </Label>
        </div>
      </div>
    </Card>
  );
}
