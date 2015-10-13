# _design-general-webapp
This repository defines a general ddoc and ampersand as couchapp design


## Views 

The views folder contains named folder, which will be the name of the view. Each folder can have two javascript files. The `map.js` will be required for each will and will emit the documents that are needed for the views. The `reduce.js` is not required and should just use the build in functions: `_count`, `_sum` and `_stats`.

## Updates

The updates folder will contain the update handlers. That can be used to update, create savely (new) documents. So the user don't have to take care about revision numbers, even if there are concurrent requests. The function will always get two parameters (`doc` and `request`). While the `doc` will be the one that is called via `/_updates/[:_id of the docuemnt]`. The update function should **always** return an array, e.g. `[ new saved document, response]`. 

## Rewrites

Rewrites will build the API paths and redirect calls to the right place within your design document. They can also be used to redirect calls to different databases. A rewrite rule should always contain a `from` and `to` property. Wildcards can also be used, e.g. `/doc/:_id` can be redirected to `/:_id`. All requests will go through this rewrites so it's always a good idea to add a general rewriting rule.

## validate_doc_update

All `POST`, `PUT` and `DELETE` calls will go through the `validate_doc_update.js` automatically. This function will get four paramaters (`newDoc`, `oldDoc`, `userCtx` and `secObj`). 

**newDoc**

The given document.

**oldDoc**

Will be empty if it is a new one, otherwise the current document

**userCtx**

The object that will be return via `/session`, e.g.
```json
{
  "userCtx":{"name":"userName","roles":["_admin","otherRole"]}
}
```

**secObj**

Return the database security object (`/_security`). 

The `validate_doc_update.js` should be used to validate documents, if there are correclty structured and if the user have the right role/right to do the action. 