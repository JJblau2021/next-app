const LIGHTNESS = 41;
const LIGHTNESS_STEP = 15;

const primary = {
  hue: 134,
  saturation: 26,
  lightness: LIGHTNESS,
};

const secondary = {
  hue: 46,
  saturation: 61,
  lightness: LIGHTNESS,
};

const tertiary = {
  hue: 199,
  saturation: 21,
  lightness: LIGHTNESS,
};

const quaternary = {
  hue: 169,
  saturation: 39,
  lightness: LIGHTNESS,
};

const main = {
  primary,
  secondary,
  tertiary,
  quaternary,
};

function colors() {
  const colorClasses = ["alt", "main", "light", "lighter"];
  function getColorClass({ hue, saturation, lightness }) {
    return colorClasses.reduce((acc, curr, index) => {
      acc[curr] = `hsl(${hue} ${saturation}% ${
        lightness + LIGHTNESS_STEP * (index - 1)
      }%)`;
      return acc;
    }, {});
  }
  return Object.entries(main).reduce((colorMap, [key, hslValue]) => {
    colorMap[key] = getColorClass(hslValue);
    return colorMap;
  }, {});
}

module.exports = colors();
