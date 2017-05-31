BasicGame.Enemy = function (game,map) {
    this.game = game;
    this.map = map;
    this.sprite = null;
};
BasicGame.Enemy.prototype = {
    create: function (backgroundMusic) {
        this.sprite = this.game.add.group(); //luodaan ryhma
        //luodaan enemy object groupista gid:34 pulloja
        this.map.mapp.createFromObjects('Enemy', 34, 'Atlas', "bottle.png", true, false, this.sprite);
        this.sprite.forEach(function(item) {
            //laitetaan kaikille fysiikat kohdalleen
            this.game.physics.enable(item);
            item.body.velocity.x = -50;
            item.previous_x = item.x; //aloitus paikka mista lahdettiin liikkeelle
        }, this);
        //lisataan aanet
        this.deadSound = this.game.add.sound('deadSound');
        this.bottleDeadSound = this.game.add.sound('bottleDeadSound');
        this.backgroundMusic = backgroundMusic;
    },
    update: function (player) {
    //jos pelaaja osuu pullon kanssa
    this.sprite.forEach(function(item) {
        this.game.physics.arcade.overlap(item, player, this.hitEnemy, null, this);
        // vaihda suuntaa jos on kavelty distancen verran HUOM! distance tulee map-json tiedostostosta
        if (Math.abs(item.x - item.previous_x) >= item.distance) {
            item.body.velocity.x *= -1;
            item.previous_x = item.x;
        }
    },this);
    },
    hitEnemy: function (enemy, player) {
        // jos osutaan vihun ylaosaan vihu kuolee
        if (enemy.body.touching.up && !(enemy.body.touching.right && enemy.body.touching.left)) {
            enemy.kill();
            this.bottleDeadSound.play();
            BasicGame.score += 1;
        //muuten kuollaan itse    
        } else {
            this.backgroundMusic.destroy();
            this.deadSound.play();
            this.game.state.restart('Game');
            BasicGame.life -=1;
            if (BasicGame.life <= 0){
                this.game.state.start('End');
            }
        }
    }  
};


