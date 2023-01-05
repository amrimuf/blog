export const alexandriaFontLoader = (weight: string) =>
fetch(`https://amri.tech/font/Alexandria-${weight}.ttf`.toString()).then((res) => res.arrayBuffer())