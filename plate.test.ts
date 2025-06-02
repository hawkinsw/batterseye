import { assertEquals } from "jsr:@std/assert";
import { DefaultPlateZone, PlateZones } from "./plate.ts";

Deno.test("simple get plate zones test", () => {
  const zones = PlateZones();
  assertEquals(
    "Strike - Middle - Middle (5)",
    zones.zoneFromId(5).orValue(DefaultPlateZone()).toString(),
  );
});
