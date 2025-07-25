import { IPlayResultEvents, IPlayResultEventType } from "./interfaces.ts";
import { None, Option, Some } from "./option.ts";

export class PlayResultEvent {
  key: string;
  description: string;

  constructor(key: string, description: string) {
    this.key = key;
    this.description = description;
  }

  public toString(): string {
    return `${this.description} (${this.key})`;
  }
}

let _static_play_result_events: _PlayResultEvents | undefined;

export function PlayResultEvents(): _PlayResultEvents {
  if (_static_play_result_events == undefined) {
    _static_play_result_events = new _PlayResultEvents();
  }

  return _static_play_result_events;
}

export class _PlayResultEvents {
  _events: Option<Map<string, PlayResultEvent>>;

  public constructor() {
    this._events = new None();

    const events = backup_play_result_events as IPlayResultEvents;

    this._events = new Some(events.reduce(
      (existing: Map<string, PlayResultEvent>, next: IPlayResultEventType) => {
        existing.set(
          next.code,
          new PlayResultEvent(next.code, next.description),
        );
        return existing;
      },
      new Map(),
    ));
  }

  public eventFromKey(key: string): Option<PlayResultEvent> {
    return this._events.map((events) => {
      const value = events.get(key);
      if (value) {
        return new Some(value);
      }
      return new None();
    });
  }
}

const backup_play_result_events = [
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pickoff_1b",
    "baseRunningEvent": true,
    "description": "Pickoff 1B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pickoff_2b",
    "baseRunningEvent": true,
    "description": "Pickoff 2B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pickoff_3b",
    "baseRunningEvent": true,
    "description": "Pickoff 3B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pitcher_step_off",
    "baseRunningEvent": false,
    "description": "Pitcher Step Off",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pickoff_error_1b",
    "baseRunningEvent": true,
    "description": "Pickoff Error 1B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pickoff_error_2b",
    "baseRunningEvent": true,
    "description": "Pickoff Error 2B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pickoff_error_3b",
    "baseRunningEvent": true,
    "description": "Pickoff Error 3B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "batter_timeout",
    "baseRunningEvent": false,
    "description": "Batter Timeout",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "mound_visit",
    "baseRunningEvent": false,
    "description": "Mound Visit",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "no_pitch",
    "baseRunningEvent": false,
    "description": "No Pitch",
  },
  {
    "plateAppearance": true,
    "hit": true,
    "code": "single",
    "baseRunningEvent": false,
    "description": "Single",
  },
  {
    "plateAppearance": true,
    "hit": true,
    "code": "double",
    "baseRunningEvent": false,
    "description": "Double",
  },
  {
    "plateAppearance": true,
    "hit": true,
    "code": "triple",
    "baseRunningEvent": false,
    "description": "Triple",
  },
  {
    "plateAppearance": true,
    "hit": true,
    "code": "home_run",
    "baseRunningEvent": false,
    "description": "Home Run",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "double_play",
    "baseRunningEvent": false,
    "description": "Double Play",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "field_error",
    "baseRunningEvent": false,
    "description": "Field Error",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "error",
    "baseRunningEvent": true,
    "description": "Error",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "field_out",
    "baseRunningEvent": false,
    "description": "Field Out",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "fielders_choice",
    "baseRunningEvent": false,
    "description": "Fielders Choice",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "fielders_choice_out",
    "baseRunningEvent": false,
    "description": "Fielders Choice Out",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "force_out",
    "baseRunningEvent": false,
    "description": "Forceout",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "grounded_into_double_play",
    "baseRunningEvent": false,
    "description": "Grounded Into DP",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "grounded_into_triple_play",
    "baseRunningEvent": false,
    "description": "Grounded Into TP",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "strikeout",
    "baseRunningEvent": false,
    "description": "Strikeout",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "strike_out",
    "baseRunningEvent": false,
    "description": "Strike Out",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "strikeout_double_play",
    "baseRunningEvent": false,
    "description": "Strikeout Double Play",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "strikeout_triple_play",
    "baseRunningEvent": false,
    "description": "Strikeout Triple Play",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "triple_play",
    "baseRunningEvent": false,
    "description": "Triple Play",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "sac_fly",
    "baseRunningEvent": false,
    "description": "Sac Fly",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "catcher_interf",
    "baseRunningEvent": false,
    "description": "Catcher Interference",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "batter_interference",
    "baseRunningEvent": false,
    "description": "Batter Interference",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "fielder_interference",
    "baseRunningEvent": false,
    "description": "Fielder Interference",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "runner_interference",
    "baseRunningEvent": false,
    "description": "Runner Interference",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "fan_interference",
    "baseRunningEvent": false,
    "description": "Fan Interference",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "batter_turn",
    "baseRunningEvent": false,
    "description": "Batter Turn",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "ejection",
    "baseRunningEvent": false,
    "description": "Ejection",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "cs_double_play",
    "baseRunningEvent": true,
    "description": "Cs Double Play",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "defensive_indiff",
    "baseRunningEvent": true,
    "description": "Defensive Indiff",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "sac_fly_double_play",
    "baseRunningEvent": false,
    "description": "Sac Fly Double Play",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "sac_bunt",
    "baseRunningEvent": false,
    "description": "Sac Bunt",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "sac_bunt_double_play",
    "baseRunningEvent": false,
    "description": "Sac Bunt Double Play",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "walk",
    "baseRunningEvent": false,
    "description": "Walk",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "intent_walk",
    "baseRunningEvent": false,
    "description": "Intent Walk",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "hit_by_pitch",
    "baseRunningEvent": false,
    "description": "Hit By Pitch",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "injury",
    "baseRunningEvent": false,
    "description": "Injury",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "os_ruling_pending_prior",
    "baseRunningEvent": true,
    "description": "Official Scorer Ruling Pending",
  },
  {
    "plateAppearance": true,
    "hit": false,
    "code": "os_ruling_pending_primary",
    "baseRunningEvent": false,
    "description": "Official Scorer Ruling Pending",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "at_bat_start",
    "baseRunningEvent": false,
    "description": "At Bat Start",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "passed_ball",
    "baseRunningEvent": true,
    "description": "Passed Ball",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "other_advance",
    "baseRunningEvent": true,
    "description": "Other Advance",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "runner_double_play",
    "baseRunningEvent": true,
    "description": "Runner Double Play",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "runner_placed",
    "baseRunningEvent": false,
    "description": "Runner Placed On Base",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pitching_substitution",
    "baseRunningEvent": false,
    "description": "Pitching Substitution",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "offensive_substitution",
    "baseRunningEvent": false,
    "description": "Offensive Substitution",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "defensive_switch",
    "baseRunningEvent": false,
    "description": "Defensive Switch",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "umpire_substitution",
    "baseRunningEvent": false,
    "description": "Umpire Substitution",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pitcher_switch",
    "baseRunningEvent": false,
    "description": "Pitcher Switch",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "game_advisory",
    "baseRunningEvent": false,
    "description": "Game Advisory",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "stolen_base",
    "baseRunningEvent": false,
    "description": "Stolen Base",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "stolen_base_2b",
    "baseRunningEvent": true,
    "description": "Stolen Base 2B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "stolen_base_3b",
    "baseRunningEvent": true,
    "description": "Stolen Base 3B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "stolen_base_home",
    "baseRunningEvent": true,
    "description": "Stolen Base Home",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "caught_stealing",
    "baseRunningEvent": false,
    "description": "Caught Stealing",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "caught_stealing_2b",
    "baseRunningEvent": true,
    "description": "Caught Stealing 2B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "caught_stealing_3b",
    "baseRunningEvent": true,
    "description": "Caught Stealing 3B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "caught_stealing_home",
    "baseRunningEvent": true,
    "description": "Caught Stealing Home",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "defensive_substitution",
    "baseRunningEvent": false,
    "description": "Defensive Sub",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pickoff_caught_stealing_2b",
    "baseRunningEvent": true,
    "description": "Pickoff Caught Stealing 2B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pickoff_caught_stealing_3b",
    "baseRunningEvent": true,
    "description": "Pickoff Caught Stealing 3B",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "pickoff_caught_stealing_home",
    "baseRunningEvent": true,
    "description": "Pickoff Caught Stealing Home",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "balk",
    "baseRunningEvent": true,
    "description": "Balk",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "forced_balk",
    "baseRunningEvent": true,
    "description": "Disengagement Violation",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "wild_pitch",
    "baseRunningEvent": true,
    "description": "Wild Pitch",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "other_out",
    "baseRunningEvent": true,
    "description": "Runner Out",
  },
  {
    "plateAppearance": false,
    "hit": false,
    "code": "cache_designator",
    "baseRunningEvent": false,
    "description": "Using Cache",
  },
];
