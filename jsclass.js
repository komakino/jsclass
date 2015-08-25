function Class(fn,prototype,descriptors){
    fn.extends = function(parent){
        function temp() { this.constructor = fn; }
        temp.prototype = parent.prototype;
        for(p in fn.prototype) fn.prototype.hasOwnProperty(p) && (temp.prototype[p] = fn.prototype[p]);
        fn.prototype = new temp;
        fn.__super = parent.prototype

        return fn;
    }
    
    for(p in prototype) prototype.hasOwnProperty(p) && (fn.prototype[p] = prototype[p]);
    descriptors && Object.defineProperties(fn.prototype,descriptors);

    return fn;
}

// Alternative method of declaration
Function.prototype.classify = function(prototype,descriptors){
    Class(this,prototype,descriptors);
    return this;
}
