---
title: Settings
weight: 3
---

Settings allow you to control the generic way that the player works.
Change the settings using the `addSettings` function. 
The first argument to the function is always the name of the setting, the second argument is the setting values. 
In case the setting is an object, subsequent objects will extend each other so that settings may be progressively added.

All the functions within settings are invoked using angular. 
This means that you have access to any service you like, as well as some specific assets. 
[In order to access the services](https://docs.angularjs.org/api/auto/service/$injector) simply use arguments with the appropriate name. 
For instance, this is how you would access `$rootScope`:

```javascript
function onEnd($rootScope){
    $rootScope.$emit('end!!');
}
```

## canvas
`canvas` takes an object that describes the style of the task environment. Each property of the object changes a different style element.

Property            | Changes
-------             | -----------
background          | The overall background color.
canvasBackground    | Default canvas background color.
fontColor           | Default font color.
fontSize            | Default font size.

```javascript
API.addSettings('canvas', {
    fontSize: '2em'
});
```

In case you need to fine tune the styles even further you can add css rules into the raw HTML. Support for dynamically adding CSS is planned but not yet supported.

## injectStyle
Injects a string of css into the page.

```javascript
API.addSettings('injectStyle', '[pi-quest] label {font-size:1.2em; font-weight:normal;}');
```

## onPreTask
`onPreTask` is a function to be called before each task is called.

```javascript
API.addSettings('onPreTask', function(currentTask){
    doSomethingWith(currentTask);
});
```

Asset       | Description
-------     | -----------
currentTask | The current task object
prevTask    | The previous task object (this may be used as a post task action as well...)

## onEnd
`onEnd` is a function to be called as soon as the task sequence ends.

```javascript
API.addSettings('onEnd', function(){
    // Do something: for instance, redirect to 'my/url.js'
    location.href = 'my/url.js';
});
```

Asset       | Description
-------     | -----------
currentTask | The current (last) task object

## title
`title` is a string to be used as the page title (the name displayed on the tag).

```javascript
API.addSettings('title', 'My Manager Title');
```

## preloadImages
Accepts an array of image urls to preload. The manager will **not** wait until all images are loaded, but it will make images displayed later in the manager sequence be displayed significantly faster.

```javascript
API.addSettings('preloadImages', ['my/image/url/imageName.png', 'my/other/url/otherImage.jpg']);
```

## skip
Whether to activate the skip and refresh option. If activated, clicking `ctrl r` reloads the current task (this feature may not be supported on older browsers), clicking `escape` and then the right or left arrows skips to the next or previous tasks.

```javascript
API.addSettings('skip', true);
```

## skin
Add a skin to your project. Skins change the way that your tasks look. Currently the only skins that we support are `simple` and `demo`.

```javascript
API.addSettings('skin', 'demo');
```

## rtl
Setting rtl to `true` will change the layout of the player to right to left in order to ocomodate right to left languages such as arabic and hebrew.

```javascript
API.addSettings('rtl', true);
```

## logger
The logger allows control of logging activities.

Folowing are the properties available for the logger:

property    | description 
----------- | -----------
url         | The url to send to. If it is not set, data will not be sent.
type        | The strategy to use for sending logs to the server. See options below.
pulse       | Allows you to post your data in pulses of "pulse" logs instead of all at the end of the task (Does not work for csv logger).

```javascript
API.addSettings('logger', {
    url: '/manager/data',
    type:'new',
    pulse: 20
});
```

By deafault the logger posts according to the Project Implicit server rules (old).
You can change the logging style by setting the logger `type` as follows:

type    | description
------- | -----------
old     | Uses the post strategy implemented by the old PI server
new     | Uses the post strategy implemented by the new server  
csv     | Posts all data as CSV at the end of the manager. If you are creating a manager that does not fully complete (for instance, when you have a message as your last page), use the postCSV task in addition to settings the log type to csv.
debug   | Logs all posts to the console. Do not do this in production! These logs aren't posted to the server at all!

You can change the logging strategy or even create new strategies.
Doing this is rather advanced and is documented [here](https://github.com/minnojs/minno-quest/blob/0.2/src/taskManager/logger/readme.md).

## DEBUG
The `DEBUG` settings allows you to control the debug messages produced by the player.
In the development environment (when `window.DEBUG` is set to `true`) you have access to a development console.
The console will hold messages describing the process of your studies.

At the top of the console window you will see a dropdown that allows you to select the level of logging you would like to see.
For example, you may want to be alerted only of errors, or of every possible activity of the player.
In addition you have a button that allows you to close and open the console.

Property    | Description
----------- | -------------
hideConsole | (true or false) hide console activity

```javascript
API.addSettings('DEBUG', { hideConsole: true});
```
