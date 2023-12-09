import { int } from '../../util';
// import { input } from './test-input';
import { input } from './input';

enum MapType {
  SeedToSoil = 'seed-to-soil',
  SoilToFertilizer = 'soil-to-fertilizer',
  FertilizerToWater = 'fertilizer-to-water',
  WaterToLight = 'water-to-light',
  LightToTemperature = 'light-to-temperature',
  TemperatureToHumidity = 'temperature-to-humidity',
  HumidityToLocation = 'humidity-to-location',
}

type MapArray = [number, number, number];

const seeds: number[] = [];
const maps: Record<MapType, MapArray[]> = {
  [MapType.SeedToSoil]: [],
  [MapType.SoilToFertilizer]: [],
  [MapType.FertilizerToWater]: [],
  [MapType.WaterToLight]: [],
  [MapType.LightToTemperature]: [],
  [MapType.TemperatureToHumidity]: [],
  [MapType.HumidityToLocation]: [],
};

/**
 * Parse the input into usable maps
 */

let currentMap: MapType;
input.split('\n').forEach((line, idx) => {
  if (idx === 0) {
    seeds.push(
      ...line
        .split(' ')
        .map(int)
        .filter((i) => !isNaN(i)),
    );
    return;
  }
  if (!line) return;
  const mapLabelCheck = line.split(' ')[0] as MapType;
  if (Object.values(MapType).includes(mapLabelCheck)) {
    currentMap = mapLabelCheck;
    return;
  }
  maps[currentMap].push(line.split(' ').map(int) as [number, number, number]);
});

const seedMap: number[] = [];
seeds.forEach((seed) => {
  let mappedFound = false;
  let mapped = seed;
  function mapFinder(map: MapArray, idx: number, arr: MapArray[]) {
    if (idx === 0) mappedFound = false;
    if (mappedFound) return;

    const [dest, src, len] = map;
    if (mapped <= src + (len - 1) && mapped >= src) {
      const diff = mapped - src;
      mapped = dest + diff;
      mappedFound = true;
    }
  }
  Object.values(maps).forEach((map) => {
    map.forEach(mapFinder);
  });
  seedMap.push(mapped);
});

console.log(seedMap.sort((a, b) => a - b));
