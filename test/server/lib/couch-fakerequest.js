var fs = require('fs');
/**
 * Globals used by the CouchDB JS view server
 */

var noop = function () {};

send   = typeof send   !== 'undefined' ? send:   noop,
start  = typeof start  !== 'undefined' ? start:  noop,
getRow = typeof getRow !== 'undefined' ? getRow: noop,
log    = typeof log    !== 'undefined' ? log:    noop,
emit   = typeof emit   !== 'undefined' ? emit:   noop;

/**
 * Creates a function from a file.
 *
 * @param {string} file - the hole path to the file (can be relative)
 */

exports.createFunctionFromFile = function (file) {
    var content = fs.readFileSync(file).toString();
    return this.createFunction(content);
}

/**
 * Creates a function from a string.
 *
 * @param {string} content - the string representation of the 
 *                           function to be created
 */

exports.createFunction = function (content) {
    if (content.length == 0) return null;
    var startIndexParams = content.indexOf('(')
      , endIndexParams = content.indexOf(')')
      , startIndexBody = content.indexOf('{')
      , endIndexBody = content.lastIndexOf('}')
      , stringparams = content.slice(startIndexParams+1, endIndexParams)
      , body = content.slice(startIndexBody+1, endIndexBody);
    // need module require in the global scope
    var result = new Function(stringparams.split(','),body);
    return result;
}

/**
 * Run show function. The response will always be converted to an
 * object, if a string is returned the object will be {body: <string>}
 *
 * @param {Function} showfn - the show function to call
 * @param {Object} doc - the JSON doc to pass to the show function
 * @parma {Object} req - the request object to pass to the show function
 */

exports.show = function (showfn, doc, req) {
    if (typeof showfn !== "function") {
        showfn = this.createFunctionFromFile(showfn);
    }
    var val = showfn(doc, req);
    if (!(val instanceof Object)) {
        return {body: val};
    }
    return val;
};


/**
 * Run list function. Converts the JSON returned from a view into a
 * head object to pass to the list function and hooks up the global
 * getRow function to shift values off the rows property.
 *
 * @param {Function} listfn - the list function to call
 * @param {Object} viewdata - data returned by the view to use
 * @param {Object} req - the request object to pass to the list function
 */

exports.list = function (listfn, viewdata, req) {
    if (typeof listfn !== "function") {
        listfn = this.createFunctionFromFile(listfn);
    }
    // store response passed to start()
    var start_res;

    // override global functions
    var _start = start;
    start = function (res) {
        start_res = res;
        _start(res);
    };
    var _send = send;
    send = function (data) {
        if (!start_res) {
            throw new Error('send function called before start');
        }
        if (!start_res.body) {
            start_res.body = '';
        }
        start_res.body += data;
        _send(data);
    };
    var _getRow = getRow;
    getRow = function () {
        if (viewdata.total_rows === 0) return null;
        return viewdata.rows.shift();
    };

    // create head object
    var head = {};
    for (var k in viewdata) {
        if (k !== 'rows') {
            head[k] = viewdata[k];
        }
    }

    // execute list function
    var val = listfn(head, req);

    // extend response object
    if (!start_res) {
        start_res = {code: 200, body: val};
    }
    else {
        //start_res.body = start_res.body ? start_res.body + val: val;
        start_res.body = start_res.body ? start_res.body: val;
    }

    // restore global functions
    start = _start;
    send = _send;
    getRow = _getRow;

    return start_res;
};


/**
 * Run update function. The response (second item in the returned array)
 * will always be converted to an object, if a string is returned the
 * object will be {body: <string>}.
 *
 * @param {Function} updatefn - the update function to call
 * @param {Object} doc - the JSON doc to pass to the update function
 * @parma {Object} req - the request object to pass to the update function
 */

exports.update = function (updatefn, doc, req) {
    if (typeof updatefn !== "function") {
        updatefn = this.createFunctionFromFile(updatefn);
    }
    var val = updatefn(doc, req);
    if (!(val[1] instanceof Object)) {
        return [val[0], {body: val[1]}];
    }
    return val;
};

/**
 * Run view function. 
 *
 * @param {Function} viewfn - the update function to call
 * @param {Array} docs - the JSON doc to pass to the update function
 * @parma {Object} viewdata - the object to pass to the update function
 */
 exports.view = function (viewfn, docs, emitFn) {
    // creating the returning variable
    var viewdata = new Array();
    // Override global Functions
    var _emit = emit;
    if (typeof emitFn === 'function') {
      emit = emitFn;
    } else {
      emit = function (key, value) {
          viewdata.push({
              "key":key,
              "value": value,
              "id" : doc._id,
              "doc" : global.include_docs ? doc : null
          });
      };
    }
    // is the given viewfn loaded?
    if (typeof viewfn !== "function") {
        // create the function
        viewfn = this.createFunctionFromFile(viewfn);
    };
    // go through all given docs and call the view function
    for (var i = 0; i < docs.length; ++i) {
        var doc = docs[i];
        var val = viewfn(doc);
    }
    return viewdata;
 }
