# client

## app.js

Strating point for your app. Initialize your main views/viewSwitcher here and also the router. 

## index.html

This is where all the content of the web application will be defined and styled.

## views

Will contain the views that are needed for the app. Views will handle click events, model bindings. They should always have a template and should be initialised on an element. Main views should be initialised within the `app.js`

## models

Models will and should be used to handle the data that is needed for a view. So you should always have one model for one view. Models will contain at least one property `props`. This will be the object where all the properties should be defined. 

Derived properties (also known as computed properties) are properties of the state object that depend on other properties (from `props`, `session`, or even `derived`) to determine their value.