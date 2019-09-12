/* console.log() is npt actually part of the JavaScript programming language, but is actually part of the runtime (e.g.
window object is provided to JS at runtime in a Chrome browser and so is document; Node.js also provides objects and
methods at runtime like process and so forth -- it doesn't provide window or document because that is not needed on
the server-side. Both Chrome and Node provide console object at runtime). To run hello.js script in Node, we type the
command in the terminal: node hello.js.
 */
console.log('Hello World');
