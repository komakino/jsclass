/*
    Syntax:

    Class(fn, properties, parent, descriptor)
        where:
            fn: constructor function
            properties: object with methods and properties
            parent: Class to extend
            descriptors: see 'props' parameter in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties 
    or
    Class(<Object>)

    example:
    var MyClass = Class({
        $extends: MySuperClass,
        $construct: function MyClass(someVar){
            MyClass.$parent.constructor.call(this,'dog',someVar);
        },
        $describe: { <see descriptors above> }
        myMethod: function(){},
        myProperty: 'foobar',
    });
*/

function Class(fn,properties,parent,descriptors){
    function _merge(a,b){ for(v in b) b.hasOwnProperty(v) && (a[v] = b[v])}
    function _grab(obj,prop){
        var temp = obj[prop];
        delete obj[prop]
        return temp;
    }

    if(typeof fn == 'object'){
        properties = fn;
        fn = _grab(properties,'$construct');
        parent = _grab(properties,'$extends');
        descriptors = _grab(properties,'$describe');
    }

    if(parent){
        function temp() { this.constructor = fn; }
        temp.prototype = parent.prototype;
        fn.prototype = new temp;
        fn.$parent = parent.prototype;
    }

    _merge(fn.prototype,properties);
    descriptors && Object.defineProperties(fn.prototype,descriptors);

    return fn;
}