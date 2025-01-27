import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Star, Wrench, Pencil } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  url: string;
  logo?: string;
  isFavorite?: boolean;
  onEdit?: () => void;
}

const ToolCard = ({ name, description, category, url, logo, isFavorite = false, onEdit }: ToolCardProps) => {
  const { user } = useAuth();

  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex-none">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
              {logo ? (
                <img 
                  src={logo} 
                  alt={`${name} logo`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <Wrench className="h-6 w-6 text-gray-400" />
              )}
            </div>
            <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          </div>
          <div className="flex gap-2">
            {user && (
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onEdit}>
                <Pencil className="h-4 w-4 text-gray-400" />
              </Button>
            )}
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Star className={`h-5 w-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Wrench className="h-4 w-4 text-gray-400" />
          <p className="text-sm text-muted-foreground">{category}</p>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-gray-600">{description}</p>
      </CardContent>
      <CardFooter className="flex-none">
        <Button asChild className="w-full gap-2">
          <a href={url} target="_blank" rel="noopener noreferrer">
            Open Tool
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ToolCard;