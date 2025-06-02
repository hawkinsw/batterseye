import { PlayResultEvents, PlayResultEvent as PlayResultEvent} from "./event.ts";
import { IPitchCoordinates, IPitchData, IPlayEvent, IPlayEvents, IPlayResult } from "./interfaces.ts";
import { Option } from "./option.ts";
import { PlateZone, PlateZones } from "./plate.ts";

export class PitchCoordinates {
  pX: number;
  pZ: number

  constructor(from_i: IPitchCoordinates) {
    this.pX = from_i.pX;
    this.pZ = from_i.pZ;
  }

  public toString(): string {
    return `pX: ${this.pX} pZ: ${this.pZ}`
  }
}

export class PitchData {
  startSpeed: number;
  zone: Option<PlateZone>;
  coordinates: PitchCoordinates

  constructor(from_i: IPitchData) {
    this.startSpeed = from_i.startSpeed;
    this.zone = PlateZones().zoneFromId(from_i.zone)
    this.coordinates = new PitchCoordinates(from_i.coordinates)
  }

  public toString(): string {
    return `startSpeed: ${this.startSpeed}; zone: ${this.zone}; coordinates: ${this.coordinates}`
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
    return `details: ${this.details}, isPitch: ${this.isPitch}` + this.isPitch ? `pitchData: ${this.pitchData}` : ""
  }
}

export class PlayEvents {
  events: Array<PlayEvent>

  constructor(events: IPlayEvents) {
    this.events = events.map((i_event: IPlayEvent) => { 
      const event = new PlayEvent(JSON.stringify(i_event.details), i_event.isPitch);
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
    return `events: ${this.pitches().join("###")}`
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
    return `eventType: ${this.eventType}, description: ${this.description}, `
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
    return `result: ${this.result}; events: ${this.events}`;
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
    return `all plays: ${this.allPlays.join("\n-------\n")}; current play: ${this.currentPlay}`
  }
}

export class Game {
  liveData: Plays;
  constructor(live: Plays) {
    this.liveData = live;
  }

  public toString(): string {
    return `plays: ${this.liveData}`
  }
}
