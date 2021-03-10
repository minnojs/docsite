---
title: Yoking participants (seeded randomization)
linkTitle: Yoking participants
date: 2019-12
author: Elad Zlotnick
---

Most of the time we want randomization to be fully random.
In some cases it is usefull to yoke pairs of participants together so that they each recieve the same randomization.
MinnoJS does not (yet) support this out of the box, but it is fairly easy to implement using a [pseudorandom number generator (PRNG)](https://en.wikipedia.org/wiki/Pseudorandom_number_generator).
The PRNG allows us to create a series of random numbers depending on an initial seed.
This means that if we can pass a seed to the player (via [query string](https://en.wikipedia.org/wiki/Query_string)), we can generate the same randomization for a pair of participants.

Therefore we need to:

1. Put together a pseudorandom number generator
2. Seed it from the url 
3. Shuffle the sequence

There are many PRNGs to choose from, for this blog we will use sfc32 which is both one of the fastest and highest quality PRNGs implemented in Javascript.
PRNGs typically need a separate algorithm to generate a seed with sufficient entropy.
This is best achieved by a hashing algorithm, in our case xmur3.
(The implementations for both come from [here](https://stackoverflow.com/a/47593316/1400366)).

The following function returns a seeded random number generator that returns a random number between zero and one.
This behaves the same as the equivalent native Javacript function [Math.random](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random).

```js
function generatePRNG(seedStr){
    // Create xmur3 state:
    var seed = xmur3(seedStr+''); // make sure that seed is string

    // Output four 32-bit hashes to provide the seed for sfc32.
    return  sfc32(seed(), seed(), seed(), seed());

    // seed generator
    function xmur3(str) {
        for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++)
            h = Math.imul(h ^ str.charCodeAt(i), 3432918353),
            h = h << 13 | h >>> 19;
        return function() {
            h = Math.imul(h ^ h >>> 16, 2246822507);
            h = Math.imul(h ^ h >>> 13, 3266489909);
            return (h ^= h >>> 16) >>> 0;
        };
    }

    // PRNG
    function sfc32(a, b, c, d) {
        return function() {
            a >>>= 0; b >>>= 0; c >>>= 0; d >>>= 0; 
            var t = (a + b) | 0;
            a = b ^ b >>> 9;
            b = c + (c << 3) | 0;
            c = (c << 21 | c >>> 11);
            d = d + 1 | 0;
            t = t + d | 0;
            c = c + t | 0;
            return (t >>> 0) / 4294967296;
        }
    }
}
```

The next step is seeding the PRNG.
We assume that a url parameter has been passed to the player (something like *mydomain.com/player?yoke=213*).
MinnoJS v0.3 has a utility to help us get url parameters, and so we have a one liner here.
If you are using an older version you can get the parameter yourself
([see here](https://stackoverflow.com/questions/979975/how-to-get-the-value-from-the-get-parameters)).

```js
var rand = generatePRNG(global.$url.yoke));
```

We now need a method to randomize the order of an array of objects.
The obvious candidate is the [fisher-yates shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle).
Following is a Javascript implementation (from [here](https://stackoverflow.com/a/2450976/1400366)).
Note that instead of using `Math.random` we use `rand()` which is a call to our PRNG.

```js
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(rand() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
```

And now we have the tools to randomize to our hearts content.
The following is a contrieved example, your use case is probably more involved.

```js
var sequence = shuffle([
    {inherit: 'task1'},
    {inherit: 'task2'},
    {inherit: 'task3'},
    {inherit: 'task4'}
]);
```
