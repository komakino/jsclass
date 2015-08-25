var Class = function(fn,prototype,parent,descriptors){
    if(parent){
        function proxy() { this.constructor = fn; }
        proxy.prototype = parent.prototype;
        fn.prototype = new proxy;
        fn.__super = parent.prototype
    }
    
    for(p in prototype) prototype.hasOwnProperty(p) && (fn.prototype[p] = prototype[p]);
    descriptors && Object.defineProperties(fn.prototype,descriptors);

    return fn;
}

Function.prototype.classify = function(prototype,parent,descriptors){
    return Class(this,prototype,parent,descriptors);
}