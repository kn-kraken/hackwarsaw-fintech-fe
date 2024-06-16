"use client";

import React, { use, useContext, useEffect, useRef, useState } from "react";
import {
  MapContainer,
  Marker,
  Polygon,
  Polyline,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

import L, { LatLng, latLng } from "leaflet";
import MapInjector from "../map-injector";

import "leaflet/dist/leaflet.css";
import "leaflet-extra-markers/dist/css/leaflet.extra-markers.min.css";
import "leaflet-extra-markers/dist/js/leaflet.extra-markers.min.js";
import "font-awesome/css/font-awesome.min.css";

import { REGIONS, warsawCenter } from "@/lib/globals";
import { useLocation } from "@/contexts/query.context";
import { useBusinesses, useRealEstates } from "@/contexts/results.context";
import {
  CoordinatesList,
  NewCoordinatesList,
  Places,
  Point,
} from "@/lib/types";

L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const startIcon = (L as any).ExtraMarkers.icon({
  icon: "fa-flag-checkered",
  markerColor: "green",
  shape: "circle",
  prefix: "fa",
});

const personIcon = (L as any).ExtraMarkers.icon({
  icon: "fa-user",
  markerColor: "yellow",
  shape: "square",
  prefix: "fa",
});

const endIcon = (L as any).ExtraMarkers.icon({
  icon: "fa-flag-checkered",
  markerColor: "red",
  shape: "circle",
  prefix: "fa",
});

const realEstateIcon = (L as any).ExtraMarkers.icon({
  icon: "fa-circle",
  markerColor: "yellow",
  shape: "circle",
  prefix: "fa",
});

const createNumberedIcon = (number: number) =>
  (L as any).ExtraMarkers.icon({
    icon: "fa-number",
    number: number.toString(),
    markerColor: "blue",
    shape: "circle",
    prefix: "fa",
  });

/*
export type Places =
  | "ALCOHOL"
  | "BAKERY"
  | "BAR"
  | "BUTCHER"
  | "CAFE"
  | "ELECTRONICS"
  | "GREENGROCER"
  | "HAIRDRESSER"
  | "LOCKSMITH"
  | "PET_GROOMING"
  | "RESTAURANT"
  | "SHOE_REPAIR"
  | "TAILOR";

*/

/*
  Based on icons make icons for each place
  */
const ICONS_MAP: Record<Places, any> = {
  ALCOHOL: (L as any).ExtraMarkers.icon({
    icon: "fa-beer",
    markerColor: "green",
    shape: "circle",
    prefix: "fa",
  }),
  BAKERY: (L as any).ExtraMarkers.icon({
    icon: "fa-birthday-cake",
    markerColor: "purple",
    shape: "circle",
    prefix: "fa",
  }),
  BAR: (L as any).ExtraMarkers.icon({
    icon: "fa-glass",
    markerColor: "blue",
    shape: "circle",
    prefix: "fa",
  }),
  BUTCHER: (L as any).ExtraMarkers.icon({
    icon: "fa-cutlery",
    markerColor: "orange",
    shape: "circle",
    prefix: "fa",
  }),

  CAFE: (L as any).ExtraMarkers.icon({
    icon: "fa-coffee",
    markerColor: "yellow",
    shape: "circle",
    prefix: "fa",
  }),
  ELECTRONICS: (L as any).ExtraMarkers.icon({
    icon: "fa-plug",
    markerColor: "red",
    shape: "circle",
    prefix: "fa",
  }),
  GREENGROCER: (L as any).ExtraMarkers.icon({
    icon: "fa-lemon-o",
    markerColor: "pink",
    shape: "circle",
    prefix: "fa",
  }),
  HAIRDRESSER: (L as any).ExtraMarkers.icon({
    icon: "fa-scissors",
    markerColor: "teal",
    shape: "circle",
    prefix: "fa",
  }),
  LOCKSMITH: (L as any).ExtraMarkers.icon({
    icon: "fa-key",
    markerColor: "gray",
    shape: "circle",
    prefix: "fa",
  }),
  PET_GROOMING: (L as any).ExtraMarkers.icon({
    icon: "fa-paw",
    markerColor: "orange-dark",
    shape: "circle",
    prefix: "fa",
  }),
  RESTAURANT: (L as any).ExtraMarkers.icon({
    icon: "fa-cutlery",
    markerColor: "cyan",
    shape: "circle",
    prefix: "fa",
  }),
  SHOE_REPAIR: (L as any).ExtraMarkers.icon({
    icon: "fa-paw",
    markerColor: "green-light",
    shape: "circle",
    prefix: "fa",
  }),
  TAILOR: (L as any).ExtraMarkers.icon({
    icon: "fa-scissors",
    markerColor: "violet",
    shape: "circle",
    prefix: "fa",
  }),
};

type Props = { regions: NewCoordinatesList[] };

export default function MapFC({ regions }: Props) {
  const markerRef = useRef<any>(null);
  const [position, setPosition] = useState<null | L.LatLngExpression>(null);
  const [realEstates, setRealEstates] = useRealEstates();
  const [businesses, setBusinesses] = useBusinesses();

  return (
    <MapContainer
      center={warsawCenter}
      className="absolute z-[0] h-full w-full"
      zoom={15}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {!!realEstates &&
        realEstates.map((rel, index) => {
          const { lat, lng } = rel.location;
          return (
            <Marker
              key={index}
              position={{ lat, lng }}
              icon={createNumberedIcon(index + 1)}
            >
              <Popup>Location - {rel.address}</Popup>
            </Marker>
          );
        })}

      {!!businesses &&
        businesses.map((busines, index) => {
          const { lat, lng } = busines.location;
          return (
            <Marker
              key={index}
              position={{ lat, lng }}
              icon={ICONS_MAP[busines.type as Places]}
            >
              <Popup>
                {busines.name} - {busines.address}
              </Popup>
            </Marker>
          );
        })}

      {regions.map((region, index) => (
        <Polygon
          key={index}
          positions={region.coordinates}
          color={region.color}
        />
      ))}
      <LocationMarker />
      <MapInjector />
    </MapContainer>
  );
}

function LocationMarker() {
  const [location, setLocation] = useLocation();
  const [temp, setTemp] = useState<Point[]>([]);

  const map = useMapEvents({
    click(e) {
      setLocation({ lat: e.latlng.lat, lng: e.latlng.lng });
      setTemp((prev: any) => [
        ...prev,
        { lat: e.latlng.lat, lng: e.latlng.lng },
      ]);
    },
  });

  const handleDragEnd = (e: any) => {
    setLocation({
      lat: e.target.getLatLng().lat,
      lng: e.target.getLatLng().lng,
    });
  };

  return location === null ? null : (
    <Marker
      draggable
      position={location}
      eventHandlers={{
        dragend: handleDragEnd,
      }}
      icon={personIcon}
    >
      <Popup>Your ideal localization</Popup>
    </Marker>
  );
}
