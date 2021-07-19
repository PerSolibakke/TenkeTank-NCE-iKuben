export const nextFrame = () =>
  new Promise<void>((resolve) => {
    requestAnimationFrame(() => {
      resolve();
    });
  });

export const normalizeScale = (value: number, min: number, max: number) =>
  (value - min) / (max - min);

export const capitalize = (text: string): string => text.charAt(0).toUpperCase() + text.slice(1);

export const camelCaseToText = (text: string): string =>
  capitalize(text.replace(/([A-Z])/g, ' $1').toLowerCase());

export const generateLightColorHex = ():  string => {
  let color = "#";
  for (let i = 0; i < 3; i++)
    color += ("0" + Math.floor(((0.9 + Math.random()) * Math.pow(16, 2)) / 2).toString(16)).slice(-2);
  return color;
  }