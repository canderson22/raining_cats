var $body = $('body');

var generateGame = function() {
    var $header = $('<header>');
    var $div1 = $('<div class="clouds cloud1"><span id="players-name">');
    var $div2 = $('<div class="clouds cloud2"><span id="game-header">');
    var $div3 = $('<div class="clouds cloud1"><span>Score: <span id="score">');
    var $div4 = $('<div class="clouds cloud2"><span>Missed: <span id="missed">');
    var $footer = $('<footer>');
    $header.append($div1, $div2, $div3, $div4);
    $body.append($header, $footer);

}

generateGame();

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
    lostCat: function(cat) {
        $(cat).remove();
        this.missed++;
        this.missCard.text(this.missed);
    },
    catchCat: function(cat) {
        $(cat).stop().remove();
        this.score = this.score + 1;
        this.scoreCard.text(this.score);
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
        this.namePlace.text(this.currentPlayer.name)
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
        var total = this.score - this.missed;
        this.currentPlayer.total = total;
        this.currentPlayer.played = true;
        this.switchTurn();
        $body.empty();
        var $h1 = $('<h1>Player 2 get Ready</h1>');
        $h1.animate({
            left: '250px',
            top: '300px',
            fontSize: 'x-large'
        }, 2000, function() {
            $h1.remove();
        });
        $body.append($h1);
    }
}



game.currentPlayer = game.players[0];

game.startGame();

$body.on('click', '.cat', function() {
    game.catchCat(this);
}); 
