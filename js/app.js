// Create a Class (JS Class, look at your notes if your forget) for your tamagotchi



class Tamagotchi {
    constructor(){
        this.name = '';
        this.age = 0;
        this.hunger = 1;
        this.sleepiness = 1;
        this.boredom = 1;
        this.alive = true;
        this.portrait = null;
    }
};

const tamagot = new Tamagotchi();
console.log(tamagot);

const $hunger = $('#hunger');
const $sleepiness = $('#sleepiness');
const $boredom = $('#boredom');
const $age = $('#age');
const $name = $('#name');
const $port = $('#portrait');

$hunger.text(`Hunger: ${tamagot.hunger}`);
$sleepiness.text(`Sleepiness: ${tamagot.sleepiness}`);
$boredom.text(`Boredom: ${tamagot.boredom}`);
$age.text(`Age: ${tamagot.age}`);


$('#start').on('click', () => {
    setName = prompt('Name your pet!');
    tamagot.name = setName;
    $name.text(tamagot.name);
    $('#start').attr('disabled', true);
});

