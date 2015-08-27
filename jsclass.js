function Class($construct,$methods,$extends,$describe,$errors){
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
        $methods    = $construct;
        $construct  = _grab($methods,'$construct');
        $extends    = _grab($methods,'$extends');
        $describe   = _grab($methods,'$describe');
        $errors     = _grab($methods,'$errors');
    }

    $construct  || ($construct = new Function());
    $extends    || ($extends = Class);

    $construct.$lineage = $extends.$lineage ? $extends.$lineage.slice(0) : [];
    $construct.$lineage.push($extends);

    function temp() { this.constructor = $construct; }
    temp.prototype = $extends.prototype;
    $construct.prototype = new temp;

    $construct.$childOf     = function(parent){ return this.$lineage && this.$lineage.indexOf(parent) > -1;}
    $construct.$parentOf    = function(parent){ return parent.$lineage && parent.$lineage.indexOf(this) > -1;}
    $construct.$parent      = $extends;

    if($errors){
        $construct.$errors = {};
        for(name in $errors) 
            $errors.hasOwnProperty(name) && ($construct.$errors[name] = (typeof $errors[name] == 'function') ? $errors[name] : _createError(name,$errors[name]))
    }

    _merge($construct.prototype,$methods);
    $describe && Object.defineProperties($construct.prototype,$describe);

    return $construct;
}