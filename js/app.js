
// classes
class Tamagotchi {
    constructor(name){
        this.name = name;
        this.age = 0;
        this.hunger = 1;
        this.boredom = 1;
        this.sleepiness = 1;
        this.isAlive = true;
        this.portrait = null;
        this.alseep = null;
    }
    
    // increasing age
    aging(){
        if (this.age < 10){
            this.age++;
            $age.text(`Age: ${this.age}`);
            this.morphing();
        }
    }

    // morphing by age
    morphing(){
        if (this.age === 0) {
            $port.html('<img src="images/1_egg.png">').addClass('animated');          
        }
        else if (this.age < 3) {
            $port.html('<img src="images/2_baby.png">');
        }
        else if (this.age < 6) {
            $port.html('<img src="images/3_young.png">');
        }
        else if (this.age < 10) {
            $port.html('<img src="images/4_adult.png">');
        } else {
            this.isAlive = false;

            $port.html('has died of old age...<br><img src="images/5_rip.png">').removeClass('animated');
        }
    }
    
    // increase hunger
    hungry(){
        this.hunger++;
        $hunger.text(`Hunger: ${this.hunger}`);
        if (this.hunger === 10){
            this.isAlive = false;
            $port.html('has starved to death<br><img src="images/5_rip.png">').removeClass('animated');
        }
    }

    // decrease hunger
    feedMe(){
        if (this.hunger > 1 && this.isAlive === true){ 
            this.hunger--;
            $hunger.text(`Hunger: ${this.hunger}`);
        }
    }

    // increase boredom
    bored(){
        this.boredom++;
        $boredom.text(`Boredom: ${this.boredom}`);
        if (this.boredom === 10){
            this.isAlive = false;
            $port.html('was bored to death<br><img src="images/5_rip.png">').removeClass('animated');
        }
    }

    // decrease boredom
    playWithMe(){
        if (this.boredom > 1 && this.isAlive === true){
            this.boredom--;
            $boredom.text(`Boredom: ${this.boredom}`);
        }
    }

    // increase sleepiness 
    sleepy(){
        this.sleepiness++;
        $sleepiness.text(`Sleepiness: ${this.sleepiness}`);
        if (this.sleepiness === 10){
            this.isAlive = false;
            $port.html('has died of exhaustion<br><img src="images/5_rip.png">').removeClass('animated');
        }
    }

    rest(){
        this.sleepiness--;
        $sleepiness.text(`Sleepiness: ${this.sleepiness}`);
        if (this.sleepiness === 1){
            game.toggleLightOn();
        }
    }
}

// should I trigger this with pet name?
const tamagot = new Tamagotchi();
console.log(tamagot);

// jquery elements
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

// game object
const game = {
    time: 1,
    lightOn: true,

    // start of game
    startGame(){
        // tracking game time
        const interval = setInterval(() => {
            if (tamagot.isAlive === true){
                if (this.time % 17 === 0) {
                    tamagot.aging();
                    this.time++;
                }
                else if (this.time % 7 === 0) {
                    tamagot.bored();
                    this.time++;
                }
                else if (this.time % 3 === 0) {
                    tamagot.hungry();
                    this.time++;
                }
                else if (this.time % 5 === 0) {
                    if (this.lightOn === true) {                
                        tamagot.sleepy();
                    }
                    this.time++;
                } 
                else if (this.time % 2 === 0) {
                    if (this.lightOn !== true && tamagot.sleepiness > 1) {
                        tamagot.rest();
                    }
                    this.time++;
                }
                else if (tamagot.isAlive === true) {
                    this.time++;
                }
            }
        }, 1000);
    },

    // toggle light to affect sleepiness
    toggleLightOn(){
        if (this.lightOn === true){
            this.lightOn = false;
            $('main').css('backgroundColor', 'dimgrey');
        } else {
            this.lightOn = true;
            $('main').css('backgroundColor', 'white');
        }
    },

};

// button functions

$('#start').on('click', () => {
    setName = prompt('Name your pet!');
    tamagot.name = setName;
    $name.text(tamagot.name);
    tamagot.morphing();
    game.startGame();
});

// food button
$('#feed').on('click', () => {
    if(game.lightOn === false){
        game.toggleLightOn();
    }
    tamagot.feedMe();
});

// play button
$('#play').on('click', () => {
    if(game.lightOn === false){
        game.toggleLightOn();
    }
    tamagot.playWithMe();
});

// light button
$('#lights').on('click', () => {
    game.toggleLightOn();
});

