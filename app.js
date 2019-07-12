$(document).ready(() => {
    console.log('Document ready');
    fetch("https://api.noopschallenge.com/hexbot/")
        .then((resp) => resp.json())
        .then((data) => {
            $('#colour').css('background-color', data.colors[0].value);;
            console.log(`"${data.colors[0].value}"`);
            let r = Number($('#colour').css('background-color').match(/\d+/g)[0]),
                g = Number($('#colour').css('background-color').match(/\d+/g)[1]),
                b = Number($('#colour').css('background-color').match(/\d+/g)[2])
            $('#complimentary').css('background-color', oppositeHSL(RGBToHSL(r, g, b)))
            $('#between').css('background-color', betweenHSL(RGBToHSL(r, g, b)))
            console.log($('#colour').css('background-color'));
            console.log($('#complimentary').css('background-color'));
            console.log($('#between').css('background-color'));
        })
})

function RGBToHSL(r, g, b) {
    // Make r, g, and b fractions of 1
    r /= 255;
    g /= 255;
    b /= 255;
    // Find greatest and smallest channel values
    let cmin = Math.min(r, g, b),
        cmax = Math.max(r, g, b),
        delta = cmax - cmin,
        h = 0,
        s = 0,
        l = 0;
    // Calculate hue
    // No difference
    if (delta == 0)
        h = 0;
    // Red is max
    else if (cmax == r)
        h = ((g - b) / delta) % 6;
    // Green is max
    else if (cmax == g)
        h = (b - r) / delta + 2;
    // Blue is max
    else
        h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    // Make negative hues positive behind 360°
    if (h < 0)
        h += 360;
    // Calculate lightness
    l = (cmax + cmin) / 2;

    // Calculate saturation
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    // Multiply l and s by 100
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    console.log("hsl(" + Math.floor(h) + "," + Math.floor(s) + "%," + Math.floor(l) + "%)");
    return ("hsl(" + Math.floor(h) + "," + Math.floor(s) + "%," + Math.floor(l) + "%)");
}

function oppositeHSL(HSL) {
    let h = (parseFloat(HSL.match(/\d+/g)[0]) + 180),
        s = parseFloat(HSL.match(/\d+/g)[1]),
        l = parseFloat(HSL.match(/\d+/g)[2]);
    if (h > 360) {
        h -= 360;
    };
    console.log("hsl(" + Math.floor(h) + "," + Math.floor(s) + "%," + Math.floor(l) + "%)");
    return ("hsl(" + Math.floor(h) + "," + Math.floor(s) + "%," + Math.floor(l) + "%)");
}

function betweenHSL(HSL) {
    let h = (parseFloat(HSL.match(/\d+/g)[0]) + 90),
        s = parseFloat(HSL.match(/\d+/g)[1]),
        l = parseFloat(HSL.match(/\d+/g)[2]);
    if (h > 360) {
        h -= 360;
    };
    console.log("hsl(" + Math.floor(h) + "," + Math.floor(s) + "%," + Math.floor(l) + "%)");
    return ("hsl(" + Math.floor(h) + "," + Math.floor(s) + "%," + Math.floor(l) + "%)");
}