import { Sidebar } from "@/components/Sidebar";
import { OrdersTable, Order } from "@/components/OrdersTable";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus } from "lucide-react";

const mockOrders: Order[] = [
  { id: "ORD-7842", customerName: "Alice Kamau", address: "Westlands, Nairobi", status: "in_transit", time: "12 mins ago" },
  { id: "ORD-7841", customerName: "Brian Ochieng", address: "Kilimani, Nairobi", status: "pending", time: "25 mins ago" },
  { id: "ORD-7840", customerName: "Catherine Mwangi", address: "Karen, Nairobi", status: "delivered", time: "1 hour ago" },
  { id: "ORD-7839", customerName: "David Kimani", address: "Lavington, Nairobi", status: "in_transit", time: "1.5 hours ago" },
  { id: "ORD-7838", customerName: "Elizabeth Njeri", address: "Kileleshwa, Nairobi", status: "delivered", time: "2 hours ago" },
  { id: "ORD-7837", customerName: "Francis Otieno", address: "Parklands, Nairobi", status: "pending", time: "2.5 hours ago" },
  { id: "ORD-7836", customerName: "Grace Wanjiku", address: "South B, Nairobi", status: "delivered", time: "3 hours ago" },
  { id: "ORD-7835", customerName: "Henry Maina", address: "South C, Nairobi", status: "in_transit", time: "3.5 hours ago" },
];

export const Orders = () => {
  const navigate = useNavigate();

  const handleTrack = (orderId: string) => {
    navigate(`/track/${orderId}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeItem="orders" />
      
      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Orders</h1>
            <p className="text-muted-foreground mt-1">Manage and track all delivery orders</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90">
            <Plus className="w-4 h-4 mr-2" />
            New Order
          </Button>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-10" />
          </div>
          <Button variant="outline">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Total Orders</p>
            <p className="text-2xl font-bold text-foreground">156</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-2xl font-bold text-warning">23</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">In Transit</p>
            <p className="text-2xl font-bold text-primary">18</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <p className="text-sm text-muted-foreground">Delivered</p>
            <p className="text-2xl font-bold text-success">115</p>
          </div>
        </div>

        {/* Orders Table */}
        <OrdersTable orders={mockOrders} onTrack={handleTrack} />
      </main>
    </div>
  );
};
