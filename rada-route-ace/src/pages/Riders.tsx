import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Phone, MapPin, Star } from "lucide-react";

interface Rider {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  status: "online" | "offline" | "busy";
  rating: number;
  deliveries: number;
  location: string;
}

const mockRiders: Rider[] = [
  { id: "1", name: "John Mwangi", phone: "+254 712 345 678", vehicle: "Boda Boda", status: "online", rating: 4.8, deliveries: 234, location: "Westlands" },
  { id: "2", name: "Sarah Kimani", phone: "+254 723 456 789", vehicle: "Boda Boda", status: "busy", rating: 4.9, deliveries: 312, location: "Kilimani" },
  { id: "3", name: "Mike Ochieng", phone: "+254 734 567 890", vehicle: "Boda Boda", status: "online", rating: 4.7, deliveries: 189, location: "Karen" },
  { id: "4", name: "Jane Wanjiku", phone: "+254 745 678 901", vehicle: "Bicycle", status: "offline", rating: 4.6, deliveries: 156, location: "Parklands" },
  { id: "5", name: "Peter Otieno", phone: "+254 756 789 012", vehicle: "Boda Boda", status: "online", rating: 4.5, deliveries: 278, location: "South B" },
  { id: "6", name: "Mary Njeri", phone: "+254 767 890 123", vehicle: "Boda Boda", status: "busy", rating: 4.8, deliveries: 345, location: "Lavington" },
];

const getStatusColor = (status: Rider["status"]) => {
  switch (status) {
    case "online": return "bg-success text-success-foreground";
    case "busy": return "bg-primary text-primary-foreground";
    case "offline": return "bg-muted text-muted-foreground";
  }
};

export const Riders = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="riders" />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Riders</h1>
            <p className="text-muted-foreground mt-1">Manage your delivery fleet</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            Add Rider
          </Button>
        </div>

        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input placeholder="Search riders..." className="pl-10" />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Total Riders</p>
            <p className="text-2xl font-bold text-foreground">24</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Online</p>
            <p className="text-2xl font-bold text-success">12</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Busy</p>
            <p className="text-2xl font-bold text-primary">8</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Offline</p>
            <p className="text-2xl font-bold text-muted-foreground">4</p>
          </div>
        </div>

        {/* Riders Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockRiders.map((rider) => (
            <Card key={rider.id} className="hover:shadow-lg transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-lg font-semibold text-primary">
                        {rider.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <CardTitle className="text-base">{rider.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{rider.vehicle}</p>
                    </div>
                  </div>
                  <Badge className={getStatusColor(rider.status)}>
                    {rider.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Phone className="w-4 h-4" />
                  {rider.phone}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {rider.location}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-border">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-warning fill-warning" />
                    <span className="font-medium">{rider.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{rider.deliveries} deliveries</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
};
