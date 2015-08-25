function Class(fn,prototype,parent,descriptors){
    if(parent){
        function temp() { this.constructor = fn; }
        temp.prototype = parent.prototype;
        fn.prototype = new temp;
        fn.__super = parent.prototype
    }
    
    for(p in prototype) prototype.hasOwnProperty(p) && (fn.prototype[p] = prototype[p]);
    descriptors && Object.defineProperties(fn.prototype,descriptors);

    return fn;
}

// Alternative method of declaration
Function.prototype.classify = function(prototype,parent,descriptors){
    return Class(this,prototype,parent,descriptors);
}