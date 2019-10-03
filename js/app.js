
// classes
class Tamagotchi {
    constructor(name){
        this.name = name;
        this.age = 0;
        this.hunger = 1;
        this.sleepiness = 1;
        this.boredom = 1;
        this.isAlive = true;
        this.portrait = null;
    }
    
    // decrease hunger
    feedMe(){
        if (this.hunger > 1 && this.hunger < 10 && this.isAlive === true){
            this.hunger--;
            $hunger.text(`Hunger: ${this.hunger}`);
        }
    }

    // decrease boredom
    playWithMe(){
        if (this.boredom > 1 && this.boredom < 10 && this.isAlive === true){
            this.boredom--;
            $boredom.text(`Boredom: ${this.boredom}`);
        }
    }

    // aging and morphing
    aging(){
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
            return $port.html('has died of old age...<br><img src="images/5_rip.png">').removeClass('animated');
        }
    }
};

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
    setTimer(){
        // tracking game time
        setInterval(() => {
            // die of old age
            if(tamagot.age === 10) {
                tamagot.isAlive = false;
                return
            }
            // increase age
            else if (this.time % 17 === 0) {
                tamagot.age++;
                $age.text(`Age: ${tamagot.age}`);
                this.time++;
                tamagot.aging();
            }
            // increase hunger
            else if (this.time % 3 === 0) {
                tamagot.hunger++;
                if (tamagot.hunger >= 10){
                    tamagot.isAlive = false;
                    $port.html('has starved to death<br><img src="images/5_rip.png">').removeClass('animated');
                    return    
                } else {
                    $hunger.text(`Hunger: ${tamagot.hunger}`);
                    this.time++;
                }
            }
            // increase boredom
            else if (this.time % 5 === 0) {
                tamagot.boredom++;
                if (tamagot.boredom >= 10){
                    tamagot.isAlive = false;
                    return $port.html('was bored to death<br><img src="images/5_rip.png">').removeClass('animated');
                }
                else {
                    $boredom.text(`Boredom: ${tamagot.boredom}`);
                    this.time++;
                }
            }
            // increase/decrease sleepiness
            else if (this.time % 4 === 0) {
                if (this.lightOn === true) {                
                    tamagot.sleepiness++;
                    if (tamagot.sleepiness >= 10){
                        tamagot.isAlive = false;
                        return $port.html('has died of exhaustion<br><img src="images/5_rip.png">').removeClass('animated');
                    } else {
                        $sleepiness.text(`Sleepiness: ${tamagot.sleepiness}`);
                        this.time++;
                        }
                } else if (this.lightOn !== true && tamagot.sleepiness > 1) {
                    tamagot.sleepiness--;
                    $sleepiness.text(`Sleepiness: ${tamagot.sleepiness}`);
                    if (tamagot.sleepiness === 1){
                        this.toggleLightOn();
                        this.time++;
                    }
                    this.time++;
                }
            }
            // increase time
            else if (tamagot.isAlive === true) {
                this.time++;
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
    tamagot.aging();
    game.setTimer();
    // game.moving();
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

