// Polyfill for IE<=8
Array.prototype.indexOf||(Array.prototype.indexOf=function(a,b){var c;if(null==this)throw new TypeError('"this" is null or not defined');var d=Object(this),e=d.length>>>0;if(0===e)return-1;var f=+b||0;if(Math.abs(f)===1/0&&(f=0),f>=e)return-1;for(c=Math.max(f>=0?f:e-Math.abs(f),0);e>c;){if(c in d&&d[c]===a)return c;c++}return-1});

var MixinClass = new Class({
    mixedInFunction: function(){ return 'mixinReturn';},
});

var Animal = new Class({
    $construct: function Animal(type,name,age){
        this.type = type;
        this.name = name;
        this.age = age;
        this.evil = false;
        this.varFromAnimal = 'animal';
    },
    present: function(){
        console.log('Hi! My name is ' + this.name + ', and I\'m a ' + this.age + ' year old ' + this.type + '!');
    },
    isEvil: function(){
        return this.evil;
    },
    declareEvilness: function(){
        console.log("%s is %s since it is a %s",this.name,this.isEvil() ? 'evil' : 'not evil',this.type);
    }
});

var Mammal = new Class({
    $extend: Animal,
    $construct: function Mammal(type,name,age){
        Animal.call(this,type,name,age);
        this.varFromMammal = 'mammal';
    },
    foo: function(){
        return "baz";
    }
});

var Dog = new Class({
    $extend: Mammal,
    $construct: function Dog(name,age,breed){
        Mammal.call(this,'dog',name,age);
        this.breed = breed;

        this.varFromDog = 'dog';
    },
    present: function(){
        console.log('Hi! My name is ' + this.name + ', and I\'m a ' + this.age + ' year old ' + this.breed + '! In human years, thats like ' + this.getHumanAge() + '.');
    },
    getHumanAge: function(){
        return Math.round(this.age * 7);
    },
    fooOriginal: function(){
        return Mammal.prototype.foo.call(this);
    },
    foo: function(){
        return "bar";
    }
});

var Terrier = new Class({
    $extend: Dog,
    $mixin: MixinClass,
    $errors: {
        TooCurledTailError: 'This dogs tail is too curled!',
    },
    $construct: function Terrier(name,age,breed){
        Dog.call(this,name,age,breed + ' Terrier');
        this.varFromTerrier = 'terrier';
    }
});

var Cat = new Class({
    $extend: Mammal,
    $construct: function Cat(name,age){
        Mammal.call(this,'cat',name,age);
        this.evil = true;
    },
    present: function(){
        console.log('Meow! I\'m ' + this.name + '!')
    }
});

var Monkey = new Class({
    $extend: Mammal
});

console.log('--------------------------------------------------------------------');
var Mono = new Terrier('Mononoke',2.7,'West Highland White');
console.log(Mono);
Mono.present();
console.log(Mono);
Mono.declareEvilness();
console.log('--------------------------------------------------------------------');
var Nisse = new Cat('Nisse',24);
Nisse.present();
console.log(Nisse);
Nisse.declareEvilness();
console.log('--------------------------------------------------------------------');
var Hedvig = new Dog('Hedvig',12,'dachshund');
Hedvig.present();
Hedvig.declareEvilness();
console.log(Hedvig);
console.log('--------------------------------------------------------------------');
var Bobo = new Monkey();
console.log(Bobo);
console.log('--------------------------------------------------------------------');

var customError = new Terrier.$error.TooCurledTailError();

function _ut(tests){
    var result,pass = true;
    function _run(test){
        return ((typeof test == 'function') ? test() : test) === true;
    }

    for(name in tests){
        if(!tests.hasOwnProperty(name)) continue;
        result = _run(tests[name]);
        console.log(result ? ' PASS ' : '!FAIL!',name);
        pass = (pass && result);
    }

    document.body.style.backgroundColor = pass ? '#009900' : '#990000';
    document.body.innerHTML = pass ? 'PASS' : 'FAIL';
}


_ut({
    MonoInstanceOfTerrier:  Mono instanceof Terrier,
    MonoInstanceOfDog:      Mono instanceof Dog,
    MonoInstanceOfMammal:   Mono instanceof Mammal,
    MonoInstanceOfAnimal:   Mono instanceof Animal,
    MonoInstanceOfClass:    Mono instanceof Class,
    BoboInstanceOfAnimal:   Bobo instanceof Animal,

    DogChildOfAnimal:       Dog.$childOf(Animal),
    MammalChildOfAnimal:    Mammal.$childOf(Animal),
    AnimalParentOfMammal:   Animal.$parentOf(Mammal),
    MammalParentOfDog:      Mammal.$parentOf(Dog),
    AnimalParentIsMammal:   Mammal.$parent == Animal,

    varInheritance0:        Mono.age == 2.7 && Mono.breed == 'West Highland White Terrier',
    varInheritance1:        Mono.varFromTerrier == 'terrier',
    varInheritance2:        Mono.varFromDog == 'dog',
    varInheritance3:        Mono.varFromMammal == 'mammal',
    varInheritance4:        Mono.varFromAnimal == 'animal',
    
    functionInheritance0:   Nisse.foo() == 'baz',
    functionInheritance1:   Mono.foo() == 'bar',
    functionInheritance2:   Mono.fooOriginal() == 'baz',
    functionInheritance3:   Mono.isEvil() === false,
    functionInheritance4:   Nisse.isEvil() === true,

    customErrorMessage:     customError.message == "This dogs tail is too curled!",
    customErrorType:        customError instanceof Error,

    mixin1:                 Mono.mixedInFunction() == 'mixinReturn',
});