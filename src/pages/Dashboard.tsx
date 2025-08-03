import { useState } from "react";
import { Button } from "@/components/ui/button";
import FilterBar from "@/components/filters/FilterBar";
import RequestCard from "@/components/requests/RequestCard";
import { mockRequests } from "@/data/mockData";
import heroImage from "@/assets/hero-education.jpg";
import { Plus, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [filteredRequests, setFilteredRequests] = useState(mockRequests);

  const handleFilterChange = (filters: any) => {
    let filtered = mockRequests;

    if (filters.search) {
      filtered = filtered.filter(
        request =>
          request.title.toLowerCase().includes(filters.search.toLowerCase()) ||
          request.description.toLowerCase().includes(filters.search.toLowerCase()) ||
          request.subject.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.subject) {
      filtered = filtered.filter(request => request.subject === filters.subject);
    }

    if (filters.deliveryType) {
      filtered = filtered.filter(request =>
        request.deliveryTypes.includes(filters.deliveryType)
      );
    }

    setFilteredRequests(filtered);
  };

  const stats = {
    activeRequests: mockRequests.filter(r => r.status === "open").length,
    totalBids: mockRequests.reduce((sum, r) => sum + r.bidCount, 0),
    avgBudget: Math.round(
      mockRequests
        .filter(r => r.budget)
        .reduce((sum, r) => sum + (r.budget || 0), 0) /
      mockRequests.filter(r => r.budget).length
    )
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="Students studying together" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Get Academic Help
              <br />
              <span className="text-primary-foreground/90">From Fellow Students</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-foreground/90 max-w-3xl mx-auto">
              Connect with peer tutors, get help with assignments, and accelerate your learning journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg" asChild>
                <Link to="/post-request" className="gap-2">
                  <Plus className="h-5 w-5" />
                  Post Help Request
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-background/10 border-primary-foreground/20 text-primary-foreground hover:bg-background/20">
                Browse Requests
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-primary mb-2">{stats.activeRequests}</div>
              <div className="text-muted-foreground">Active Requests</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="text-3xl font-bold text-success mb-2">{stats.totalBids}</div>
              <div className="text-muted-foreground">Total Bids</div>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl font-bold text-accent mb-2">${stats.avgBudget}</div>
              <div className="text-muted-foreground">Average Budget</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Recent Help Requests</h2>
            <p className="text-muted-foreground">Find requests that match your expertise</p>
          </div>
          <Button variant="outline" className="gap-2">
            <TrendingUp className="h-4 w-4" />
            Sort by Popular
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-8">
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {/* Requests Grid */}
        {filteredRequests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request, index) => (
              <div
                key={request.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <RequestCard {...request} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No requests found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your filters or check back later for new requests.
            </p>
            <Button variant="accent" asChild>
              <Link to="/post-request">Post the First Request</Link>
            </Button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;