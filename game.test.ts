import { GUMBO } from "./gumbo.ts";
import { testable_game_raw } from "./gumbo.test.ts";
import { zip } from "./utils.ts";
import { assertEquals } from "jsr:@std/assert/equals";

Deno.test("Test ability to filter events into pitches.", async () => {
  const result = await GUMBO.GameFromRaw(testable_game_raw);

  const expected_pitch_counts = [
    6,
    5,
    2,
    2,
    3,
    2,
    5,
    5,
    1,
    5,
    2,
    4,
    1,
    2,
    6,
    6,
    2,
    5,
    3,
    5,
    2,
    2,
    5,
    2,
    1,
    2,
    5,
    5,
    3,
    4,
    4,
    3,
    3,
    4,
    4,
    1,
    6,
    4,
    5,
    2,
    5,
    5,
    2,
    6,
    1,
    6,
    2,
    6,
    4,
    4,
    1,
    2,
    5,
    4,
    6,
    6,
    2,
    6,
    2,
    1,
    5,
    5,
    4,
    2,
    1,
  ];

  zip(result.liveData.allPlays, expected_pitch_counts).forEach(
    ([actual, expected]) => {
      assertEquals(actual.events.pitches().length, expected);
    },
  );
});
