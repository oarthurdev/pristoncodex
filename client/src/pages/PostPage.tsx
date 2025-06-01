import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { formatRelativeTime, formatDate } from "@/lib/supabase";
import { Eye, Heart, MessageCircle, Bookmark, Share, Calendar, Clock } from "lucide-react";
import { useState } from "react";

export default function PostPage() {
  const [, params] = useRoute("/post/:slug");
  const [commentAuthor, setCommentAuthor] = useState("");
  const [commentContent, setCommentContent] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: post, isLoading: postLoading } = useQuery({
    queryKey: [`/api/posts/${params?.slug}`],
    enabled: !!params?.slug,
  });

  const { data: comments, isLoading: commentsLoading } = useQuery({
    queryKey: [`/api/posts/${post?.id}/comments`],
    enabled: !!post?.id,
  });

  const commentMutation = useMutation({
    mutationFn: (data: { authorName: string; content: string }) =>
      apiRequest("POST", `/api/posts/${post?.id}/comments`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/posts/${post?.id}/comments`] });
      setCommentAuthor("");
      setCommentContent("");
      toast({ title: "Comentário adicionado com sucesso!" });
    },
    onError: () => {
      toast({ title: "Erro ao adicionar comentário", variant: "destructive" });
    },
  });

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentAuthor.trim() || !commentContent.trim()) {
      toast({ title: "Preencha todos os campos", variant: "destructive" });
      return;
    }
    commentMutation.mutate({
      authorName: commentAuthor,
      content: commentContent,
    });
  };

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

  if (postLoading) {
    return (
      <div className="min-h-screen bg-slate-900 text-gray-100">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <Skeleton className="h-4 w-1/2 mb-8" />
          <Skeleton className="h-64 w-full mb-8" />
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-slate-900 text-gray-100">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="bg-slate-800 border-gray-700">
            <CardContent className="p-8 text-center">
              <h1 className="text-2xl font-bold text-white mb-4">Post não encontrado</h1>
              <p className="text-gray-400">O post que você está procurando não existe ou foi removido.</p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  const badge = getCategoryBadge(post.type);

  return (
    <div className="min-h-screen bg-slate-900 text-gray-100">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <article>
          {/* Post Header */}
          <header className="mb-8">
            <div className="flex items-center space-x-2 mb-4">
              <Badge className={`${badge.color} text-white`}>
                {badge.label}
              </Badge>
              <span className="text-gray-400 text-sm flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {formatDate(post.createdAt)}
              </span>
              {post.readTime && (
                <>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400 text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {post.readTime} min de leitura
                  </span>
                </>
              )}
            </div>
            
            <h1 className="text-4xl font-bold text-white mb-4">{post.title}</h1>
            <p className="text-xl text-gray-400 mb-6">{post.excerpt}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${post.authorId}`} />
                  <AvatarFallback>A</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-white font-medium">Autor #{post.authorId}</p>
                  <p className="text-gray-400 text-sm">{formatRelativeTime(post.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-400">
                <span className="flex items-center">
                  <Eye className="w-4 h-4 mr-1" />
                  {post.views}
                </span>
                <span className="flex items-center">
                  <Heart className="w-4 h-4 mr-1" />
                  {post.likes}
                </span>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-violet-400">
                  <Bookmark className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-violet-400">
                  <Share className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          {post.imageUrl && (
            <div className="mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="prose prose-invert prose-lg max-w-none mb-12">
            <div className="text-gray-300 whitespace-pre-wrap">
              {post.content}
            </div>
          </div>

          {/* Video Content */}
          {post.videoUrl && (
            <div className="mb-12">
              <div className="aspect-video">
                <iframe
                  src={post.videoUrl}
                  title={post.title}
                  className="w-full h-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          )}
        </article>

        <Separator className="my-12 border-gray-700" />

        {/* Comments Section */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <MessageCircle className="w-6 h-6 mr-2" />
            Comentários ({comments?.length || 0})
          </h2>

          {/* Comment Form */}
          <Card className="bg-slate-800 border-gray-700 mb-8">
            <CardHeader>
              <CardTitle>Deixe seu comentário</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmitComment} className="space-y-4">
                <Input
                  placeholder="Seu nome"
                  value={commentAuthor}
                  onChange={(e) => setCommentAuthor(e.target.value)}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Textarea
                  placeholder="Escreva seu comentário..."
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  rows={4}
                  className="bg-gray-700 border-gray-600 text-white"
                />
                <Button
                  type="submit"
                  disabled={commentMutation.isPending}
                  className="bg-violet-600 hover:bg-violet-700 text-white"
                >
                  {commentMutation.isPending ? "Enviando..." : "Comentar"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Comments List */}
          <div className="space-y-6">
            {commentsLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className="bg-slate-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
                      <div className="flex-1">
                        <Skeleton className="h-4 w-24 mb-2" />
                        <Skeleton className="h-4 w-full mb-1" />
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : comments?.length === 0 ? (
              <Card className="bg-slate-800 border-gray-700">
                <CardContent className="p-8 text-center">
                  <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400">Seja o primeiro a comentar!</p>
                </CardContent>
              </Card>
            ) : (
              comments?.map((comment: any) => (
                <Card key={comment.id} className="bg-slate-800 border-gray-700">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3">
                      <Avatar className="flex-shrink-0">
                        <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.authorName}`} />
                        <AvatarFallback>{comment.authorName.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-medium text-white">{comment.authorName}</span>
                          <span className="text-gray-400 text-sm">
                            {formatRelativeTime(comment.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-300">{comment.content}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
