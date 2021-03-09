const buttonColors = ['red', 'yellow', 'green', 'white'];
var gamePattern = [];
var usrClickedPattern = [];
var level = 0;
var started = false;

function nextSequence(){
    usrClickedPattern = [];
    level++;
    $('h1').text('Level ' + level);
    var randomNumber = Math.random() * 3;
    var newNumber = Math.round(randomNumber);
    var randomChosenColor = buttonColors[newNumber];
    gamePattern.push(randomChosenColor);
    playSound(randomChosenColor);
}


var btns = document.querySelectorAll('div');

btns.forEach(btn => {
    btn.addEventListener('click', function(){
        var userChosenColor = $(this).attr('id');
        animatePress(userChosenColor);
        playSound(userChosenColor);
        usrClickedPattern.push(userChosenColor);
        checkAnswer(usrClickedPattern.length - 1);
    });
})

function playSound(name){
    $('#' + name).fadeOut(100).fadeIn(100);
    const audio1 = new Audio('http://www.soundgator.com/adata/1146.mp3')
    audio1.play();
}

function animatePress(action){
    var change = document.querySelector('#' + action);
    change.classList.add('pressed');
    setTimeout(() => {
        change.classList.remove("pressed");
    }, 100)
}

function fail(){
    var loser = document.querySelector('body');
    loser.classList.add('failure');
    setTimeout(() => {
        loser.classList.remove("failure");
    }, 100)
}

$(document).on('keypress', () => {
    if (started === false){
        $('h1').text('Level ' + level);
        nextSequence();
        started = true;
    }
    
})

function checkAnswer(currentLevel){
    if (usrClickedPattern[currentLevel] === gamePattern[currentLevel]){
        console.log('success');
        if (usrClickedPattern.length === gamePattern.length){
            setTimeout(() => {
                nextSequence();
            }, 1000)
        }
    }
    else{
        fail();
        $('h1').text('You suck. Press any key to start over!');
        const audio2 =  new Audio('sounds/Wrong.mp3');
        audio2.play();
        gamePattern = [];
        started = false;
        level = 0;
    }
}