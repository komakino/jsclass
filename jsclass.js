function Class(fn,properties,descriptors,parent){
    function _merge(a,b){ for(v in b) b.hasOwnProperty(v) && (a[v] = b[v])}
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
        fn = properties['$construct']; delete properties['$construct'];
        parent = properties['$extends']; delete properties['$extends'];
        descriptors = properties['$describe']; delete properties['$describe'];
    }

    parent && _extends.call(fn,parent);
    fn.extends = _extends;
    _merge(fn.prototype,properties);
    descriptors && Object.defineProperties(fn.prototype,descriptors);

    return fn;
}

// Alternative method of declaration
Function.prototype.classify = function(prototype,descriptors){
    Class(this,prototype,descriptors);
    return this;
}
