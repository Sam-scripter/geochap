import { useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { ref, onValue } from 'firebase/database';
import { rtdb } from '@/lib/firebase';
import { Loader2 } from 'lucide-react';

interface RiderLocation {
  lat: number;
  lng: number;
  heading?: number;
  timestamp: number;
}

interface RidersMap {
  [key: string]: {
    location: RiderLocation;
  };
}

export function LiveMap() {
  const [riders, setRiders] = useState<RidersMap>({});
  const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const ridersRef = ref(rtdb, 'riders');
    const unsubscribe = onValue(ridersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        setRiders(data);
      } else {
        setRiders({});
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="h-[400px] w-full rounded-2xl overflow-hidden shadow-inner border border-gray-200">
      <Map
        defaultCenter={{ lat: -1.286389, lng: 36.817223 }} // Nairobi Default
        defaultZoom={12}
        mapId="DEMO_MAP_ID" // Required for AdvancedMarker
        disableDefaultUI={true}
      >
        {Object.entries(riders).map(([id, data]) => {
          const { location } = data;
          if (!location) return null;

          return (
            <AdvancedMarker key={id} position={{ lat: location.lat, lng: location.lng }}>
              <Pin background={'#FF6600'} glyphColor={'#FFF'} borderColor={'#A84400'} />
            </AdvancedMarker>
          );
        })}
      </Map>
    </div>
  );
}
