import { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, doc, updateDoc } from 'firebase/firestore';
import { ref, onValue } from 'firebase/database';
import { db, rtdb } from '@/lib/firebase';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';

interface Order {
    id: string;
    customerName: string;
    customerPhone: string;
    address: string;
    description: string;
    status: 'pending' | 'picked_up' | 'in_transit' | 'delivered';
    assignedTo: string | null;
    createdAt: any;
    location?: { lat: number, lng: number };
}

interface Rider {
    id: string;
    location?: { lat: number, lng: number };
    distance?: number; // Calculated distance to current order
}

export function OrderList() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [riders, setRiders] = useState<Rider[]>([]);
    const [loading, setLoading] = useState(true);

    // 1. Fetch Orders
    useEffect(() => {
        const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const ordersData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Order[];
            setOrders(ordersData);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    // 2. Fetch Active Riders from RTDB
    useEffect(() => {
        const ridersRef = ref(rtdb, 'riders');
        const unsubscribe = onValue(ridersRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const activeRiders: Rider[] = Object.entries(data).map(([key, val]: [string, any]) => ({
                    id: key,
                    location: val.location
                }));
                setRiders(activeRiders);
            }
        });
        return () => unsubscribe();
    }, []);

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
        const R = 6371; // Radius of the earth in km
        const dLat = deg2rad(lat2 - lat1);
        const dLon = deg2rad(lon2 - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const d = R * c; // Distance in km
        return d;
    };

    const deg2rad = (deg: number) => {
        return deg * (Math.PI / 180);
    };

    const getSortedRiders = (orderLocation?: { lat: number, lng: number }) => {
        if (!orderLocation) return riders; // Return unsorted if no order location

        return [...riders].map(rider => {
            if (!rider.location) return { ...rider, distance: Infinity };
            const dist = calculateDistance(
                orderLocation.lat, orderLocation.lng,
                rider.location.lat, rider.location.lng
            );
            return { ...rider, distance: dist };
        }).sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
    };

    const handleAssignRider = async (orderId: string, riderId: string) => {
        try {
            await updateDoc(doc(db, 'orders', orderId), {
                assignedTo: riderId
            });
            toast.success('Rider assigned');
        } catch (error) {
            toast.error('Failed to assign rider');
        }
    };

    if (loading) return <div>Loading orders...</div>;

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {orders.map((order) => {
                const sortedRiders = getSortedRiders(order.location);

                return (
                    <Card key={order.id} className="w-full">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {order.customerName}
                            </CardTitle>
                            <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                                {order.status.replace('_', ' ')}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="text-xs text-muted-foreground mb-2">
                                {order.address}
                            </div>
                            <p className="text-sm font-semibold mb-2">{order.description}</p>
                            <div className="text-xs mb-4">Phone: {order.customerPhone}</div>

                            <div className="flex items-center gap-2">
                                <Select onValueChange={(val) => handleAssignRider(order.id, val)}>
                                    <SelectTrigger className="w-[140px]">
                                        <SelectValue placeholder={order.assignedTo ? "Assigned" : "Assign"} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {sortedRiders.map(rider => (
                                            <SelectItem key={rider.id} value={rider.id}>
                                                Rider {rider.id.substring(0, 5)}...
                                                {rider.distance !== undefined && rider.distance !== Infinity
                                                    ? ` (${rider.distance.toFixed(1)} km)`
                                                    : ''}
                                            </SelectItem>
                                        ))}
                                        {sortedRiders.length === 0 && <SelectItem value="none" disabled>No active riders</SelectItem>}
                                    </SelectContent>
                                </Select>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                        navigator.clipboard.writeText(`${window.location.origin}/track/${order.id}`);
                                        toast.success('Link copied!');
                                    }}
                                >
                                    Link
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                );
            })}
            {orders.length === 0 && (
                <div className="col-span-full text-center py-10 text-gray-500">
                    No active orders
                </div>
            )}
        </div>
    );
}
