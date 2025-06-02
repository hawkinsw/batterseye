import { GamePk } from "./gumbo.ts";
import { Option } from "./option.ts";

function toMLBDate(d: Date): string {
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
}

export class MLBUrls {
  m_base: URL;
  constructor(u: URL) {
    this.m_base = u;
  }

  public GamePks(start: Date, end: Option<Date>): URL {
    const start_mlbdate = toMLBDate(start);
    const end_mlbdate = toMLBDate(end.orValue(start));

    return new URL(
      this.m_base +
        `api/v1/schedule?sportId=1&startDate=${start_mlbdate}&endDate=${end_mlbdate}&fields=dates,date,games,gamePk`,
    );
  }

  public Game(game_pk: GamePk): URL {
    return new URL(this.m_base + `api/v1.1/game/${game_pk}/feed/live`);
  }

  public EventTypes(): URL {
    return new URL(this.m_base + `api/v1/eventTypes/`);
  }
}
