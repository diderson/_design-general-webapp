# _design-general-webapp
This repository defines a general ddoc and ampersand as couchapp design


## Views 

The views folder contains named folder, which will be the name of the view. Each folder can have two javascript files. The `map.js` will be required for each will and will emit the documents that are needed for the views. The `reduce.js` is not required and should just use the build in functions: `_count`, `_sum` and `_stats`.

