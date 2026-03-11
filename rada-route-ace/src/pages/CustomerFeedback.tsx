import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Search, Star, MessageSquare, ThumbsUp, ThumbsDown, Filter } from "lucide-react";

interface Feedback {
  id: string;
  customerName: string;
  orderId: string;
  rating: number;
  comment: string;
  riderName: string;
  date: string;
  sentiment: "positive" | "neutral" | "negative";
}

const mockFeedback: Feedback[] = [
  { id: "1", customerName: "Alice Kamau", orderId: "ORD-7842", rating: 5, comment: "Excellent service! Rider was very professional and delivery was quick.", riderName: "John M.", date: "Today, 2:30 PM", sentiment: "positive" },
  { id: "2", customerName: "Brian Ochieng", orderId: "ORD-7841", rating: 4, comment: "Good delivery, package arrived in perfect condition.", riderName: "Sarah K.", date: "Today, 1:15 PM", sentiment: "positive" },
  { id: "3", customerName: "Catherine Mwangi", orderId: "ORD-7840", rating: 3, comment: "Delivery was a bit late but rider was polite.", riderName: "Mike O.", date: "Today, 11:00 AM", sentiment: "neutral" },
  { id: "4", customerName: "David Kimani", orderId: "ORD-7839", rating: 5, comment: "Super fast delivery! Will definitely use again.", riderName: "John M.", date: "Yesterday, 5:45 PM", sentiment: "positive" },
  { id: "5", customerName: "Elizabeth Njeri", orderId: "ORD-7838", rating: 2, comment: "Package was slightly damaged. Needs improvement.", riderName: "Peter O.", date: "Yesterday, 3:20 PM", sentiment: "negative" },
  { id: "6", customerName: "Francis Otieno", orderId: "ORD-7837", rating: 5, comment: "Best delivery service in Nairobi!", riderName: "Sarah K.", date: "Yesterday, 12:00 PM", sentiment: "positive" },
];

const getSentimentColor = (sentiment: Feedback["sentiment"]) => {
  switch (sentiment) {
    case "positive": return "bg-success/10 text-success";
    case "neutral": return "bg-warning/10 text-warning";
    case "negative": return "bg-destructive/10 text-destructive";
  }
};

const getSentimentIcon = (sentiment: Feedback["sentiment"]) => {
  switch (sentiment) {
    case "positive": return <ThumbsUp className="w-4 h-4" />;
    case "neutral": return <MessageSquare className="w-4 h-4" />;
    case "negative": return <ThumbsDown className="w-4 h-4" />;
  }
};

export const CustomerFeedback = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="feedback" />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Customer Feedback</h1>
            <p className="text-muted-foreground mt-1">Monitor customer satisfaction and reviews</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6 text-warning fill-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Average Rating</p>
                  <p className="text-2xl font-bold text-foreground">4.6</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <ThumbsUp className="w-6 h-6 text-success" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Positive</p>
                  <p className="text-2xl font-bold text-success">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-warning" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Neutral</p>
                  <p className="text-2xl font-bold text-warning">10%</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-destructive/10 rounded-full flex items-center justify-center">
                  <ThumbsDown className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Negative</p>
                  <p className="text-2xl font-bold text-destructive">5%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search feedback..." className="pl-10" />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Feedback</SelectItem>
              <SelectItem value="positive">Positive</SelectItem>
              <SelectItem value="neutral">Neutral</SelectItem>
              <SelectItem value="negative">Negative</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            More Filters
          </Button>
        </div>

        {/* Feedback List */}
        <div className="space-y-4">
          {mockFeedback.map((feedback) => (
            <Card key={feedback.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-semibold text-foreground">{feedback.customerName}</span>
                      <Badge variant="outline" className="text-xs">{feedback.orderId}</Badge>
                      <Badge className={getSentimentColor(feedback.sentiment)}>
                        {getSentimentIcon(feedback.sentiment)}
                        <span className="ml-1 capitalize">{feedback.sentiment}</span>
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-4 h-4 ${star <= feedback.rating ? 'text-warning fill-warning' : 'text-muted'}`} 
                        />
                      ))}
                    </div>

                    <p className="text-muted-foreground mb-3">{feedback.comment}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Rider: {feedback.riderName}</span>
                      <span>•</span>
                      <span>{feedback.date}</span>
                    </div>
                  </div>

                  <Button variant="ghost" size="sm">
                    Reply
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
