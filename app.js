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
inside the callback functions of the setTimeout() methods).

JS has something called a call stack which keeps track of the execution of our program by keeping track of all of the
functions that are currently running. JS has a main, invisible function called main() and when this invisible function
is completed, that leaves the call stack empty and the main application has been fully executed. When an event fires in
Node.js, the callback function associated with the event gets added to something called a callback queue. The job of the
callback queue is to maintain a list of all of the callback functions that are ready to execute. The event loop looks at
the call stack first, and if it is empty, then runs items from the callback queue. The way the items in the callback
queue run is that they are added to the call stack in the order that they entered the queue.

Please note: setTimeout() is not a part of the JS programming language. We are not going to find its definition anywhere
in the JS spec and V8 has implementation for it. Instead, NodeJS creates an implementation of setTimeout() using C++ and
provides
it to our JS scripts to use. When we call setTimeout(), it is really registering an event with NodeJS API along with the
callback function. While JS is single-threaded, Node behind the scenes uses other threads in C++ to manage our events.
That's what allows us to continue running our application while asynchronous stuff is happening simultaneously, making
it non-blocking as it does not block the rest of the app from running. */
console.log('Starting');

setTimeout(() => {
    console.log('2 Second Timer');
}, 2000);

setTimeout(() => {
    console.log('0 Second Timer');
}, 0);

console.log('Stopping');