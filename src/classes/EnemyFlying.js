BasicGame.EnemyFlying = function (game,map) {
    //properties of Player
    this.game = game;
    this.map = map;
    this.sprite = null;
};
BasicGame.EnemyFlying.prototype = {
    create: function (backgroundMusic) {
    this.sprite = this.game.add.group(); //luodaa ryhma
    //luodaan enemyfly object groupista gid:34 lentavia vihuja
    this.map.mapp.createFromObjects('EnemyFly', 34, 'Atlas', "enemyFl.png", true, false, this.sprite);
    this.sprite.forEach(function(item) {
        //asetetaan kaikille fysiikat
        item.anchor.set(0.5);
        this.game.physics.enable(item);
        //item.body.setCircle(75); toimii hiukan uudemmassa phaser kirjastossa
        //item.pivot.x = 100; tama tieto tulee mappi.json filusta properties esim. "pivot.x":"150" tyyppiä string
        item.body.moves = false; //pidetaan body paikallaan.
    }, this);
    //lisataan aanet
    this.deadSound = this.game.add.sound('deadSound');
    this.backgroundMusic = backgroundMusic;
    },

    update: function (player) {
    //tarkastellaan onko osuttu pelaajan ja pyoritellaan vihua
    this.sprite.forEach(function(item) {
        this.game.physics.arcade.overlap(item, player, this.hitFlyEnemy, null, this);
        item.rotation += 0.05;
    }, this);    
    },
    hitFlyEnemy: function (player) {
        this.backgroundMusic.destroy(); //taustamusat pois
        this.deadSound.play(); //efektia soimaan
        this.game.state.restart('Game'); //aloitetaan kentta alusta
        BasicGame.life -=1; //vahennetaan elamaa
        if (BasicGame.life <= 0){ //jos elema loppuu niin peli loppuu :(
            this.game.state.start('End');
        }
    }
};


