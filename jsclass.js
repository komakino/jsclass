function Class($construct,$properties,$extends,$describe,$errors){
    function _merge(a,b){ for(v in b) b.hasOwnProperty(v) && (a[v] = b[v])}
    function _grab(obj,prop){
        var temp = obj[prop];
        delete obj[prop]
        return temp;
    }
    function _createError(name,defaultMessage){
        return Class({
            $extends: Error,
            $construct: function(message){
                Error.call(this);
                this.name = name;
                this.message = message || defaultMessage;
            },
        })
    }

    if(typeof $construct == 'object'){
        $properties = $construct;
        $construct = _grab($properties,'$construct') || new Function();
        $extends = _grab($properties,'$extends') || {};
        $describe = _grab($properties,'$describe') || {};
        $errors = _grab($properties,'$errors') || {};
    }

    if($extends){
        function temp() { this.constructor = $construct; }
        temp.prototype = $extends.prototype;
        $construct.prototype = new temp;
    }

    if($errors){
        $construct.$errors = {};
        for(name in $errors) 
            $errors.hasOwnProperty(name) && ($construct.$errors[name] = (typeof $errors[name] == 'function') ? $errors[name] : _createError(name,$errors[name]))
    }

    _merge($construct.prototype,$properties);
    $describe && Object.defineProperties($construct.prototype,$describe);

    return $construct;
}