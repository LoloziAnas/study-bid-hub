import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Clock, 
  DollarSign, 
  MessageSquare, 
  User, 
  Star, 
  Send,
  ArrowLeft,
  Type,
  Mic,
  Monitor,
  Calendar
} from "lucide-react";
import { getRequestById, getBidsForRequest } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

const RequestDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [showBidForm, setShowBidForm] = useState(false);
  const [bidForm, setBidForm] = useState({
    price: "",
    deliveryTime: "",
    message: ""
  });

  const request = getRequestById(id || "");
  const bids = getBidsForRequest(id || "");

  if (!request) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Request Not Found</h1>
          <Button onClick={() => navigate("/")} variant="outline">
            Back to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  const getDeliveryIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "text":
        return <Type className="h-4 w-4" />;
      case "audio":
        return <Mic className="h-4 w-4" />;
      case "screen":
        return <Monitor className="h-4 w-4" />;
      default:
        return <Type className="h-4 w-4" />;
    }
  };

  const handleSubmitBid = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bidForm.price || !bidForm.deliveryTime || !bidForm.message) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all fields before submitting your bid.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Bid Submitted Successfully!",
      description: "Your bid has been submitted and the student will be notified.",
    });

    setShowBidForm(false);
    setBidForm({ price: "", deliveryTime: "", message: "" });
  };

  const handleAcceptBid = (bidId: string) => {
    toast({
      title: "Bid Accepted!",
      description: "The helper has been notified and you can now start chatting.",
    });
  };

  const timeLeft = () => {
    const now = new Date();
    const diff = request.deadline.getTime() - now.getTime();
    const hours = Math.ceil(diff / (1000 * 60 * 60));
    
    if (hours < 0) return "Overdue";
    if (hours < 24) return `${hours}h left`;
    const days = Math.ceil(hours / 24);
    return `${days}d left`;
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-4 gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
          
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">{request.title}</h1>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span>Posted by {request.studentName || "Anonymous"}</span>
                <span>•</span>
                <span>{format(request.createdAt, "MMM d, yyyy")}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-primary border-primary">
                {request.subject}
              </Badge>
              {request.status === "open" && (
                <Badge variant="default">Open for Bids</Badge>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Details */}
            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle>Request Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-medium mb-2">Description</h3>
                  <p className="text-muted-foreground leading-relaxed">{request.description}</p>
                </div>

                <div>
                  <h3 className="font-medium mb-2">Preferred Delivery Types</h3>
                  <div className="flex flex-wrap gap-2">
                    {request.deliveryTypes.map((type) => (
                      <div key={type} className="flex items-center gap-2 bg-secondary px-3 py-1 rounded-md">
                        {getDeliveryIcon(type)}
                        <span className="text-sm">{type}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Deadline</div>
                      <div className="text-sm text-muted-foreground">{format(request.deadline, "MMM d, yyyy")}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <div className="text-sm font-medium">Time Left</div>
                      <div className={`text-sm ${timeLeft().includes("Overdue") ? "text-destructive" : "text-muted-foreground"}`}>
                        {timeLeft()}
                      </div>
                    </div>
                  </div>

                  {request.budget && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <div>
                        <div className="text-sm font-medium">Budget</div>
                        <div className="text-sm text-success font-medium">${request.budget}</div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Bids Section */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Bids ({bids.length})
                  </CardTitle>
                  {request.status === "open" && (
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={() => setShowBidForm(!showBidForm)}
                    >
                      Submit Bid
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {/* Bid Form */}
                {showBidForm && (
                  <form onSubmit={handleSubmitBid} className="mb-6 p-4 bg-secondary/30 rounded-lg space-y-4">
                    <h3 className="font-medium">Submit Your Bid</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="price">Price ($)</Label>
                        <Input
                          id="price"
                          type="number"
                          placeholder="25"
                          value={bidForm.price}
                          onChange={(e) => setBidForm(prev => ({ ...prev, price: e.target.value }))}
                        />
                      </div>
                      <div>
                        <Label htmlFor="deliveryTime">Delivery Time</Label>
                        <Input
                          id="deliveryTime"
                          placeholder="Within 24 hours"
                          value={bidForm.deliveryTime}
                          onChange={(e) => setBidForm(prev => ({ ...prev, deliveryTime: e.target.value }))}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Describe your expertise and how you can help..."
                        value={bidForm.message}
                        onChange={(e) => setBidForm(prev => ({ ...prev, message: e.target.value }))}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button type="submit" size="sm" className="gap-2">
                        <Send className="h-4 w-4" />
                        Submit Bid
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setShowBidForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                )}

                {/* Existing Bids */}
                <div className="space-y-4">
                  {bids.length > 0 ? (
                    bids.map((bid) => (
                      <div key={bid.id} className="border rounded-lg p-4 hover:shadow-soft transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {bid.helperName.split(" ").map(n => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{bid.helperName}</div>
                              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                {bid.helperRating} rating
                              </div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-lg font-bold text-success">${bid.price}</div>
                            <div className="text-sm text-muted-foreground">{bid.deliveryTime}</div>
                          </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-3">{bid.message}</p>

                        <div className="flex items-center justify-between">
                          <div className="text-xs text-muted-foreground">
                            {format(bid.createdAt, "MMM d, h:mm a")}
                          </div>
                          
                          {request.status === "open" && (
                            <Button
                              variant="success"
                              size="sm"
                              onClick={() => handleAcceptBid(bid.id)}
                            >
                              Accept Bid
                            </Button>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
                      <p>No bids yet. Be the first to help!</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <CardHeader>
                <CardTitle>Request Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Bids</span>
                  <span className="font-medium">{bids.length}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Average Bid</span>
                  <span className="font-medium">
                    ${bids.length > 0 ? Math.round(bids.reduce((sum, bid) => sum + bid.price, 0) / bids.length) : 0}
                  </span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Status</span>
                  <Badge variant={request.status === "open" ? "default" : "secondary"}>
                    {request.status.replace("_", " ")}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <Card className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  If you have questions about this request, you can contact our support team.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetail;
