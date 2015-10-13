function (doc) {
  var key = doc._id;
  var values = doc;
  if (doc.type === 'yourType') emit(key, values);
} 