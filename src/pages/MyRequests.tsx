import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserRequests } from "@/data/mockData";
import { Plus, Eye, MessageSquare, Clock, DollarSign } from "lucide-react";
import { format } from "date-fns";

const MyRequests = () => {
  const [userRequests] = useState(getUserRequests());

  const openRequests = userRequests.filter(r => r.status === "open");
  const inProgressRequests = userRequests.filter(r => r.status === "in_progress");
  const completedRequests = userRequests.filter(r => r.status === "completed");

  const getStatusBadge = (status: string) => {
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

  const RequestCard = ({ request }: { request: any }) => (
    <Card className="hover:shadow-medium transition-all duration-200 animate-fade-in">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-foreground mb-1 line-clamp-2">{request.title}</h3>
            <Badge variant="outline" className="text-xs">{request.subject}</Badge>
          </div>
          {getStatusBadge(request.status)}
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{request.description}</p>
        
        <div className="flex justify-between items-center text-sm mb-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{format(request.deadline, "MMM d")}</span>
            </div>
            
            <div className="flex items-center gap-1 text-muted-foreground">
              <MessageSquare className="h-4 w-4" />
              <span>{request.bidCount} bids</span>
            </div>
          </div>

          {request.budget && (
            <div className="flex items-center gap-1 font-medium text-success">
              <DollarSign className="h-4 w-4" />
              <span>${request.budget}</span>
            </div>
          )}
        </div>

        <div className="flex gap-2">
          <Button variant="outline" size="sm" asChild className="flex-1">
            <Link to={`/request/${request.id}`} className="gap-1">
              <Eye className="h-3 w-3" />
              View
            </Link>
          </Button>
          
          {request.status === "in_progress" && (
            <Button variant="accent" size="sm" className="flex-1 gap-1">
              <MessageSquare className="h-3 w-3" />
              Chat
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const EmptyState = ({ title, description }: { title: string; description: string }) => (
    <div className="text-center py-12">
      <div className="text-6xl mb-4">📝</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6">{description}</p>
      <Button variant="accent" asChild className="gap-2">
        <Link to="/post-request">
          <Plus className="h-4 w-4" />
          Post Your First Request
        </Link>
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">My Requests</h1>
            <p className="text-muted-foreground">
              Manage your help requests and track their progress
            </p>
          </div>
          <Button variant="accent" asChild className="gap-2">
            <Link to="/post-request">
              <Plus className="h-4 w-4" />
              New Request
            </Link>
          </Button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="animate-fade-in">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Open Requests</p>
                  <p className="text-2xl font-bold text-primary">{openRequests.length}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">In Progress</p>
                  <p className="text-2xl font-bold text-accent">{inProgressRequests.length}</p>
                </div>
                <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Clock className="h-6 w-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">{completedRequests.length}</p>
                </div>
                <div className="h-12 w-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Badge className="h-6 w-6 bg-success text-success-foreground p-0 text-xs">✓</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Requests Tabs */}
        <Tabs defaultValue="all" className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <TabsList className="grid w-full md:w-auto grid-cols-4">
            <TabsTrigger value="all">All ({userRequests.length})</TabsTrigger>
            <TabsTrigger value="open">Open ({openRequests.length})</TabsTrigger>
            <TabsTrigger value="in_progress">In Progress ({inProgressRequests.length})</TabsTrigger>
            <TabsTrigger value="completed">Completed ({completedRequests.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            {userRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userRequests.map((request, index) => (
                  <div
                    key={request.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <RequestCard request={request} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No requests yet"
                description="Start by posting your first help request to connect with fellow students."
              />
            )}
          </TabsContent>

          <TabsContent value="open" className="mt-6">
            {openRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {openRequests.map((request, index) => (
                  <div
                    key={request.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <RequestCard request={request} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No open requests"
                description="All your requests are either in progress or completed."
              />
            )}
          </TabsContent>

          <TabsContent value="in_progress" className="mt-6">
            {inProgressRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inProgressRequests.map((request, index) => (
                  <div
                    key={request.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <RequestCard request={request} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No requests in progress"
                description="Once you accept a bid, your request will appear here."
              />
            )}
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            {completedRequests.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedRequests.map((request, index) => (
                  <div
                    key={request.id}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <RequestCard request={request} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No completed requests"
                description="Completed requests will show up here once they're finished."
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyRequests;