# _design-general-webapp
This repository defines a general ddoc and ampersand as couchapp design


## Views 

The views folder contains named folder, which will be the name of the view. Each folder can have two javascript files. The `map.js` will be required for each will and will emit the documents that are needed for the views. The `reduce.js` is not required and should just use the build in functions: `_count`, `_sum` and `_stats`.

## Updates

The updates folder will contain the update handlers. That can be used to update, create savely (new) documents. So the user don't have to take care about revision numbers, even if there are concurrent requests. The function will always get two parameters (`doc` and `request`). While the `doc` will be the one that is called via `/_updates/[:_id of the docuemnt]`. The update function should **always** return an array, e.g. `[ new saved document, response]`. 
## Rewrites

Rewrites will build the API paths and redirect calls to the right place within your design document. They can also be used to redirect calls to different databases. A rewrite rule should always contain a `from` and `to` property. Wildcards can also be used, e.g. `/doc/:_id` can be redirected to `/:_id`. All requests will go through this rewrites so it's always a good idea to add a general rewriting rule.