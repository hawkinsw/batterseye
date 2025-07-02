import { PitchData } from "./game.ts";
import { IPitchData } from "./interfaces.ts";

Deno.test("pitch data toString test (using describe)", () => {
  const pd = new PitchData(testingPitchData as IPitchData);
  console.log(pd.toString())
});

const testingPitchData = {
  "startSpeed": 91.0,
  "endSpeed": 83.2,
  "strikeZoneTop": 3.49579631100674,
  "strikeZoneBottom": 1.6600006997653,
  "coordinates": {
    "aY": 28.315333292690802,
    "aZ": -12.39583153521395,
    "pfxX": -3.052109011393518,
    "pfxZ": 11.124788822799417,
    "pX": -0.21181726268502526,
    "pZ": 3.384145301604339,
    "vX0": 4.259751451564046,
    "vY0": -132.49990461729482,
    "vZ0": -4.700938824328874,
    "x": 125.07,
    "y": 147.41,
    "x0": -1.443818018170073,
    "y0": 50.00548330910492,
    "z0": 6.087272193458747,
    "aX": -5.427992183476825,
  },
  "breaks": {
    "breakAngle": 19.2,
    "breakLength": 3.6,
    "breakY": 24.0,
    "breakVertical": -13.7,
    "breakVerticalInduced": 19.3,
    "breakHorizontal": 4.6,
    "spinRate": 2319,
    "spinDirection": 205,
  },
  "zone": 2,
  "typeConfidence": 0.91,
  "plateTime": 0.4133826616258802,
  "extension": 5.920601655164204,
};
