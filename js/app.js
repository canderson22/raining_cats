var $body = $('body');
var $form = $('.form');
var $bestScore = $('#best-score');
var bestPlayer = JSON.parse(localStorage.getItem('bestScore'));
if (bestPlayer) {
    $bestScore.text(bestPlayer.name + ', Score: ' + bestPlayer.total);
}


var generateGame = function() {
    $body.css({
        background: '-webkit-linear-gradient(top, #4b6cb7 5%, #182848 100%) no-repeat center center fixed'        
    });

    var $header = $('<header>');
    var $div1 = $('<div class="clouds cloud1"><span id="players-name">');
    $div1.append('<span id="timer">');
    var $div2 = $('<div class="clouds cloud2"><span id="game-header">');
    var $div3 = $('<div class="clouds cloud1"><span>Score: <span id="score">');
    var $div4 = $('<div class="clouds cloud2"><span>Missed: <span id="missed">');
    var $footer = $('<footer>');
    $header.append($div1, $div2, $div3, $div4);
    $body.append($header, $footer);
}


var game = {
    score: 0,
    missed: 0,
    level: 1,
    players: [
        {
            name: 'Player 1',
            total: 0,
            played: false
        },
        {
            name: 'Player 2',
            total: 0,
            played: false
        }
    ],
    switchTurn: function() {
        if (this.currentPlayer == this.players[0]) {
            this.currentPlayer = this.players[1];
        }
    },
    checkBestScore: function(player) {
        var player = player;
        var getBest = JSON.parse(localStorage.getItem('bestScore'));
        if (getBest == null) {
            localStorage.setItem('bestScore', JSON.stringify(player));
        } else {
            var checkScore = function () {
                if (player.total < getBest.total) {
                    return getBest
                } else {
                    return player
                }
            };
            var best = checkScore();
            localStorage.setItem('bestScore', JSON.stringify(best));
        }
        
    },
    lostCat: function(cat) {
        $(cat).remove();
        this.missed++;
        $('#missed').text(this.missed);
    },
    catchCat: function(cat) {
        $(cat).stop().remove();
        this.score = this.score + 2;
        $('#score').text(this.score);
    },
    catchBCat: function(cat) {
        $(cat).stop().remove();
        this.score = this.score + 10;
        $('#score').text(this.score)
    },
    rainCats: function(speed) {
        var that = this;
        var fallingCats = setInterval(function() {
            var $cat = $('<div>');
            var horiz = Math.floor(Math.random() * ($body.width() - 100)) + 'px';
            var vert = $body.height() + 50 + 'px';

            $cat.addClass('cat');
            $cat.css({
                left: horiz
            });
            $cat.animate({
                top: vert
            }, speed, function() {
                that.lostCat(this);
            });

            $body.append($cat);

        }, 500);

        var bonusCat = setInterval(function() {
            var $bCat = $('<div>');
            var horiz = Math.floor(Math.random() * ($body.width() - 100)) + 'px';
            var vert = $body.height() + 50 + 'px';

            $bCat.addClass('bonus-cat');
            $bCat.css({
                left: horiz
            });

            $bCat.animate({
                top: vert
            }, speed, function() {
                that.lostCat(this);
            });

            $body.append($bCat);

        }, 8000);


        
        setTimeout(function() {
            clearInterval(fallingCats)
            clearInterval(bonusCat)
            that.clearLevel();
        }, 20000)
    },
    checkLevel: function() {
        console.log(this.level)
        if (this.level == 2) {
            return 'two'
        } else if (this.level == 3) {
            return 'three'
        } else if (this.level == 4) {
            return 'four'
        } else {
            return 'complete'
        }
    },
    clearLevel: function() {
        console.log('logg')
        this.level++;
        $('.cat').stop().remove();
        this['level_' + this.checkLevel()]();
    },
    startGame: function() {
        $('#players-name').text(this.currentPlayer.name)
        $('#game-header').text('Get ready to save some cats!!');
        var that = this;
        this.rainCats(3000);
        var count = 20;
        var timer = setInterval(function() {
            if (count == 0) {
                clearInterval(timer);
            } else {
                count--;
                $('#timer').text('Timer: ' + count);
            }
            
        }, 1000)
       
    },
    level_two: function() {
        $('#game-header').text("It's starting to rain harder");
        $('.clouds').css({
            background: '-webkit-linear-gradient(top, #d6dee4 5%, #9cdeff 100%)'
        });

        var that = this;
        setTimeout(function() {
            that.rainCats(2500)
            var count = 20;
            var timer = setInterval(function() {
                if (count == 0) {
                    clearInterval(timer);
                } else {
                    count--;
                    $('#timer').text('Timer: ' + count);
                }
                
            }, 1000)
        }, 5000)
      
    },
    level_three: function() {
        $('#game-header').text("Wow! Its really coming down now");
        $('.clouds').css({
            background: '-webkit-linear-gradient(top, rgb(201, 207, 212) 5%, rgb(69, 193, 255) 100%) no-repeat center center fixed'
        })


        var that = this;
        setTimeout(function() {
            that.rainCats(2000)
            var count = 20;
            var timer = setInterval(function() {
                if (count == 0) {
                    clearInterval(timer);
                } else {
                    count--;
                    $('#timer').text('Timer: ' + count);
                }
                
            }, 1000)
        }, 5000)
       
    },
    level_four: function() {
        $('#game-header').text("It's a cat hurricane!");
        $('header').css({
            background: '-webkit-linear-gradient(top, #859398 5%, #283048 100%)'
        })
        $('.clouds').css({
            background: '-webkit-linear-gradient(top, #707273 5%, #00689c 100%)'
        });
        $('.clouds').children().css({
            color: 'white',
            textShadow: '1px 0px 0px black'
        })
        $('.clouds').children().children().css({
            color: 'white',
            textShadow: '1px 0px 0px black'
        })
  

        var that = this;
        setTimeout(function() {
            that.rainCats(1500)
            var count = 20;
            var timer = setInterval(function() {
                if (count == 0) {
                    clearInterval(timer);
                } else {
                    count--;
                    $('#timer').text('Timer: ' + count);
                }
                
            }, 1000)
        }, 5000)
       
    },
    level_complete: function() {
        var total = this.score - this.missed;
        this.currentPlayer.total = total;
        this.currentPlayer.played = true;
        this.score = 0;
        this.missed = 0;
        this.level = 1;
        this.switchTurn();
        $body.empty();


        if (this.players[0].played == true && this.players[1].played == true) {

            var winner = this.checkWinner();
            this.checkBestScore(winner);
            $body.empty();
            var $h1 = $('<h1>');
            $h1.text('The Winner is ' + winner.name + ' with a score of ' + winner.total);
            var $reset = $('<button>');
            $reset.addClass('btn');
            $reset.text('Play Again');
            var that = this;
            $reset.on('click', function() {
                that.switchTurn();
                that.currentPlayer.score = 0;
                that.currentPlayer.missed = 0;
                that.level = 1;
                that.currentPlayer.total = 0;
                that.currentPlayer.played = false;
                that.players[1].score = 0;
                that.players[1].missed = 0;
                that.players[1].total = 0;
                that.players[1].played = false;
                $body.empty();
                $body.css({
                    cursor: '-webkit-grab'
                })
                generateGame();
                game.startGame(); 
            });

            $body.append($h1, $reset);            
        } else {
            var $h1 = $('<h1>' + this.currentPlayer.name + ' get Ready<br><h1>Score to beat ' + this.players[0].total + '</h1>');
            $h1.addClass('h1');
            $body.append($h1);
            setTimeout(function() {
                $body.empty();
                generateGame();
                game.startGame()
            }, 10000)
        }
    },
    checkWinner: function() {
        if (this.players[0].total > this.players[1].total) {
            return this.players[0]
        } else {
            return this.players[1]
        }
    }
}
game.currentPlayer = game.players[0];


$form.on('submit', function(e) {
    e.preventDefault();
    var $player1 = $('#player1Name');
    var $player2 = $('#player2Name');
    if ($player1.val() == '' || $player2.val() == '') {
        alert('Please enter both names.')
    } else {
        game.players[0].name = $player1.val();
        game.players[1].name = $player2.val();
        $body.empty();
        $body.css({
            cursor: '-webkit-grab'
        })
        generateGame();
        game.startGame(); 
    }
    
})




$body.on('mouseenter', '.cat', function() {
    game.catchCat(this);
}); 
$body.on('mouseenter', '.bonus-cat', function() {
    game.catchBCat(this);
}); 
