/** Interfaces defining format of GUMBO -- for parsing purposes */


export interface IPlateZone {
  id: number,
  description: string
}

export type IPlateZones = Array<IPlateZone>;

export interface IPlayResultEventType {
  plateAppearance: boolean;
  hit: boolean;
  code: string;
  baseRunningEvent: boolean;
  description: string;
}

export type IPlayResultEvents = Array<IPlayResultEventType>;

export interface IPitchCoordinates {
  pX: number,
  pZ: number,
}

export interface IPlayResult {
  type: string;
  event: string;
  eventType: string; // The code.
  description: string;
}

export interface IPitchData {
  startSpeed: number
  zone: number
  coordinates: IPitchCoordinates
}

export interface IPlayEvent {
  details: object;
  pitchData: IPitchData;
  isPitch: boolean;
}

export type IPlayEvents = Array<IPlayEvent>;

export interface IPlay {
  result: IPlayResult;
  playEvents: IPlayEvents
}

export interface IPlays {
  allPlays: Array<IPlay>;
  currentPlay: IPlay;
}

export interface _IPlays {
  plays: IPlays;
}
export interface IGame {
  liveData: _IPlays;
}
