---
title: Interactions
weight: 20
description: Creating interactivity
---

This is where you will have to carefully describe exactly what you want MinnoJS to *do*.
You can treat it as a set of if-then pairs that drive the trial.
For example, you can define an interaction so that "**if** the space key is pressed" (condition), "**then** display target stimulus" (action).
Or another one so that "**if** a timer triggers" (condition), "**then** end the trial" (action).

```javascript
{
    interaction: [
        interaction1,
        interaction2
    ]
}
```

The `interactions` array interaction-objects.
Each of these objects has two properties: `conditions` and `actions`.
`conditions` are a set of propositions that have to *all* be true in order for respective set of `actions` to be executed.

```javascript
{
    conditions: [
        condition1,
        condition2
    ],
    actions: [
        action1,
        action2
    ]
}
```
