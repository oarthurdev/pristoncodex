import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Download, FileText, Code, Settings } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface DownloadItem {
  id: number;
  name: string;
  description: string;
  fileUrl: string;
  fileName: string;
  fileSize: string;
  downloadCount: number;
  categoryId: number;
  createdAt: string;
}

interface DownloadCardProps {
  download: DownloadItem;
}

export default function DownloadCard({ download }: DownloadCardProps) {
  const { toast } = useToast();

  const getIcon = (fileName: string) => {
    if (fileName.includes('source') || fileName.includes('code')) {
      return <Code className="text-amber-400 w-6 h-6" />;
    }
    if (fileName.includes('client') || fileName.includes('game')) {
      return <Download className="text-violet-400 w-6 h-6" />;
    }
    if (fileName.includes('tool') || fileName.includes('util')) {
      return <Settings className="text-blue-400 w-6 h-6" />;
    }
    return <FileText className="text-gray-400 w-6 h-6" />;
  };

  const getIconBgColor = (fileName: string) => {
    if (fileName.includes('source') || fileName.includes('code')) {
      return 'bg-amber-400/20';
    }
    if (fileName.includes('client') || fileName.includes('game')) {
      return 'bg-violet-400/20';
    }
    if (fileName.includes('tool') || fileName.includes('util')) {
      return 'bg-blue-400/20';
    }
    return 'bg-gray-400/20';
  };

  const handleDownload = async () => {
    try {
      // Increment download count
      await apiRequest('POST', `/api/downloads/${download.id}/increment`);
      
      // Open download URL
      window.open(download.fileUrl, '_blank');
      
      toast({
        title: "Download iniciado",
        description: `${download.name} está sendo baixado.`,
      });
    } catch (error) {
      toast({
        title: "Erro no download",
        description: "Não foi possível iniciar o download. Tente novamente.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="bg-slate-800 border-gray-700 hover:border-violet-400/50 transition-colors">
      <CardContent className="p-4">
        <div className="flex items-start space-x-3">
          <div className={`w-12 h-12 ${getIconBgColor(download.fileName)} rounded-lg flex items-center justify-center flex-shrink-0`}>
            {getIcon(download.fileName)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-medium mb-1 truncate">{download.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{download.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-gray-500 text-xs">{download.fileSize}</span>
              <span className="text-green-400 text-xs">
                {download.downloadCount.toLocaleString()} downloads
              </span>
            </div>
            <Button
              onClick={handleDownload}
              className="w-full mt-3 bg-violet-600 hover:bg-violet-700 text-white"
              size="sm"
            >
              <Download className="w-4 h-4 mr-2" />
              Baixar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
