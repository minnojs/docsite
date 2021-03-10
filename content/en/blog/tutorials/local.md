---
title: Develop localy with MinnoJS
linkTitle: Local development
date: 2020-02-01
author: Elad Zlotnick
---

Normally, we run MinnoJS off a remote server, be it the official MinnoJS server, 
[qulatrics](https://minnojs.github.io/minnojs-blog/qualtrics/) or anything else.
This means that there is always a latency between making a change in the MinnoJS script and actually running your study.
When using the server, this is only reflected in the time it takes to save the file, when you are working
with another system it can take a lot longer to save and then upload.
This blog-post is about how to create a local server that will allow you to test your scripts quickly and easily.
You won't be able to save your data, and you should always test any script in the environment that it will 
eventually be run in, but this is a great tool for the initial development process.

In order to run MinnoJS locally you first need a server.
There are many simple options.
If you are looking for easy to install + graphical user interface, I recommend [WAMP](http://www.wampserver.com/en/) for windows and [MAMP](https://www.mamp.info/en/) for Mac.
[Here](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/set_up_a_local_testing_server) are instructions for installing a local development server with python.
And [here](https://gist.github.com/willurd/5720255) is a list of one liners that you can use in your command line.
If you want, you can of course install a much more comprehensive server such as a full fledged [Apache server](https://httpd.apache.org/), but this is most likely an overkill.

Once you have your server running, you are ready to create your local study.
The server will be serving files from a directory on your computer.
Figure out where that directory is and create a folder for your study.
It should precisely reflect the structure of the folder on your remote server (same file names, same directory structure).

Then create a file named `index.html` in your folder.
The activated path (four rows from the bottom) needs to point to your MinnoJS script.
In this case it is pointing to `mgr.js`.

```html
<!doctype html>
<html lang=en>
<head>
    <meta charset=utf-8>
    <!-- Get css -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/minnojs/minno-quest@0.3/dist/main.css" />
</head>
<body>
    <div id="minno-element"></div>
    <!-- Get js -->
    <script src="https://cdn.jsdelivr.net/gh/minnojs/minno-quest@0.3/dist/pi-minno.js"></script>
    <!-- Activate minnoJS -->
    <script>
        var el = document.getElementById('minno-element');
        minnoJS(el, './mgr.js');
    </script>
</body>
</html>
```

The final file structure should look something like this:

<pre>
/study
│   index.html
│   mgr.js
└───/images
    │   flower.jpg
    │   tree.jpg
</pre>

Your study should be available on `localhost/study/` or `localhost:8080/study/`.
