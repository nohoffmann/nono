export const hexToRgb = (color: string) => (Array.from(
      color
        .split('#')[1]
        .matchAll(/[0-9a-f]{2}/g)
    ))
      .map(component => parseInt(component[0], 16))
      .join(',');
