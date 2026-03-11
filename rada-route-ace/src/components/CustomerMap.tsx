import { useEffect, useState } from 'react';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '@/lib/firebase';

interface RiderLocation {
    lat: number;
    lng: number;
    heading?: number;
    timestamp: number;
}

interface CustomerMapProps {
    riderId: string | null;
}

export function CustomerMap({ riderId }: CustomerMapProps) {
    const [location, setLocation] = useState<RiderLocation | null>(null);

    useEffect(() => {
        if (!riderId) return;

        const riderRef = ref(rtdb, `riders/${riderId}/location`);
        const unsubscribe = onValue(riderRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                setLocation(data);
            }
        });

        return () => unsubscribe();
    }, [riderId]);

    // Default to Nairobi if no location yet
    const center = location ? { lat: location.lat, lng: location.lng } : { lat: -1.286389, lng: 36.817223 };

    return (
        <div className="h-full w-full">
            <Map
                defaultCenter={center}
                center={center}
                defaultZoom={14}
                zoom={14}
                mapId="CUSTOMER_MAP_ID"
                options={{
                    disableDefaultUI: true,
                    zoomControl: true,
                }}
            >
                {location && (
                    <AdvancedMarker position={{ lat: location.lat, lng: location.lng }}>
                        <Pin background={'#00E676'} glyphColor={'#FFF'} borderColor={'#00A854'} />
                    </AdvancedMarker>
                )}
            </Map>
        </div>
    );
}
