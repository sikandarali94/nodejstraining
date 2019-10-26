/* The below code will log 'Starting', then it will log 'Stopping', and then after two seconds it will log '2 Second
Timer'. This is because Node.js is non-blocking, meaning it can do other things while it waits for asynchronous calls to
resolve (in the case below, Node did not stop at the setTimeout() method but logged 'Stopping' while it was waiting for
the setTimeout() method to resolve). */

// console.log('Starting');
//
// setTimeout(() => {
//     console.log('2 Second Timer');
// }, 2000);
//
// console.log('Stopping');

/* In the code below, it will execute the console.log() statements first and then execute the setTimeout() methods in
the order that they resolved. This is because JS first executes the main execution stack first and then looks at the
event queue to see if any event has fired; if the event has fired (in our case, the setTimeout expiring event) then JS
will run the code of the callback function associated with that event (in our case, it is the console.log() statements
inside the callback functions of the setTimeout() methods). */
console.log('Starting');

setTimeout(() => {
    console.log('2 Second Timer');
}, 2000);

setTimeout(() => {
    console.log('0 Second Timer');
}, 0);

console.log('Stopping');