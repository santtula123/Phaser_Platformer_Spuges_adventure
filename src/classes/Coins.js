BasicGame.Coins = function (game, map) {
    //properties of Player
    this.game = game;
    this.map = map;
};
BasicGame.Coins.prototype = {
    create: function () {
    //  luodaan kolikko ryhma
    this.coins = this.game.add.group();
    this.coins.enableBody = true;

    //  luodaan object groyp coin:sista gidilla 34 kolikoita
    this.map.mapp.createFromObjects('Coin', 34, 'Atlas', 0, true, false, this.coins);

    //  Lisataan animaatiot kolikoille
    this.coins.callAll('animations.add', 'animations', 'spin', ["0.png", "1.png", "2.png", "3.png", "4.png", "5.png"], 10, true);
    this.coins.callAll('animations.play', 'animations', 'spin');
    //lisataan efektit
    this.coinSound = this.game.add.audio('coinSound');
    
    },
    //jos pelaaja osuu kolikkoon
    update: function (playersprite) {;;
            this.game.physics.arcade.overlap(playersprite, this.coins, this.collectCoin, null, this);
    },
    //tuhotaan kolikko, soitetaan aani, lisataan piste
    collectCoin: function(player, coin) {
        coin.kill();
        this.coinSound.play();
        BasicGame.score += 1;
    }
};


