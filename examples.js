// object declaration
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


// function declared first, then classified

var Mammal = new Class({
    $extends: Animal,
    $construct: function Mammal(type,name,age){
        Animal.call(this,type,name,age);
        this.varFromMammal = 'mammal';
    },
    foo: function(){
        return "baz";
    }
});


// function declared first, then used in class declaration
function Dog(name,age,breed){
    Mammal.call(this,'dog',name,age);
    this.breed = breed;

    this.varFromDog = 'dog';
}

new Class(Dog,{
    present: function(){
        console.log('Hi! My name is ' + this.name + ', and I\'m a ' + this.age + ' year old ' + this.breed + '! In human years, thats like ' + this.getHumanAge() + '.');
    },
    getHumanAge: function(){
        return Math.round(this.age * 7);
    },
    fooOriginal: function(){
        return Mammal.prototype.foo();
    },
    foo: function(){
        return "bar";
    }
},Mammal);

// object declaration
var Terrier = new Class({
    $extends: Dog,
    $errors: {
        TooCurledTailError: 'This dogs tail is too curled!',
    },
    $construct: function Terrier(name,age,breed){
        Dog.call(this,name,age,breed + ' Terrier');
        this.varFromTerrier = 'terrier';
    }
});

// inline declaration
var Cat = new Class(function Cat(name,age){
    Mammal.call(this,'cat',name,age);
    this.evil = true;
},{
    present: function(){
        console.log('Meow! I\'m ' + this.name + '!')
    }
},Mammal);

// no constructor
var Monkey = new Class({
    $extends: Mammal
});

console.log('--------------------------------------------------------------------');
var Mono = new Terrier('Mononoke',2.7,'West Highland White');
Mono.present();
console.dir(Mono);
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

console.log('--------------------------------------------------------------------');
var Bobo = new Monkey();
console.log(Bobo);
console.log('--------------------------------------------------------------------');


var customError = new Terrier.$errors.TooCurledTailError();

var tests = {
    typeInheritance1: Mono instanceof Terrier,
    typeInheritance2: Mono instanceof Dog,
    typeInheritance3: Mono instanceof Mammal,
    typeInheritance4: Mono instanceof Animal,
    typeInheritance5: Bobo instanceof Animal,
    varInheritance0: Mono.age == 2.7 && Mono.breed == 'West Highland White Terrier',
    varInheritance1: Mono.varFromTerrier == 'terrier',
    varInheritance2: Mono.varFromDog == 'dog',
    varInheritance3: Mono.varFromMammal == 'mammal',
    varInheritance4: Mono.varFromAnimal == 'animal',
    functionInheritance1: Mono.foo() == 'bar',
    functionInheritance2: Mono.fooOriginal() == 'baz',
    functionInheritance3: Mono.isEvil() === false,
    functionInheritance4: Nisse.isEvil() === true,
    customErrorMessage: customError.message == "This dogs tail is too curled!",
    customErrorType: customError instanceof Error,
}

pass = true;

for(name in tests) tests.hasOwnProperty(name) && !console.log(tests[name] ? ' PASS ' : '!FAIL!',name) && (pass = (pass && tests[name]));
if (!pass) throw "FAILED!"

