import { Game, Play, PlayEvents, PlayResult, Plays } from "./game.ts";
import { IGameData, IPlay, IPlayResult } from "./interfaces.ts";
import { None, Option, Some } from "./option.ts";
import { MLBUrls } from "./url.ts";

export class GamePk {
  m_pk: string;

  constructor(pk: string) {
    this.m_pk = pk;
  }

  public toString(): string {
    return this.m_pk;
  }
}

function ParseRawGame(raw: IGameData): Game {
  const ld = raw.liveData;

  const plays = ld.plays.allPlays.map((v: IPlay) => {
    console.log(`${v.result.type} became ${v.result.event}`);

    const play_events = v.playEvents;

    return new Play(
      new PlayResult(v.result as IPlayResult),
      new PlayEvents(play_events),
    );
  });

  const currentPlay = new Play(
    new PlayResult(ld.plays.currentPlay.result as IPlayResult),
    new PlayEvents(ld.plays.currentPlay.playEvents),
  );
  return new Game(new Plays(plays, currentPlay));
}

export class GUMBO {
  /*
   * Keep track of the base Gameday server.
   */
  urls: MLBUrls;

  public constructor(u: URL) {
    this.urls = new MLBUrls(u);
  }

  public async getGame(game: GamePk): Promise<Game> {
    const url = this.urls.Game(game);

    const result = await fetch(url);

    const result_body = await result.text();

    return ParseRawGame(JSON.parse(result_body));
  }

  public static GameFromRaw(raw_game: unknown): Game {
    return ParseRawGame(raw_game as IGameData);
  }

  public async getGamePks(
    start: Date,
    stop: Option<Date>,
  ): Promise<Option<Array<GamePk>>> {
    const url = this.urls.GamePks(start, stop);
    const fetch_result = await fetch(url);
    if (!fetch_result.ok) {
      return new None();
    }
    const json_result = await fetch_result.json();

    interface PkGameResultItem {
      gamePk: string;
    }

    interface PkDateResultItem {
      date: Date;
      games: Array<PkGameResultItem>;
    }

    const pk_results = json_result.dates as Array<PkDateResultItem>;

    return new Some(
      pk_results.reduce((acc: Array<GamePk>, current: PkDateResultItem) => {
        return acc.concat(current.games.map((v) => {
          return new GamePk(v.gamePk);
        }));
      }, []),
    );
  }
}
