import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Download, TrendingUp, TrendingDown, Package, Users, Clock, DollarSign } from "lucide-react";

export const Reports = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="reports" />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Reports</h1>
            <p className="text-muted-foreground mt-1">Analytics and performance insights</p>
          </div>
          <div className="flex items-center gap-4">
            <Select defaultValue="week">
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Revenue</p>
                  <p className="text-2xl font-bold text-foreground">KES 1.2M</p>
                  <div className="flex items-center gap-1 text-success text-sm mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>+15.3%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Deliveries</p>
                  <p className="text-2xl font-bold text-foreground">2,847</p>
                  <div className="flex items-center gap-1 text-success text-sm mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>+8.2%</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Package className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Riders</p>
                  <p className="text-2xl font-bold text-foreground">18</p>
                  <div className="flex items-center gap-1 text-success text-sm mt-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>+3 new</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Delivery Time</p>
                  <p className="text-2xl font-bold text-foreground">24 min</p>
                  <div className="flex items-center gap-1 text-success text-sm mt-1">
                    <TrendingDown className="w-4 h-4" />
                    <span>-4 min</span>
                  </div>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center">
                  <Clock className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Delivery Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border border-dashed border-border">
                <div className="text-center text-muted-foreground">
                  <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Delivery volume chart</p>
                  <p className="text-sm">Weekly comparison</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Revenue Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/30 rounded-lg flex items-center justify-center border border-dashed border-border">
                <div className="text-center text-muted-foreground">
                  <DollarSign className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p>Revenue breakdown chart</p>
                  <p className="text-sm">By delivery zone</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Top Performers */}
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Riders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Sarah Kimani", deliveries: 89, rating: 4.9, earnings: "KES 45,200" },
                { name: "John Mwangi", deliveries: 76, rating: 4.8, earnings: "KES 38,400" },
                { name: "Mike Ochieng", deliveries: 71, rating: 4.7, earnings: "KES 35,800" },
                { name: "Peter Otieno", deliveries: 68, rating: 4.6, earnings: "KES 34,200" },
                { name: "Mary Njeri", deliveries: 65, rating: 4.8, earnings: "KES 32,800" },
              ].map((rider, index) => (
                <div key={rider.name} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                  <div className="flex items-center gap-4">
                    <span className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center text-primary font-bold">
                      {index + 1}
                    </span>
                    <div>
                      <p className="font-medium text-foreground">{rider.name}</p>
                      <p className="text-sm text-muted-foreground">{rider.deliveries} deliveries</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">{rider.earnings}</p>
                    <p className="text-sm text-muted-foreground">⭐ {rider.rating}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};
