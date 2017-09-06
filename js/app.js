var $body = $('body');

var game = {
    score: 0,
    gameHeader: $('#game-header'),
    missed: 0,
    level: 1,
    lostCat: function(cat) {
        $(cat).remove();
        this.missed++;
        this.checkMissed();
    },
    catchCat: function(cat) {
        $(cat).stop().remove();
        this.score++;
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
                console.log(that.missed)
            });

            $body.append($cat);

        }, 3000);
        
        setTimeout(function() {
            clearInterval(fallingCats)
            that.clearLevel();
        }, 6000)
    },
    checkLevel: function() {
        if (this.level == 2) {
            return 'two'
        } else if (this.level == 3) {
            return 'three'
        } else if (this.level == 4) {
            return 'four'
        } else if (this.level == 5) {
            return 'final'
        } else {
            return 'complete'
        }
    },
    clearLevel: function() {
        this.level++;
        this.missed = 0;
        $('.cat').stop();
        this['level_' + this.checkLevel()]();
    },
    startGame: function() {
        this.gameHeader.text('Get ready to save some cats!!');
        var that = this;
        this.rainCats(3000);
        $body.on('click', '.cat', function() {
            that.catchCat(this);
        });
    },
    level_one: function() {
        var that = this;
        this.rainCats(3000);
        $body.on('click', '.cat', function() {
            that.catchCat(this);
        });
    },
    level_two: function() {
        this.gameHeader.text("Congrats! Get Ready for Level 2!");
        var that = this;
        this.rainCats(2500);
        $body.on('click', '.cat', function() {
            that.catchCat(this);
        });
    }
}

game.startGame();
