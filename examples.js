// inline declaration
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
function Mammal(type,name,age){
    Mammal.__super.constructor.call(this,type,name,age);
    this.varFromMammal = 'mammal';
}

Mammal.classify({
    foobar: function(){
        console.log('Overwritten foobar');
    }
}).extends(Animal);


// function declared first, then used in class declaration
function Dog(name,age,breed){
    Dog.__super.constructor.call(this,'dog',name,age);
    this.breed = breed;

    this.varFromDog = 'dog';

    // this.foobar();
    Dog.__super.foobar.call(this);
}

new Class(Dog,{
    present: function(){
        console.log('Hi! My name is ' + this.name + ', and I\'m a ' + this.age + ' year old ' + this.breed + '! In human years, thats like ' + this.getHumanAge() + '.');
    },
    getHumanAge: function(){
        return Math.round(this.age * 7);
    },
    foobar: function(){
        console.log('Current foobar');
    }
}).extends(Mammal);

// inline declaration
var Terrier = new Class(function Terrier(name,age,breed){
    Terrier.__super.constructor.call(this,name,age,breed + ' Terrier');
    this.varFromTerrier = 'terrier';
}).extends(Dog);

// inline declaration
var Cat = new Class(function Cat(name,age){
    Cat.__super.constructor.call(this,'cat',name,age);
    this.evil = true;
},{
    present: function(){
        console.log('Meow! I\'m ' + this.name + '!')
    }
}).extends(Mammal);

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

var tests = {
    monoIsAnimal: Mono instanceof Animal,
    monoIsMammal: Mono instanceof Mammal,
    monoIsDog: Mono instanceof Dog,
    monoIsTerrier: Mono instanceof Terrier,
    varFromAnimal: Mono.varFromAnimal == 'animal',
    varFromMammal: Mono.varFromMammal == 'mammal',
    varFromDog: Mono.varFromDog == 'dog',
    varFromTerrier: Mono.varFromTerrier == 'terrier',
    nisseIsCat: Nisse instanceof Cat,
    vars: Mono.age == 2.7,
    breed: Mono.breed == 'West Highland White Terrier',
    catsAreEvil: Nisse.isEvil() === true,
}

for(name in tests){
    tests.hasOwnProperty(name) && !tests[name] && !console.log('%s FAILED!',name) && function(){throw "FAIL"}();
};
console.log('PASS!',Mono);