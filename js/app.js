// Create a Class (JS Class, look at your notes if your forget) for your tomagotchi

class Tamagotchi {
    constructor(name){
        this.name = name;
        this.age = 0;
        this.hunger = 1;
        this.sleepiness = 1;
        this.boredom = 1;
        this.alive = true;
    }
};

const tamagot = new Tamagotchi('Tami');
console.log(tamagot);

const $hunger = $('#hunger');
const $sleepiness = $('#sleepiness');
const $boredom = $('#boredom');
const $age = $('#age');
const $name = $('#name');

$hunger.text(tamagot.hunger);
$sleepiness.text(tamagot.sleepiness);
$boredom.text(tamagot.boredom);
$age.text(tamagot.age);
$name.text(tamagot.name);