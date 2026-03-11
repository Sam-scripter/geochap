import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ArrowLeft, Phone, MessageCircle, MapPin, Home, Truck, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomerMap } from "@/components/CustomerMap";

interface OrderData {
  customerName: string;
  address: string;
  status: string;
  assignedTo: string | null;
  description: string;
}

export const CustomerTracking = () => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) return;

    const unsubscribe = onSnapshot(doc(db, "orders", orderId), (doc) => {
      if (doc.exists()) {
        setOrder(doc.data() as OrderData);
      } else {
        setOrder(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [orderId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-xl font-bold mb-2">Order Not Found</h1>
        <p className="text-muted-foreground mb-4">The order ID provided does not exist.</p>
        <Button onClick={() => navigate("/")}>Go Home</Button>
      </div>
    );
  }

  const getStatusInfo = (status: string) => {
    switch (status) {
      case "pending":
        return { label: "Looking for Rider", color: "text-orange-500", bg: "bg-orange-500" };
      case "in_transit":
        return { label: "Rider on the way", color: "text-blue-500", bg: "bg-blue-500" };
      case "delivered":
        return { label: "Delivered", color: "text-green-500", bg: "bg-green-500" };
      default:
        return { label: "Processing", color: "text-gray-500", bg: "bg-gray-500" };
    }
  };

  const statusInfo = getStatusInfo(order.status);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-0 md:p-4">
      {/* Mobile-first card (full screen on mobile, limited on desktop) */}
      <div className="w-full md:max-w-md bg-white md:rounded-3xl shadow-xl overflow-hidden min-h-screen md:min-h-[800px] flex flex-col relative">

        {/* Header */}
        <header className="bg-primary p-6 text-white pt-12 md:pt-6">
          <div className="flex items-center gap-2 mb-1">
            <Truck className="w-5 h-5" />
            <span className="font-bold text-lg">Rada Logistics</span>
          </div>
          <p className="opacity-80 text-sm">Tracking #{orderId}</p>
        </header>

        {/* Map Section */}
        <div className="h-64 bg-gray-200 relative overflow-hidden">
          {order.assignedTo ? (
            <CustomerMap riderId={order.assignedTo} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 mb-2 opacity-50" />
                <p className="text-sm">Waiting for rider assignment...</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 -mt-6 relative z-10 bg-white rounded-t-3xl p-6 shadow-up">

          {/* Status Badge */}
          <div className="flex flex-col items-center mb-8">
            <div className={`w-3 h-3 rounded-full ${statusInfo.bg} animate-pulse mb-2`} />
            <h2 className="text-2xl font-bold text-center">{statusInfo.label}</h2>
            <p className="text-gray-500 text-sm">{order.status === 'in_transit' ? 'Arriving soon' : 'Updates live'}</p>
          </div>

          {/* Progress Line */}
          <div className="flex items-center justify-between text-xs text-gray-400 mb-2 px-4">
            <span className={order.status !== 'pending' ? 'text-green-600 font-bold' : ''}>Picked Up</span>
            <span className={order.status === 'delivered' ? 'text-green-600 font-bold' : ''}>Delivered</span>
          </div>
          <div className="h-2 bg-gray-100 rounded-full mb-8 mx-4 overflow-hidden relative">
            <div
              className={`absolute top-0 left-0 h-full transition-all duration-1000 ${order.status === 'delivered' ? 'w-full bg-green-500' : (order.status === 'in_transit' ? 'w-1/2 bg-blue-500' : 'w-5 bg-orange-300')}`}
            />
          </div>

          {/* Details */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="bg-orange-100 p-3 rounded-full">
                <Home className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Delivery Address</h3>
                <p className="text-gray-600">{order.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <Truck className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Order Details</h3>
                <p className="text-gray-600">{order.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t">
          <Button className="w-full" variant="outline" disabled>
            <Phone className="w-4 h-4 mr-2" />
            Contact Support
          </Button>
        </div>

      </div>
    </div>
  );
};
