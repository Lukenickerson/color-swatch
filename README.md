# Color Swatch

* Created for a coding exercise, originally in https://jsfiddle.net/luken/xoy83pj5/192/
* Designed to use progressive enhancement to add a UI to an existing `<select>` element.
* Fully functional, but lacking unit tests, validation, responsive styling, accessibility, and cleaning-up of events.
* **Try it out:** https://lukenickerson.github.io/color-swatch/example.html

## How to Use

See the `example.html` file for an example of how to use.

1. Include `ColorSwatch.js` and `color-swatch.css` files with your project. Note that the js file is setup as an ES6 module, so it will need to be properly imported.
   * Example: `<script src="./ColorSwatch.js" type="module"></script>`
   * Example: `import ColorSwatch from './ColorSwatch.js';`
2. Add a `<select>` element that has `<option>` elements with values of the hex color codes you want in your palette. Make sure the `select` element has an ID or class to use as a selector.
   * Example: `<select id="swatch-1"><option value="#000000">Black</option></select>`
3. Create an instance of `ColorSwatch` with the selector as the first param.
   * Example: `const mySwatch = new ColorSwatch('#swatch-1');`
4. Call the `init` method. Example: `mySwatch.init();`
5. Once the DOM is ready, some additional elements and events will be added, and the color swatch should be functional. Repeat 2-4 if you want multiple swatches on one page.

## Contributing, Further Development

If anyone finds this useful enough to use in production, then feel free to submit fixes or new features. 
... or submit issues here, and I may expand on the basic functionality.



