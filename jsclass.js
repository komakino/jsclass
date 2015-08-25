function Class(fn,properties,descriptors,parent){
    function _merge(a,b){ for(v in b) b.hasOwnProperty(v) && (a[v] = b[v])}
    function _grab(obj,prop){
        var temp = obj[prop];
        delete obj[prop]
        return temp;
    }
    function _extends(parent){
        function temp() { this.constructor = fn; }
        temp.prototype = parent.prototype;
        _merge(temp.prototype,fn.prototype)
        fn.prototype = new temp;
        fn.__super = parent.prototype

        return fn;
    }

    if(typeof fn == 'object'){
        properties = fn;
        fn = _grab(properties,'$construct');
        parent = _grab(properties,'$extends');
        descriptors = _grab(properties,'$describe');
    }

    parent && _extends.call(fn,parent);
    fn.extends = _extends;
    _merge(fn.prototype,properties);
    descriptors && Object.defineProperties(fn.prototype,descriptors);

    return fn;
}

// Alternative method of declaration
Function.prototype.classify = function(prototype,descriptors,parent){
    Array.prototype.unshift.call(arguments, this);
    return Class.apply(Class,arguments);
}
