import { Button } from "@/components/ui/button";
import { Eye, MapPin } from "lucide-react";

export interface Order {
  id: string;
  customerName: string;
  address: string;
  status: "pending" | "in_transit" | "delivered";
  time: string;
}

interface OrdersTableProps {
  orders: Order[];
  onTrack: (orderId: string) => void;
}

const statusConfig = {
  pending: {
    label: "Pending",
    className: "badge-pending",
  },
  in_transit: {
    label: "In Transit",
    className: "badge-transit",
  },
  delivered: {
    label: "Delivered",
    className: "badge-delivered",
  },
};

export const OrdersTable = ({ orders, onTrack }: OrdersTableProps) => {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
          <p className="text-sm text-muted-foreground">Track and manage active deliveries</p>
        </div>
        <Button variant="outline" size="sm" className="text-muted-foreground">
          View All
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-muted/50">
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Delivery Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Time
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {orders.map((order, index) => {
              const status = statusConfig[order.status];
              return (
                <tr 
                  key={order.id} 
                  className="hover:bg-muted/30 transition-colors animate-slide-up"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <td className="px-6 py-4">
                    <span className="text-sm font-medium text-foreground">#{order.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-foreground">{order.customerName}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{order.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${status.className}`}>
                      {status.label}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-muted-foreground">{order.time}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Button 
                      size="sm" 
                      onClick={() => onTrack(order.id)}
                      className="bg-primary hover:bg-primary/90 text-primary-foreground"
                    >
                      <Eye className="w-4 h-4 mr-1.5" />
                      Track
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
