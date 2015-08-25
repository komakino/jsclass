function Class(fn,prototype,descriptors){
    function _merge(a,b){ for(v in b) b.hasOwnProperty(v) && (a[v] = b[v])}

    fn.extends = function(parent){
        function temp() { this.constructor = fn; }
        temp.prototype = parent.prototype;
        _merge(temp.prototype,fn.prototype)
        fn.prototype = new temp;
        fn.__super = parent.prototype

        return fn;
    }
    
    _merge(fn.prototype,prototype);
    descriptors && Object.defineProperties(fn.prototype,descriptors);

    return fn;
}

// Alternative method of declaration
Function.prototype.classify = function(prototype,descriptors){
    Class(this,prototype,descriptors);
    return this;
}
