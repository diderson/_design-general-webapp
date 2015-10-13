function(doc, req) {
  if (!doc){
    return [null, {
      'code': 400,
      'json': {
        'error': 'missed',
        'reason': 'no document to update'
      }
    }];
  } else {
    doc.ingredients.push(req.body);
    return [doc, {'json': {'status': 'ok'}}];
  }
}