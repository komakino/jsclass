# jsclass

Standalone minimal javascript class "implementation" created primarily for my own needs.

### Syntax:

```javascript
var MyClass = Class(object);
```

* `object`: A set of properties and methods, plus the following special properties:
    * `$construct`: (*function*) constructor function
    * `$extends`: (*function*) Class to extend
    * `$mixin`: Either a single [*object*|*Class*] or an array of them.
    * `$describe`: (*object*) See 'props' parameter [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties)
    * `$errors`: (*object*) where keys are errornames and values are messages or Error objects. Accessible on the constructor(see example).

### Example:

```javascript
var MyClass = Class({
    $extends: MySuperClass,
    $mixin: AnotherClassWithNiceMethods
    $errors: {
        MyCustomError: "Something failed horribly!",
    },
    $construct: function MyClass(someVar){
        // Call parent constructor
        MySuperClass.call(this,'dog',someVar);
        // Call parent method that is locally overridden
        MySuperClass.prototype.myMethod.call(this);
    },
    myMethod: function(){
        if(this.myProperty != 'foobar'){
            throw new MyClass.$errors.MyCustomError();
        }
    },
    myProperty: 'foobar',
});
```

### Notes
* For IE8 support you need to polyfill `Array.prototype.indexOf`. See [here](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Polyfill)
* IE8 does not support `Object.defineProperties`, which `$describe` uses. AFAIK it cannot be polyfilled.
