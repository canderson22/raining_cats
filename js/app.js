var $body = $('body');
var $btn = $('.btn');

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
    lostCat: function(cat) {
        $(cat).remove();
        this.missed++;
        $('#missed').text(this.missed);
    },
    catchCat: function(cat) {
        $(cat).stop().remove();
        this.score = this.score + 1;
        $('#score').text(this.score);
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
        $('.cat').stop().remove();
        this['level_' + this.checkLevel()]();
    },
    startGame: function() {
        $('#players-name').text(this.currentPlayer.name)
        $('#game-header').text('Get ready to save some cats!!');
        var that = this;
        this.rainCats(3000);
       
    },
    level_two: function() {
        $('#game-header').text("Get Ready for Level 2!");
        $('.clouds').css({
            background: '-webkit-linear-gradient(top, #d6dee4 5%, #9cdeff 100%)'
        })
        var that = this;
        setTimeout(this.rainCats(2500), 5000);
      
    },
    level_three: function() {
        $('#game-header').text("Get Ready for Level 3!");
        $('.clouds').css({
            background: '-webkit-linear-gradient(top, rgb(201, 207, 212) 5%, rgb(69, 193, 255) 100%)'
        })
        var that = this;
        setTimeout(this.rainCats(2000), 10000);
       
    },
    level_four: function() {
        $('#game-header').text("Get Ready for Level 4!");
        $('.clouds').css({
            background: '-webkit-linear-gradient(top, #707273 5%, #00689c 100%)'
        });
        $('.clouds').children().css({
            color: 'white',
            textShadow: '1px 0px 0px black'
        })
        var that = this;
        setTimeout(this.rainCats(1500), 10000);
       
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
            this.checkWinner();
        } else {
            var $h1 = $('<h1>Player 2 get Ready</h1>');
            var $h2 = $('<h2>Score to beat ' + this.players[0].total)
            $h1.addClass('h1');
            $body.append($h1);
            setTimeout(function() {
                $body.empty();
                generateGame();
                game.startGame()
            }, 6000)
        }
    },
    checkWinner: function() {
        alert('good')
    }
}
game.currentPlayer = game.players[0];


$btn.on('click', function() {
    $body.empty();
    $body.css({
        cursor: '-webkit-grab'
    })
    generateGame();
    game.startGame();
})




$body.on('mouseenter', '.cat', function() {
    game.catchCat(this);
}); 
