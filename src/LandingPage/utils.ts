export const getImageUrl = (index: number) =>
  `https://www.apple.com/105/media/us/airpods-pro/2022/d2deeb8e-83eb-48ea-9721-f567cf0fffa8/anim/hero/large/${index
    .toString()
    .padStart(4, "0")}.png`;

export const getDanceImageUrl = (index: number) =>
  `https://www.apple.com/105/media/us/airpods-3rd-generation/2021/3c0b27aa-a5fe-4365-a9ae-83c28d10fa21/anim/spatial-audio/large/${index
    .toString()
    .padStart(4, "0")}.jpg`;

export const getDonutImageUrl = (index: number) =>
  `/images/donut/compressed2/${index
    .toString()
    .padStart(4, "0")}.webp`;
