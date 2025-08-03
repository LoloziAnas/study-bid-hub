import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare, Send, Search, MoreVertical } from "lucide-react";

interface Message {
  id: string;
  sender: string;
  content: string;
  timestamp: Date;
  isOwn: boolean;
}

interface Chat {
  id: string;
  partnerName: string;
  requestTitle: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: "active" | "completed";
}

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>("1");
  const [newMessage, setNewMessage] = useState("");

  const mockChats: Chat[] = [
    {
      id: "1",
      partnerName: "Alex Mathematics",
      requestTitle: "Help with Calculus Integration",
      lastMessage: "I can start working on your problems right away!",
      lastMessageTime: new Date(Date.now() - 30 * 60 * 1000), // 30 min ago
      unreadCount: 2,
      status: "active"
    },
    {
      id: "2",
      partnerName: "CodeMaster Pro",
      requestTitle: "Python Data Structures Assignment",
      lastMessage: "The binary tree implementation looks good. Let me review the graph algorithms.",
      lastMessageTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      unreadCount: 0,
      status: "active"
    },
    {
      id: "3",
      partnerName: "Dr. Physics",
      requestTitle: "Quantum Mechanics Concepts",
      lastMessage: "Thank you for the clear explanations! The examples really helped.",
      lastMessageTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      unreadCount: 0,
      status: "completed"
    }
  ];

  const mockMessages: { [key: string]: Message[] } = {
    "1": [
      {
        id: "1",
        sender: "Alex Mathematics",
        content: "Hi! I saw you accepted my bid for the calculus help. I'm excited to work with you!",
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        isOwn: false
      },
      {
        id: "2",
        sender: "You",
        content: "Great! I really need help understanding integration by parts. When can we start?",
        timestamp: new Date(Date.now() - 1.5 * 60 * 60 * 1000),
        isOwn: true
      },
      {
        id: "3",
        sender: "Alex Mathematics",
        content: "I can start working on your problems right away! Could you share the specific problems you're struggling with?",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isOwn: false
      },
      {
        id: "4",
        sender: "Alex Mathematics",
        content: "I'll prepare some step-by-step explanations and audio recordings for you.",
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        isOwn: false
      }
    ]
  };

  const currentMessages = selectedChat ? mockMessages[selectedChat] || [] : [];
  const currentChat = mockChats.find(chat => chat.id === selectedChat);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // In a real app, you would send the message to the backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Messages</h1>
          <p className="text-muted-foreground">
            Chat with your helpers and students to coordinate your learning sessions.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
          {/* Chat List */}
          <Card className="animate-fade-in">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Conversations
              </CardTitle>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search messages..." className="pl-10" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-1">
                {mockChats.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-4 cursor-pointer transition-colors hover:bg-secondary/50 ${
                      selectedChat === chat.id ? "bg-secondary" : ""
                    }`}
                    onClick={() => setSelectedChat(chat.id)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback>
                          {chat.partnerName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-sm truncate">{chat.partnerName}</h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">
                              {formatTime(chat.lastMessageTime)}
                            </span>
                            {chat.unreadCount > 0 && (
                              <Badge variant="default" className="h-5 w-5 p-0 text-xs">
                                {chat.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-xs text-muted-foreground mb-1 truncate">
                          {chat.requestTitle}
                        </p>
                        
                        <p className="text-xs text-muted-foreground truncate">
                          {chat.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Messages */}
          <div className="lg:col-span-2">
            {selectedChat && currentChat ? (
              <Card className="h-full flex flex-col animate-fade-in">
                {/* Chat Header */}
                <CardHeader className="pb-3 border-b">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarFallback>
                          {currentChat.partnerName.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">{currentChat.partnerName}</h3>
                        <p className="text-sm text-muted-foreground">{currentChat.requestTitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={currentChat.status === "active" ? "default" : "outline"}
                        className={currentChat.status === "completed" ? "border-success text-success" : ""}
                      >
                        {currentChat.status}
                      </Badge>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {currentMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.isOwn
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-secondary-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}>
                          {formatTime(message.timestamp)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div className="p-4 border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="icon" disabled={!newMessage.trim()}>
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </div>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center animate-fade-in">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
                  <p className="text-muted-foreground">Choose a chat to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;