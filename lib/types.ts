import { GeoJSONLineString, GeoJSONPoint, GeoJSONPolygon } from "wellknown";

export enum GeometryType {
  POINT = "Point",
  LINE = "Line",
  POLYGON = "Polygon",
}

export type PathDB = ST_Point[];

export type Path = Point[];

export type ST_Point = string;

export type Point = {
  lat: number;
  lng: number;
};

export type PointDB = {
  latitude: number;
  longitude: number;
};

export type Businesses = {
  name: string;
  type: string;
  address: string;
  location: Point;
};

export type BusinessesDB = {
  name: string;
  type: string;
  address: string;
  location: PointDB;
};

export type RealEstate = {
  address: string;
  score: number;
  area: string;
  location: Point;
};

export type RealEstateDB = {
  address: string;
  score: number;
  area: string;
  location: PointDB;
};

export type BusinessDir = {
  businesses: Businesses[];
  real_estates: RealEstate[];
};

export type BusinessDirDB = {
  businesses: BusinessesDB[];
  real_estates: RealEstateDB[];
};

export type CoordinatesList = {
  osm_id: number;
  name: string;
  coordinates: Point[];
};

export type NewCoordinatesList = {
  osm_id: number;
  name: string;
  coordinates: Point[];
  color: string;
};

/*
alcohol
 bakery
 bar
 butcher
 cafe
 electronics
 greengrocer
 hairdresser
 locksmith
 pet_grooming
 restaurant
 shoe_repair
 tailor
*/

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

export type Ok<T> = { type: "ok"; data: T };

export type Error = { type: "error"; message: string };

export type Res<T> = Ok<T> | Error;
