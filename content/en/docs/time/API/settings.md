---
title: Settings
weight: 10
description: Control global settings of minno-time
---

Player wide settings are set within the "settings" property of the task JSON.
```javascript
settings = {
    logger: {
        url: 'your/target/url',
        logger: function(){
            // do your mojo here :)
        }
    },
    canvas: {
        maxWidth: 800,
        proportions : 1
    }
}
```

#### Logger

```javascript
logger: {
    url: 'your/target/url',
    pulse: 3,
    fullpath: false,
    logger: function(){
        // do your mojo here :)
    }
}
```

The logger section is responsible for logging options.

`url`:
Is the url to which we send the logged data (ask your IT team what it should be). You should set this if you want to log your data...

`pulse`:
After how many rows should we send data to the server.
In case the number of rows is reached during a trial, the player waits until the end of the trial and sends all the log rows it gathered at once.
Regardless of pulse, the player sends all remaining log rows at the end of the task.
This means that it is possible to get pulses holding more or less than "pulse" rows.
If pulse is not set (or is set to 0) the player will send all data at the end of the task.

`fullpath`:
When using the media path to log media elements (for images and templates), should we use the full path or just the filename (`false` by default)

`meta`:
An object that is used to extend each logged row. This is useful in case you want to add some global data to the posts (such as server generated user id, or task name).

`logger`:
Accepts a function to replace the existing logging function. (don't touch this if you don't **realy** know what you're doing).
The logger function is called each time a log action is triggered (see interactions: actions [log](#interactions-actions)).
It is responsible for adding a logging row to be sent to the server.

```javascript
function(trialData, inputData, actionData,logStack){
    // trialData: the data object from this trial
    // inputData: the input object that triggered this action
    // actionData: the action object that was triggered (it should look like {type:'log', your:'custom property'})
    // logStack: an array with all previously logged rows

    // the context for this function ("this") is the original trial object

    // the function should return an object to be pushed into the trial stack, and later be sent to the server
}
```

This is what the default logger looks like:
```javascript
function(trialData, inputData, actionData,logStack){
    var stimList = this._stimulus_collection.get_stimlist();
    var mediaList = this._stimulus_collection.get_medialist();

    return {
        log_serial : logStack.length,
        trial_id: this._id,
        name: this.name(),
        responseHandle: inputData.handle,
        latency: Math.floor(inputData.latency),
        stimuli: stimList,
        media: mediaList,
        data: trialData
    };
};
```

#### Canvas

The canvas section is responsible for the overall look of the player.
It controls the shape and appearance of the canvas.

```javascript
canvas: {
    maxWidth: 800,
    proportions : 0.8
}
```

`width`:
If width is set, then the canvas size is set to a constant width (set the hight using the `proportions` property).

`maxWidth`:
The maximum width (in pixels) that the canvas may reach. By default it is set to 500px (note that if `width`  is set, then this property is ignored and the canvas size stays static).

`proportions`:
Responsible for the shape of the canvas. You can set it either as a number or an object. By default it is set to `0.8`.
* `{width:2,height:3}`
* `1.5` calculated as height/width

`textSize`:
Controls the default font size in the canvas. It takes a single number that represents font size in percentage of the canvas height (similar to the CSS3 `vh` unit). By default it is set to 3. Any fontSize within your script that uses a relative unit (percent/em) will be relative to this size. Any fontSize that uses an absolute unit (px/pt) will ignore it.

`background`:
Controls the background color of the whole screen.

`canvasBackground`:
Controls the background color of the player canvas.

`borderWidth`:
Controls the width of the player canvas borders (in pixels).

`borderColor`:
Controls the color of the player canvas borders.

`css`:
Allows you to add any custom css to the canvas (using the jquery css [API](http://api.jquery.com/css/)).

#### Base_url

The `base_url` section is responsible for loading images and templates. It allows the user to pick a base url from which to load all images and templates.
It accepts either an object setting the base url for images and templates or a string that will be used for both images and templates:
```javascript
// object notation
base_url: {
    image: "images",
    template: "templates/"
}

// string notation
base_url: "media/"
```

#### Redirect

The redirect setting decides where to redirect the player at the end of the task.
By default, the player simply refreshes the current page.
This option is not used if the endTask hook is set.

```javascript
redirect: '//my.domain.edu'
```

#### Hooks
Hooks are functions that are to be run at predefined points throughout the player.

```javascript
hooks: {
    endTask: function(){}
}
```

`endTask`:
Called at the end of the task instead of the default redirect.

#### onEnd
Called at the end of the task instead of the default redirect.
This function is a more standart complient version of `hooks.endTask`.


#### Meta data

Meta data is data that should be returned with every request to the server.
Any key value pair in the meta data is added to every post the player makes to the server.
In order to create a post with three keys: json, session_id and task_id - you would write something like this:

```javascript
metaData: {
    session_id: 9872356,
    task_id: '43BTW78'
}
```

(the json field is the field that holds the player data it is created automaticaly)
