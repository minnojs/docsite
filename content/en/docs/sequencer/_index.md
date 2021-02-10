---
title: Sequencer
weight: 20
description: How to control the flow of your tasks, and everything that has to do with randomization and responsiveness
---

Each task presents a sequence of frames/objects.
In its simplest form the task sequence is an ordered list (an array) of frames (e.g., pages in a questionnaire), and it activates them one after the other.
There are several ways that you can control the sequence order (e.g., random selection of questionnaire questions).
These methods are covered in the [sequencer](sequencer.html) section of this documentation.

When creating your scripts you regularly use API objects (there is a special one for each of the individual task types).
The API helps abstract away a lot of the Javascript that happens behind the scenes.
The [API section](#API.html) gives you the details of using each one of the APIs methods.
If you want, you can also develop your own task types, using Javascript, and simply add them to the sequence of tasks that comprise a study.
