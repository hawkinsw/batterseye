import { PlayResultEvent, PlayResultEvents } from "./event.ts";
import { assertEquals } from "jsr:@std/assert";

Deno.test("simple event type test (cached)", () => {
  const result = PlayResultEvents();

  assertEquals(
    "Using Cache (cache_designator)",
    `${
      result.eventFromKey("cache_designator").orValue(
        new PlayResultEvent("fail", "fail"),
      )
    }`,
  );
});

Deno.test("simple event type test (not cached)", () => {
  const result = PlayResultEvents();

  assertEquals(
    "Double (double)",
    `${
      result.eventFromKey("double").orValue(new PlayResultEvent("fail", "fail"))
    }`,
  );
});
