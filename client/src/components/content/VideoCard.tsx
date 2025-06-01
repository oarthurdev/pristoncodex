import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Play, Eye } from "lucide-react";
import { formatRelativeTime } from "@/lib/supabase";

interface Video {
  id: number;
  title: string;
  description: string;
  videoUrl: string;
  videoDuration: string;
  views: number;
  createdAt: string;
  imageUrl?: string;
}

interface VideoCardProps {
  video: Video;
}

export default function VideoCard({ video }: VideoCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const getVideoId = (url: string) => {
    // Extract YouTube video ID from URL
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
    return match ? match[1] : null;
  };

  const getThumbnailUrl = (url: string) => {
    const videoId = getVideoId(url);
    return videoId 
      ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
      : video.imageUrl || 'https://via.placeholder.com/600x300?text=Video';
  };

  const getEmbedUrl = (url: string) => {
    const videoId = getVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  return (
    <Card className="bg-slate-800 border-gray-700 overflow-hidden hover:border-violet-400/50 transition-colors">
      <div className="relative">
        <img
          src={getThumbnailUrl(video.videoUrl)}
          alt={video.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center group-hover:bg-black/70 transition-colors">
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
              <Button
                size="lg"
                className="w-16 h-16 bg-violet-600 hover:bg-violet-700 rounded-full flex items-center justify-center"
              >
                <Play className="w-6 h-6 text-white ml-1" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl p-0">
              <div className="aspect-video">
                <iframe
                  src={getEmbedUrl(video.videoUrl)}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
          {video.videoDuration}
        </span>
      </div>
      <CardContent className="p-4">
        <h3 className="text-white font-medium mb-2">{video.title}</h3>
        <p className="text-gray-400 text-sm mb-3">{video.description}</p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span className="flex items-center">
            <Eye className="w-4 h-4 mr-1" />
            {video.views.toLocaleString()} visualizações
          </span>
          <span>{formatRelativeTime(video.createdAt)}</span>
        </div>
      </CardContent>
    </Card>
  );
}
