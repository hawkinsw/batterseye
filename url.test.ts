import { MLBUrls } from "./url.ts";
import { None, Some } from "./option.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("simple game pks url test", () => {
  const mlb_urls = new MLBUrls(new URL("https://statsapi.mlb.com"));
  const result = mlb_urls.GamePks(
    new Date(2025, 3, 25),
    new Some(new Date(2025, 4, 25)),
  );
  assertEquals(
    new URL(
      "https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=4/25/2025&endDate=5/25/2025&fields=dates,date,games,gamePk",
    ),
    result,
  );
});

Deno.test("simple game pks url test", () => {
  const mlb_urls = new MLBUrls(new URL("https://statsapi.mlb.com"));
  const result = mlb_urls.GamePks(new Date(2025, 3, 25), new None());
  assertEquals(
    new URL(
      "https://statsapi.mlb.com/api/v1/schedule?sportId=1&startDate=4/25/2025&endDate=4/25/2025&fields=dates,date,games,gamePk",
    ),
    result,
  );
});
