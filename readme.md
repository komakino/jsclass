# jsclass

Standalone minimal javascript class "implementation" created primarily for my own needs.

### Syntax:

```javascript
var MyClass = Class($construct,properties,$extends,$describe,$errors);
```

* `$construct`: (*function*) constructor function
* `$properties`: (*object*) with methods and properties
* `$extends`: (*function*) Class to extend
* `$describe`: (*object*) See 'props' parameter [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
* `$errors`: (*object*) where keys are errornames and values are messages or Error objects

*or*

```javascript
var MyClass = Class(object);
```

Object with methods, properties and special properties: `$construct`, `$extends`, `$describe`, `$errors`.

### Example:

```javascript
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

### Notes
* For IE8 support you need to polyfill `Array.prototype.indexOf`. See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill)