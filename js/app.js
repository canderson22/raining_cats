var $body = $('body');

var game = {
    score: 0,
    gameHeader: $('#game-header'),
    clouds: $('.clouds'),
    namePlace: $('#players-name'),
    scoreCard: $('#score'),
    missCard: $('#missed'),
    missed: 0,
    level: 1,
    players: [
        {
            name: 'Player 1',
            score: 0,
            missed: 0,
            played: false
        },
        {
            name: 'Player 2',
            score: 0,
            missed: 0,
            played: false
        }
    ],
    switchTurn: function() {
        if (this.currentPlayer == players[0]) {
            this.currentPlayer = players[1];
        }
    },
    lostCat: function(cat) {
        $(cat).remove();
        this.missed++;
        this.missCard.text(this.missed);
        this.checkMissed();
    },
    catchCat: function(cat) {
        $(cat).stop().remove();
        this.score = this.score + 1;
        this.scoreCard.text(this.score);
    },
    checkMissed: function() {
        if (this.missed > 3) {
            console.log('too many')
        }
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

        }, 3000);
        
        setTimeout(function() {
            clearInterval(fallingCats)
            that.clearLevel();
        }, 30000)
    },
    checkLevel: function() {
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
        this.level++;
        $('.cat').stop();
        this['level_' + this.checkLevel()]();
    },
    startGame: function() {
        this.namePlace.text(this.players[0].name)
        this.gameHeader.text('Get ready to save some cats!!');
        var that = this;
        this.rainCats(3000);
       
    },
    level_two: function() {
        this.gameHeader.text("Congrats! Get Ready for Level 2!");
        this.clouds.css({
            background: '-webkit-linear-gradient(top, #d6dee4 5%, #9cdeff 100%)'
        })
        var that = this;
        this.rainCats(2500);
      
    },
    level_three: function() {
        this.gameHeader.text("Congrats! Get Ready for Level 3!");
        this.clouds.css({
            background: '-webkit-linear-gradient(top, rgb(201, 207, 212) 5%, rgb(69, 193, 255) 100%)'
        })
        var that = this;
        this.rainCats(2000);
       
    },
    level_four: function() {
        this.gameHeader.text("Congrats! Get Ready for Level 4!");
        this.clouds.css({
            background: '-webkit-linear-gradient(top, #707273 5%, #00689c 100%)'
        });
        this.gameHeader.css({
            color: 'white',
            textShadow: '1px 0px 0px black'
        })
        var that = this;
        this.rainCats(1500);
       
    },
    level_complete: function() {
        var total = this.score + this.missed;
        alert(total)
        $body.empty();
    }
}

$body.on('click', '.cat', function() {
    game.catchCat(this);
}); 

game.currentPlayer 

game.startGame();
