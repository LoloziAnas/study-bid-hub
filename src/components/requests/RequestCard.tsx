import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Clock, DollarSign, MessageSquare, Mic, Monitor, Type } from "lucide-react";

interface RequestCardProps {
  id: string;
  title: string;
  subject: string;
  description: string;
  deliveryTypes: string[];
  deadline: Date;
  budget?: number;
  bidCount: number;
  status: "open" | "in_progress" | "completed";
}

const RequestCard = ({
  id,
  title,
  subject,
  description,
  deliveryTypes,
  deadline,
  budget,
  bidCount,
  status,
}: RequestCardProps) => {
  const getDeliveryIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "text":
        return <Type className="h-3 w-3" />;
      case "audio":
        return <Mic className="h-3 w-3" />;
      case "screen":
        return <Monitor className="h-3 w-3" />;
      default:
        return <Type className="h-3 w-3" />;
    }
  };

  const getStatusBadge = () => {
    switch (status) {
      case "open":
        return <Badge variant="default">Open</Badge>;
      case "in_progress":
        return <Badge variant="secondary">In Progress</Badge>;
      case "completed":
        return <Badge variant="outline" className="border-success text-success">Completed</Badge>;
      default:
        return <Badge variant="default">Open</Badge>;
    }
  };

  const timeLeft = () => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();
    const hours = Math.ceil(diff / (1000 * 60 * 60));
    
    if (hours < 0) return "Overdue";
    if (hours < 24) return `${hours}h left`;
    const days = Math.ceil(hours / 24);
    return `${days}d left`;
  };

  return (
    <Link to={`/request/${id}`}>
      <Card className="hover:shadow-medium transition-all duration-200 hover:scale-[1.02] animate-fade-in">
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{title}</h3>
              <Badge variant="outline" className="text-xs">{subject}</Badge>
            </div>
            {getStatusBadge()}
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {deliveryTypes.map((type) => (
              <div key={type} className="flex items-center gap-1 text-xs text-muted-foreground bg-secondary/50 px-2 py-1 rounded-md">
                {getDeliveryIcon(type)}
                {type}
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span className={timeLeft().includes("Overdue") ? "text-destructive" : ""}>{timeLeft()}</span>
              </div>
              
              <div className="flex items-center gap-1 text-muted-foreground">
                <MessageSquare className="h-4 w-4" />
                <span>{bidCount} bids</span>
              </div>
            </div>

            {budget && (
              <div className="flex items-center gap-1 font-medium text-success">
                <DollarSign className="h-4 w-4" />
                <span>${budget}</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RequestCard;