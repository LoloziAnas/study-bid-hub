import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap, MessageSquare, Plus, User } from "lucide-react";

const Navbar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav className="bg-background border-b border-border shadow-soft sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-primary">
            <GraduationCap className="h-6 w-6" />
            StudyBuddy
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/my-requests"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/my-requests") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              My Requests
            </Link>
            <Link
              to="/messages"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/messages") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Messages
            </Link>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="accent" size="sm" asChild>
              <Link to="/post-request">
                <Plus className="h-4 w-4" />
                Post Request
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <Button variant="accent" size="sm" asChild>
              <Link to="/post-request">
                <Plus className="h-4 w-4" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-sm">
        <div className="flex justify-around py-2">
          <Link
            to="/"
            className={`flex flex-col items-center gap-1 px-3 py-2 text-xs ${
              isActive("/") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <GraduationCap className="h-5 w-5" />
            Dashboard
          </Link>
          <Link
            to="/my-requests"
            className={`flex flex-col items-center gap-1 px-3 py-2 text-xs ${
              isActive("/my-requests") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <User className="h-5 w-5" />
            My Requests
          </Link>
          <Link
            to="/messages"
            className={`flex flex-col items-center gap-1 px-3 py-2 text-xs ${
              isActive("/messages") ? "text-primary" : "text-muted-foreground"
            }`}
          >
            <MessageSquare className="h-5 w-5" />
            Messages
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;