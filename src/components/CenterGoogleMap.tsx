import { useState } from 'react';
import {
  APIProvider,
  AdvancedMarker,
  InfoWindow,
  Map as GoogleMap,
  Pin,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { ExternalLink } from 'lucide-react';
import { businessConfig } from '../config/businessConfig';

interface InteractiveMapProps {
  apiKey: string;
  coordinates: { lat: number; lng: number };
  formattedAddress: string;
}

function InteractiveMapContent({
  coordinates,
  formattedAddress,
}: {
  coordinates: { lat: number; lng: number };
  formattedAddress: string;
}) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoOpen, setInfoOpen] = useState(true);

  return (
    <GoogleMap
      mapId="DEMO_MAP_ID"
      defaultCenter={coordinates}
      defaultZoom={16}
      gestureHandling="cooperative"
      internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
      style={{ width: '100%', height: '100%' }}
    >
      <AdvancedMarker
        ref={markerRef}
        position={coordinates}
        title={businessConfig.brand.name}
        onClick={() => setInfoOpen((prev) => !prev)}
      >
        <Pin
          background="#102A43"
          borderColor="#F4B942"
          glyphColor="#F4B942"
        />
      </AdvancedMarker>

      {infoOpen && marker && (
        <InfoWindow
          anchor={marker}
          maxWidth={260}
          onCloseClick={() => setInfoOpen(false)}
        >
          <div className="p-1 text-left">
            <p className="font-semibold text-sm text-[#102A43]">
              {businessConfig.brand.name}
            </p>
            <p className="mt-1 text-xs text-slate-600 leading-snug">
              {formattedAddress}
            </p>
            <a
              href={businessConfig.location.directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-[#2563EB] hover:underline"
            >
              Open in Google Maps
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

function InteractiveMap({
  apiKey,
  coordinates,
  formattedAddress,
}: InteractiveMapProps) {
  return (
    <APIProvider
      apiKey={apiKey}
      libraries={['marker']}
      language="en"
      region="IN"
    >
      <InteractiveMapContent
        coordinates={coordinates}
        formattedAddress={formattedAddress}
      />
    </APIProvider>
  );
}

export function CenterGoogleMap({ quotaExceeded }: { quotaExceeded: boolean }) {
  const mapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY?.trim() || '';
  const { coordinates, fullAddress } = businessConfig.location;

  if (mapsApiKey && !quotaExceeded) {
    return (
      <div className="w-full h-[300px] sm:h-[340px] rounded-2xl overflow-hidden border border-slate-200 bg-[#F5F8FC]">
        <InteractiveMap
          apiKey={mapsApiKey}
          coordinates={coordinates}
          formattedAddress={fullAddress}
        />
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <iframe
        src={businessConfig.location.embedUrl}
        title={`Google Maps location for ${businessConfig.brand.name}`}
        className="block h-[300px] w-full border-0 sm:h-[340px]"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
      <div className="flex justify-end border-t border-slate-200 px-4">
        <a
          href={businessConfig.location.directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-[#285DB2] hover:underline focus-visible:outline-2 focus-visible:outline-[#2563EB]"
        >
          Open in Google Maps
          <ExternalLink className="size-4" aria-hidden="true" />
        </a>
      </div>
    </div>
  );
}
