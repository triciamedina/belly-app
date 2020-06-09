export const getRandomColor = () => {
    const colors = { 'pink': '#ca03a3', 'light-blue': '#027cac', 'light-purple': '#9443bb', 'orange': '#dd3326', 'purple': '#8459A0', 'blue': '#405cf7' };
    const min = Math.ceil(0);
    const max = Math.floor(5);
    return Object.entries(colors)[Math.floor(Math.random() * (max - min + 1)) + min][1];
};

export const invertColor = (hex, isBW=true ) => {
    if (hex.indexOf('#') === 0) {
      hex = hex.slice(1)
    }
    // convert 3-digit hex to 6-digits.
    if (hex.length === 3) {
      hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
    }
    if (hex.length !== 6) {
      return hex
    }
    var r = parseInt(hex.slice(0, 2), 16),
      g = parseInt(hex.slice(2, 4), 16),
      b = parseInt(hex.slice(4, 6), 16)
    if (isBW) {
      return (r * 0.299 + g * 0.587 + b * 0.114) > 186
        ? '#000000'
        : '#FFFFFF'
    }
    r = (255 - r).toString(16)
    g = (255 - g).toString(16)
    b = (255 - b).toString(16)
    return `#${r.padStart(2, '0')}${g.padStart(2, '0')}${b.padStart(2, '0')}`
};