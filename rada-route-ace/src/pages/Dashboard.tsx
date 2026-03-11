import { useState } from "react";
import { Package, Users, Clock, CheckCircle, Plus } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { MetricCard } from "@/components/MetricCard";
import { LiveMap } from "@/components/LiveMap";
import { OrderList } from "@/components/orders/OrderList";
import { OrderForm } from "@/components/orders/OrderForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export const Dashboard = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />

      <main className="ml-64 p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Command Center</h1>
            <p className="text-muted-foreground mt-1">Monitor and manage your delivery operations</p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                New Order
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Order</DialogTitle>
                <DialogDescription>
                  Enter the delivery details below.
                </DialogDescription>
              </DialogHeader>
              <OrderForm onSuccess={() => setOpen(false)} />
            </DialogContent>
          </Dialog>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricCard
            title="Active Orders"
            value="--"
            icon={Package}
            trend={{ value: "Live", isPositive: true }}
          />
          <MetricCard
            title="Active Riders"
            value="--"
            icon={Users}
            badge={{ text: "Online", variant: "success" }}
          />
          <MetricCard
            title="Completed Today"
            value="--"
            icon={CheckCircle}
          />
          <MetricCard
            title="Avg Delivery Time"
            value="--"
            icon={Clock}
          />
        </div>

        {/* Map Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-foreground">Live Tracking</h2>
              <p className="text-sm text-muted-foreground">Real-time rider locations</p>
            </div>
          </div>
          <LiveMap />
        </div>

        {/* Orders List */}
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-foreground mb-4">Recent Orders</h2>
          <OrderList />
        </div>
      </main>
    </div>
  );
};
