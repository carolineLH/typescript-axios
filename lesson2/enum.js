var Color;
(function (Color) {
    Color[Color["Red"] = 1] = "Red";
    Color[Color["green"] = 2] = "green";
    Color[Color["blue"] = 3] = "blue";
})(Color || (Color = {}));
var colorName = Color[2];
console.log(colorName);
