import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Star } from "lucide-react";

interface ToolCardProps {
  name: string;
  description: string;
  category: string;
  url: string;
  isFavorite?: boolean;
}

const ToolCard = ({ name, description, category, url, isFavorite = false }: ToolCardProps) => {
  return (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow">
      <CardHeader className="flex-none">
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-semibold">{name}</CardTitle>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Star className={`h-5 w-5 ${isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
          </Button>
        </div>
        <p className="text-sm text-muted-foreground">{category}</p>
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