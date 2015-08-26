Syntax:
```
var MyClass = Class($construct,properties,$extends,$describe,$errors);
```
    where:
        $construct: constructor function
        $properties: object with methods and properties
        $extends: Class to extend
        $describe: see 'props' parameter in https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties 
        $errors: object where keys are errornames and values are messages or Error objects
or

```
var MyClass = Class(object)
```
    Object with methods, properties and special properties: $construct, $extends, $describe, $errors

Example:

```
var MyClass = Class({
    $extends: MySuperClass,
    $errors: {
        MyCustomError: "Something failed horribly!",
    },
    $construct: function MyClass(someVar){
        // Call parent constructor
        MySuperClass.call(this,'dog',someVar);
        // Call parent method that is locally overridden
        MySuperClass.prototype.myMethod.call(this);
    },
    $describe: { <see descriptors above> }
    myMethod: function(){},
    myProperty: 'foobar',
});
```