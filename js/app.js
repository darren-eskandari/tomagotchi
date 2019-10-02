// Create a Class (JS Class, look at your notes if your forget) for your tamagotchi



class Tamagotchi {
    constructor(){
        this.name = '';
        this.age = 0;
        this.hunger = 1;
        this.sleepiness = 1;
        this.boredom = 1;
        this.isAlive = true;
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
    $('#start').attr('disabled', true).css('opacity', 0);
    game.setTimer()
});

const game = {
    time: 1,
    light: true,

    setTimer(){
        const interval = setInterval(() => {
            if(this.time >= 600) {
                tamagot.isAlive = false;
                return $port.text('has died of old age...');
            }
            else if (this.time % 60 === 0) {
                tamagot.age++;
                $age.text(`Age: ${tamagot.age}`);
                this.time++;
            }
            else if (this.time % 3 === 0) {
                tamagot.hunger++;
                if (tamagot.hunger >= 10){
                    tamagot.isAlive = false;
                    $port.text('has starved to death');
                    return    
                } else {
                    $hunger.text(`Hunger: ${tamagot.hunger}`);
                    this.time++;
                }
            }
            else if (this.time % 4 === 0) {
                tamagot.sleepiness++;
                if (tamagot.sleepiness >= 10){
                    tamagot.isAlive = false;
                    return $port.text('has died of exhaustion');
                }
                else {
                    $sleepiness.text(`Sleepiness: ${tamagot.sleepiness}`);
                    this.time++;
                }
            }
            else if (this.time % 5 === 0) {
                tamagot.boredom++;
                if (tamagot.hunger >= 10){
                    tamagot.isAlive = false;
                    return $port.text('is bored to death');
                }
                else {
                    $boredom.text(`Boredom: ${tamagot.boredom}`);
                    this.time++;
                }
            }
            else if (tamagot.isAlive === true) {
                this.time++;
            }
        }, 1000);
    },

    feedMe(){
        if (tamagot.hunger > 1 && tamagot.hunger < 10){
            tamagot.hunger--;
            $hunger.text(`Hunger: ${tamagot.hunger}`);
        }
    },

    toggleLight(){
        if (this.light === true){
            this.light = false;
            $('main').css('backgroundColor', 'lightgrey');
        } else{
            this.light = true;
            $('main').css('backgroundColor', 'white');
        }
    },

    playWithMe(){
        if (tamagot.boredom > 1 && tamagot.boredom < 10){
            tamagot.boredom--;
            $boredom.text(`Boredom: ${tamagot.boredom}`);
        }
    },

};

$('#feed').on('click', () => {
    game.feedMe();
});

$('#play').on('click', () => {
    game.playWithMe();
});

$('#lights').on('click', () => {
    game.toggleLight();
});

