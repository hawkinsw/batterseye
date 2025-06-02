import { IPlateZone, IPlateZones } from "./interfaces.ts";
import { None, Option, Some } from "./option.ts";

export class PlateZone {
  key: number;
  description: string;
  isStrike: boolean;

  constructor(key: number, description: string, isStrike: boolean) {
    this.key = key;
    this.description = description;
    this.isStrike = isStrike;
  }

  public toString(): string {
    return `${this.isStrike ? "Strike" : "Ball"} - ${this.description} (${this.key})`;
  }
}

let _static_plate_zones: _PlateZones | undefined;

export function PlateZones() : _PlateZones {
  if (_static_plate_zones == undefined) {
    _static_plate_zones = new _PlateZones();
  }

  return _static_plate_zones;
}

let _static_default_plate_zone: PlateZone | undefined;

export function DefaultPlateZone(): PlateZone {
  if (!_static_default_plate_zone) {
    _static_default_plate_zone = new PlateZone(-1, "Invalid Plate Zone", false);
  }

  return _static_default_plate_zone;
}

export class _PlateZones {
  _events: Option<Map<number, PlateZone>>;

  public constructor() {
    this._events = new None();
      
    const last_strike_zone = 9;
    const events = _plate_zones_raw as IPlateZones;

    this._events = new Some(events.reduce(
      (existing: Map<number, PlateZone>, next: IPlateZone) => {
        existing.set(next.id, new PlateZone(next.id, next.description, next.id < last_strike_zone ? true : false));
        return existing;
      },
      new Map(),
    ));
  }

  public zoneFromId(key: number): Option<PlateZone> {
    return this._events.map((events) => {
      const value = events.get(key);
      if (value) {
        return new Some(value);
      }
      return new None();
    });
  }
}


const _plate_zones_raw = [
  {
    "id": 1,
    "description": "High - Left"
  },
  {
    "id": 2,
    "description": "High - Middle"
  },
  {
    "id": 3,
    "description": "High - Right"
  },
  {
    "id": 4,
    "description": "Middle - Left"
  },
  {
    "id": 5,
    "description": "Middle - Middle"
  },
  {
    "id": 6,
    "description": "Middle - Right"
  },
  {
    "id": 7,
    "description": "Low - Left"
  },
  {
    "id": 8,
    "description": "Low - Middle"
  },
  {
    "id": 9,
    "description": "Low - Right"
  },
  {
    "id": 11,
    "description": "High - Left"
  },
  {
    "id": 12,
    "description": "High - Right"
  },
  {
    "id": 13,
    "description": "Low - Left"
  },
  {
    "id": 14,
    "description": "Low - Right"
  }
]