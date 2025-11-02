"use client";

import { useState, useMemo } from "react";
import { Search, ArrowUpDown, Filter, List } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { VideoList } from "@/components/video-list";
import { PlaylistSelector } from "@/components/playlist-selector";
import { Video, SortOption, SortOrder, FilterOptions } from "@/types/watchlist";

export function WatchlistManager() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [selectedVideos, setSelectedVideos] = useState<Set<string>>(new Set());
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    searchQuery: "",
    sortBy: "addedDate",
    sortOrder: "desc",
  });

  // Mock data for demonstration
  const mockVideos: Video[] = [
    {
      id: "1",
      title: "Introduction to Next.js 16",
      thumbnail: "https://via.placeholder.com/320x180",
      channel: "Web Dev Simplified",
      duration: "15:30",
      addedDate: new Date("2025-10-15"),
      publishDate: new Date("2025-10-10"),
      url: "https://youtube.com/watch?v=1",
    },
    {
      id: "2",
      title: "React Server Components Explained",
      thumbnail: "https://via.placeholder.com/320x180",
      channel: "Fireship",
      duration: "8:45",
      addedDate: new Date("2025-10-20"),
      publishDate: new Date("2025-10-18"),
      url: "https://youtube.com/watch?v=2",
    },
    {
      id: "3",
      title: "Tailwind CSS Tutorial",
      thumbnail: "https://via.placeholder.com/320x180",
      channel: "Traversy Media",
      duration: "25:15",
      addedDate: new Date("2025-10-25"),
      publishDate: new Date("2025-10-01"),
      url: "https://youtube.com/watch?v=3",
    },
  ];

  // Load mock data on mount
  useState(() => {
    if (videos.length === 0) {
      setVideos(mockVideos);
    }
  });

  const filteredAndSortedVideos = useMemo(() => {
    let result = [...videos];

    // Filter by search query
    if (filterOptions.searchQuery) {
      const query = filterOptions.searchQuery.toLowerCase();
      result = result.filter(
        (video) =>
          video.title.toLowerCase().includes(query) ||
          video.channel.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (filterOptions.sortBy) {
        case "addedDate":
          comparison = a.addedDate.getTime() - b.addedDate.getTime();
          break;
        case "publishDate":
          comparison = a.publishDate.getTime() - b.publishDate.getTime();
          break;
        case "title":
          comparison = a.title.localeCompare(b.title);
          break;
        case "channel":
          comparison = a.channel.localeCompare(b.channel);
          break;
      }
      return filterOptions.sortOrder === "asc" ? comparison : -comparison;
    });

    return result;
  }, [videos, filterOptions]);

  const handleSelectAll = () => {
    if (selectedVideos.size === filteredAndSortedVideos.length) {
      setSelectedVideos(new Set());
    } else {
      setSelectedVideos(new Set(filteredAndSortedVideos.map((v) => v.id)));
    }
  };

  const handleVideoSelect = (videoId: string) => {
    const newSelected = new Set(selectedVideos);
    if (newSelected.has(videoId)) {
      newSelected.delete(videoId);
    } else {
      newSelected.add(videoId);
    }
    setSelectedVideos(newSelected);
  };

  const handleMoveToPlaylist = (playlistId: string, removeFromWatchlist: boolean) => {
    console.log(`Moving ${selectedVideos.size} videos to playlist ${playlistId}`);
    console.log(`Remove from watchlist: ${removeFromWatchlist}`);

    if (removeFromWatchlist) {
      setVideos(videos.filter((v) => !selectedVideos.has(v.id)));
    }
    setSelectedVideos(new Set());
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <List className="h-6 w-6" />
            YouTube Watchlist Manager
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by title or channel..."
              className="pl-10"
              value={filterOptions.searchQuery}
              onChange={(e) =>
                setFilterOptions({ ...filterOptions, searchQuery: e.target.value })
              }
            />
          </div>

          {/* Sort and Filter Controls */}
          <div className="flex flex-wrap gap-2">
            <Select
              value={filterOptions.sortBy}
              onValueChange={(value: SortOption) =>
                setFilterOptions({ ...filterOptions, sortBy: value })
              }
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="addedDate">Date Added</SelectItem>
                <SelectItem value="publishDate">Publish Date</SelectItem>
                <SelectItem value="title">Title</SelectItem>
                <SelectItem value="channel">Channel</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setFilterOptions({
                  ...filterOptions,
                  sortOrder: filterOptions.sortOrder === "asc" ? "desc" : "asc",
                })
              }
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              {filterOptions.sortOrder === "asc" ? "Ascending" : "Descending"}
            </Button>

            <Button variant="outline" size="sm" onClick={handleSelectAll}>
              {selectedVideos.size === filteredAndSortedVideos.length
                ? "Deselect All"
                : "Select All"}
            </Button>
          </div>

          {/* Results Info */}
          <div className="text-sm text-muted-foreground">
            Showing {filteredAndSortedVideos.length} of {videos.length} videos
            {selectedVideos.size > 0 && ` • ${selectedVideos.size} selected`}
          </div>

          {/* Video List */}
          <VideoList
            videos={filteredAndSortedVideos}
            selectedVideos={selectedVideos}
            onVideoSelect={handleVideoSelect}
          />

          {/* Playlist Actions */}
          {selectedVideos.size > 0 && (
            <PlaylistSelector
              selectedCount={selectedVideos.size}
              onMove={handleMoveToPlaylist}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
