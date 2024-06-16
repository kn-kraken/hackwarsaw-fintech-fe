import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  GeoJSONGeometry,
  GeoJSONGeometryOrNull,
  GeoJSONLineString,
  GeoJSONPoint,
  GeoJSONPolygon,
  Geometry,
  parse as wktParse,
} from "wellknown";
import { PathDB, Point, Path } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function st_textToGeojson<G extends GeoJSONGeometry>(
  geometry: string,
): G {
  const geojson: GeoJSONGeometryOrNull = wktParse(geometry);

  if (!geojson) {
    throw new Error("Invalid geometry.");
  }

  if (
    geojson.type === "Point" ||
    geojson.type === "LineString" ||
    geojson.type === "Polygon"
  ) {
    return geojson as G;
  }
  throw new Error(`Unsupported geometry type: ${geojson.type}`);
}
