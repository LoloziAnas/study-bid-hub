import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Send, Type, Mic, Monitor } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const PostRequest = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    description: "",
    deliveryTypes: [] as string[],
    deadline: undefined as Date | undefined,
    budget: "",
  });

  const subjects = [
    "Mathematics", "Physics", "Chemistry", "Biology", "Computer Science",
    "English", "History", "Psychology", "Economics", "Engineering"
  ];

  const deliveryOptions = [
    { id: "text", label: "Text", icon: Type, description: "Written explanations and solutions" },
    { id: "audio", label: "Audio", icon: Mic, description: "Voice recordings and explanations" },
    { id: "screen", label: "Screen Recording", icon: Monitor, description: "Live demonstrations and walkthroughs" }
  ];

  const handleDeliveryTypeChange = (deliveryType: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      deliveryTypes: checked
        ? [...prev.deliveryTypes, deliveryType]
        : prev.deliveryTypes.filter(type => type !== deliveryType)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.subject || !formData.description || 
        !formData.deadline || formData.deliveryTypes.length === 0) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Request Posted Successfully!",
      description: "Your help request has been posted and students can now start bidding.",
    });

    // Navigate back to dashboard
    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Post a Help Request</h1>
          <p className="text-muted-foreground">
            Get help from fellow students by posting your academic questions and requirements.
          </p>
        </div>

        <Card className="shadow-medium animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Send className="h-5 w-5 text-primary" />
              Request Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <Label htmlFor="title" className="text-sm font-medium">
                  Title *
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., Help with Calculus Integration Problems"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="mt-1"
                />
              </div>

              {/* Subject */}
              <div>
                <Label className="text-sm font-medium">Subject *</Label>
                <Select value={formData.subject} onValueChange={(value) => setFormData(prev => ({ ...prev, subject: value }))}>
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Select a subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" className="text-sm font-medium">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  placeholder="Describe what kind of help you need. Be specific about the topics, concepts, or problems you're struggling with..."
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 min-h-[120px]"
                />
              </div>

              {/* Delivery Types */}
              <div>
                <Label className="text-sm font-medium mb-3 block">
                  Preferred Delivery Types * <span className="text-muted-foreground">(Select all that apply)</span>
                </Label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {deliveryOptions.map((option) => {
                    const Icon = option.icon;
                    const isChecked = formData.deliveryTypes.includes(option.id);
                    
                    return (
                      <div
                        key={option.id}
                        className={cn(
                          "flex items-start space-x-3 p-4 rounded-lg border transition-all duration-200",
                          isChecked 
                            ? "border-primary bg-primary/5 shadow-soft" 
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <Checkbox
                          id={option.id}
                          checked={isChecked}
                          onCheckedChange={(checked) => 
                            handleDeliveryTypeChange(option.id, checked as boolean)
                          }
                          className="mt-1"
                        />
                        <div className="flex-1 min-w-0">
                          <label
                            htmlFor={option.id}
                            className="flex items-center gap-2 font-medium cursor-pointer"
                          >
                            <Icon className="h-4 w-4 text-primary" />
                            {option.label}
                          </label>
                          <p className="text-sm text-muted-foreground mt-1">
                            {option.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Deadline */}
              <div>
                <Label className="text-sm font-medium">Deadline *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal mt-1",
                        !formData.deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.deadline ? format(formData.deadline, "PPP") : "Pick a deadline"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.deadline}
                      onSelect={(date) => setFormData(prev => ({ ...prev, deadline: date }))}
                      disabled={(date) => date < new Date()}
                      initialFocus
                      className="pointer-events-auto"
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Budget */}
              <div>
                <Label htmlFor="budget" className="text-sm font-medium">
                  Budget (Optional)
                </Label>
                <div className="relative mt-1">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">$</span>
                  <Input
                    id="budget"
                    type="number"
                    placeholder="25"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: e.target.value }))}
                    className="pl-8"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Setting a budget helps attract more bids from helpers.
                </p>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end gap-4 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate("/")}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="gap-2"
                >
                  <Send className="h-4 w-4" />
                  Post Request
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PostRequest;