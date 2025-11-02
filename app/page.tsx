"use client";

import { useState } from "react";
import { WatchlistManager } from "@/components/watchlist-manager";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background">
      <div className="container mx-auto p-4 max-w-4xl">
        <WatchlistManager />
      </div>
    </main>
  );
}
