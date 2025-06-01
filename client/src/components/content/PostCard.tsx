import { Link } from "wouter";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Eye, MessageCircle, Heart, Bookmark, Share } from "lucide-react";
import { formatRelativeTime } from "@/lib/supabase";

interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  type: string;
  categoryId: number;
  authorId: number;
  featured: boolean;
  views: number;
  likes: number;
  imageUrl?: string;
  videoUrl?: string;
  videoDuration?: string;
  readTime?: number;
  createdAt: string;
}

interface PostCardProps {
  post: Post;
  featured?: boolean;
  compact?: boolean;
}

export default function PostCard({ post, featured = false, compact = false }: PostCardProps) {
  const getCategoryBadge = (type: string) => {
    switch (type) {
      case 'tutorial':
        return { label: 'TUTORIAL', color: 'bg-green-600' };
      case 'artigo':
        return { label: 'ARTIGO', color: 'bg-blue-600' };
      case 'video':
        return { label: 'VÍDEO', color: 'bg-purple-600' };
      default:
        return { label: 'CONTEÚDO', color: 'bg-gray-600' };
    }
  };

  const badge = getCategoryBadge(post.type);

  if (compact) {
    return (
      <Card className="bg-slate-800 border-gray-700 hover:border-violet-400/50 transition-colors">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
            )}
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <Badge className={`${badge.color} text-white text-xs`}>
                  {badge.label}
                </Badge>
                <span className="text-gray-400 text-sm">
                  {formatRelativeTime(post.createdAt)}
                </span>
                {post.readTime && (
                  <>
                    <span className="text-gray-400 text-sm">•</span>
                    <span className="text-gray-400 text-sm">{post.readTime} min de leitura</span>
                  </>
                )}
              </div>
              <Link href={`/post/${post.slug}`}>
                <h3 className="text-lg font-semibold text-white mb-2 hover:text-violet-400 transition-colors cursor-pointer">
                  {post.title}
                </h3>
              </Link>
              <p className="text-gray-400 text-sm mb-3">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Avatar className="w-6 h-6">
                    <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorId}`} />
                    <AvatarFallback>U</AvatarFallback>
                  </Avatar>
                  <span className="text-gray-400 text-sm">Autor #{post.authorId}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-gray-400 text-sm flex items-center">
                    <Heart className="w-4 h-4 mr-1" />
                    {post.likes}
                  </span>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-violet-400 h-8 w-8">
                    <Bookmark className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-gray-400 hover:text-violet-400 h-8 w-8">
                    <Share className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-slate-800 border-gray-700 overflow-hidden hover:border-violet-400/50 transition-colors group">
      {post.imageUrl && (
        <div className="relative">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-48 object-cover"
          />
          {post.videoDuration && (
            <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
              {post.videoDuration}
            </span>
          )}
        </div>
      )}
      <CardContent className="p-6">
        <div className="flex items-center space-x-2 mb-3">
          <Badge className={`${badge.color} text-white text-xs`}>
            {badge.label}
          </Badge>
          <span className="text-gray-400 text-sm">
            {formatRelativeTime(post.createdAt)}
          </span>
        </div>
        <Link href={`/post/${post.slug}`}>
          <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-violet-400 transition-colors cursor-pointer">
            {post.title}
          </h3>
        </Link>
        <p className="text-gray-400 text-sm mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Avatar className="w-6 h-6">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorId}`} />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <span className="text-gray-400 text-sm">Autor #{post.authorId}</span>
          </div>
          <div className="flex items-center space-x-3 text-gray-400 text-sm">
            <span className="flex items-center">
              <Eye className="w-4 h-4 mr-1" />
              {post.views}
            </span>
            <span className="flex items-center">
              <MessageCircle className="w-4 h-4 mr-1" />
              {Math.floor(Math.random() * 50) + 1} {/* Placeholder comment count */}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
