import {
  PlayResultEvent as PlayResultEvent,
  PlayResultEvents,
} from "./event.ts";
import {
  IPitchBreaks,
  IPitchCoordinates,
  IPitchData,
  IPlayEvent,
  IPlayEvents,
  IPlayResult,
} from "./interfaces.ts";
import { Option } from "./option.ts";
import { PlateZone, PlateZones } from "./plate.ts";
import { describe, toString } from "./utils.ts";

export class PitchBreaks {
  breakAngle: number;
  breakLength: number;
  breakY: number;
  breakVertical: number;
  breakVerticalInduced: number;
  breakHorizontal: number;
  spinRate: number;
  spinDirection: number;

  constructor(from_i: IPitchBreaks) {
    this.breakAngle = from_i.breakAngle;
    this.breakLength = from_i.breakLength;
    this.breakY = from_i.breakY;
    this.breakVertical = from_i.breakVertical;
    this.breakVerticalInduced = from_i.breakVerticalInduced;
    this.breakHorizontal = from_i.breakHorizontal;
    this.spinRate = from_i.spinRate;
    this.spinDirection = from_i.spinDirection;
  }

  public toString(): string {
    return toString(this);
  }
}

export class PitchCoordinates {
  pX: number;
  pZ: number;

  constructor(from_i: IPitchCoordinates) {
    this.pX = from_i.pX;
    this.pZ = from_i.pZ;
  }

  public toString(): string {
    return toString(this);
  }
}

export class PitchData {
  @describe
  startSpeed: number;
  @describe
  zone: Option<PlateZone>;
  @describe
  coordinates: PitchCoordinates;
  typeConfidence: number;

  constructor(from_i: IPitchData) {
    this.startSpeed = from_i.startSpeed;
    this.zone = PlateZones().zoneFromId(from_i.zone);
    this.coordinates = new PitchCoordinates(from_i.coordinates);
    this.typeConfidence = from_i.typeConfidence;
  }

  public toString(): string {
    return toString(this);
  }
}

export class PlayEvent {
  details: string;
  isPitch: boolean;
  pitchData: PitchData | null;

  constructor(details: string, isPitch: boolean) {
    this.details = details;
    this.isPitch = isPitch;
    this.pitchData = null;
  }

  public toString(): string {
    return toString(this);
  }
}

export class PlayEvents {
  private events: Array<PlayEvent>;

  constructor(events: IPlayEvents) {
    this.events = events.map((i_event: IPlayEvent) => {
      const event = new PlayEvent(
        JSON.stringify(i_event.details),
        i_event.isPitch,
      );
      if (event.isPitch) {
        event.pitchData = new PitchData(i_event.pitchData);
      }

      return event;
    });
  }

  public pitches(): Array<PlayEvent> {
    return this.events.filter((v: PlayEvent) => {
      return v.isPitch;
    });
  }

  public toString(): string {
    return toString(this);
  }
}

export class PlayResult {
  type: string;
  eventType: Option<PlayResultEvent>;
  description: string;
  event: string;

  constructor(from_i: IPlayResult) {
    const events = PlayResultEvents();
    this.type = from_i.type;
    this.eventType = events.eventFromKey(from_i.eventType);
    this.description = from_i.description;
    this.event = from_i.event;
  }

  public toString(): string {
    return toString(this);
  }
}

export class Play {
  result: PlayResult;
  events: PlayEvents;
  constructor(result: PlayResult, events: PlayEvents) {
    this.result = result;
    this.events = events;
  }
  public toString(): string {
    return toString(this);
  }
}

export class Plays {
  allPlays: Array<Play>;
  currentPlay: Play;

  constructor(allPlays: Array<Play>, currentPlay: Play) {
    this.allPlays = allPlays;
    this.currentPlay = currentPlay;
  }

  public toString(): string {
    return `all plays: ${
      this.allPlays.join("\n-------\n")
    }; current play: ${this.currentPlay}`;
  }
}

export class Game {
  liveData: Plays;
  constructor(live: Plays) {
    this.liveData = live;
  }

  public toString(): string {
    return toString(this);
  }
}
