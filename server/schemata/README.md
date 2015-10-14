## Schemata folder

Add here all needed [JSON schema files](http://json-schema.org/documentation.html). They will be used by the `validate_doc_update.js` to check, if all documents are well formed. 
A typical schema may look like: 

```js
// Schema for a microformat address
{
  "$schema": "http://json-schema.org/draft-04/schema#",
  "description": "An Address following the convention of http://microformats.org/wiki/hcard",
  "type": "object",
  "properties": {
    "post-office-box": { "type": "string" },
    "extended-address": { "type": "string" },
    "street-address": { "type": "string" },
    "locality":{ "type": "string" },
    "region": { "type": "string" },
    "postal-code": { "type": "string" },
    "country-name": { "type": "string"}
  },
  "required": ["locality", "region", "country-name"],
  "dependencies": {
    "post-office-box": ["street-address"],
    "extended-address": ["street-address"]
  }
}
```