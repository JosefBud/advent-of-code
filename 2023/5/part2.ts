/*

U N F I N I S H E D

*/

// import { int } from '../../util';
// // import { input } from './test-input';
// import { input } from './input';

// /*

// seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4

// */

// enum MapType {
//   SeedToSoil = 'seed-to-soil',
//   SoilToFertilizer = 'soil-to-fertilizer',
//   FertilizerToWater = 'fertilizer-to-water',
//   WaterToLight = 'water-to-light',
//   LightToTemperature = 'light-to-temperature',
//   TemperatureToHumidity = 'temperature-to-humidity',
//   HumidityToLocation = 'humidity-to-location',
// }

// type MapArray = [number, number, number];

// const seeds: [number, number][] = [];
// const maps: Record<MapType, MapArray[]> = {
//   [MapType.SeedToSoil]: [],
//   [MapType.SoilToFertilizer]: [],
//   [MapType.FertilizerToWater]: [],
//   [MapType.WaterToLight]: [],
//   [MapType.LightToTemperature]: [],
//   [MapType.TemperatureToHumidity]: [],
//   [MapType.HumidityToLocation]: [],
// };

// /**
//  * Parse the input into usable maps
//  */

// let currentMap: MapType;
// input.split('\n').forEach((line, idx) => {
//   if (idx === 0) {
//     const parsed = line
//       .split(' ')
//       .map(int)
//       .filter((i) => !isNaN(i));
//     for (let i = 0; i < parsed.length; i += 2) {
//       const start = parsed[i];
//       const len = parsed[i + 1];
//       seeds.push([start, len]);
//     }
//     return;
//   }
//   if (!line) return;
//   const mapLabelCheck = line.split(' ')[0] as MapType;
//   if (Object.values(MapType).includes(mapLabelCheck)) {
//     currentMap = mapLabelCheck;
//     return;
//   }
//   maps[currentMap].push(line.split(' ').map(int) as [number, number, number]);
// });

// const seedMap: number[] = [];
// seeds.forEach(([seedStart, seedLength]) => {
//   let mappedFound = false;
//   let mapped = seed;
//   function mapFinder(map: MapArray, idx: number, arr: MapArray[]) {
//     if (idx === 0) mappedFound = false;
//     if (mappedFound) return;

//     const [dest, src, len] = map;
//     if (mapped <= src + (len - 1) && mapped >= src) {
//       const diff = mapped - src;
//       mapped = dest + diff;
//       mappedFound = true;
//     }
//   }
//   Object.values(maps).forEach((map) => {
//     map.forEach(mapFinder);
//   });
//   seedMap.push(mapped);
// });

// console.log(seedMap.sort((a, b) => a - b)[0]);
