function (newDoc, oldDoc, userCtx, secObj) {
  
  if(newDoc._deleted === true) {
    if (userCtx.roles.indexOf('_admin') !== -1 || secObj.admins.names.indexOf(userCtx.name) !== -1 )
      return;
    else 
      throw({forbidden : 'Only admins may delete documents.'});
  }

  var tv4 = require('commonjs_libs/tv4')
  tv4 = tv4.freshApi() //new instance
  var schemata = this.schemata
  if(!tv4 || !schemata) {
    throw({forbidden : 'Internal error: the initialization of the schema validaton has failed'})
  }

  try {
    //load schemata into tv4
    for(name in schemata) {
      if(!schemata.hasOwnProperty(name)) continue
      tv4.addSchema(name,schemata[name])
    }

    //test whether any referenced schema definition is missing
    var missing_schemata = tv4.getMissingUris()
    if (missing_schemata.length > 0)
      throw('Missing schema(ta): ' + missing_schemata.join())

    //validate data against schema
    var checkRecursive = false
    var banUnknownProperties = true
    var result = tv4.validateResult(newDoc, schema, checkRecursive, banUnknownProperties)
  } catch (ex) {
    delete ex.stack
    throw({forbidden : 'Internal error: ' + JSON.stringify(ex, null, '  ')})
  }

  if(result.valid !== true)
    throw({forbidden : result.error.dataPath + ': ' + result.error.message})


}