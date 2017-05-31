BasicGame.Boss = function (x,y,distance,game) {
    this.x = x;
    this.y = y;
    this.distance = distance;
    this.game = game;
    this.sprite = null;
};
BasicGame.Boss.prototype = {
    create: function (backgroundMusic) {
        this.spriteLives = 3; //bossin elemat
        this.hitTimer = this.game.time.time; //osuma ajastin
        this.facing = 'right';
        //luodaan sprite ja sen animaatiot
        this.sprite = this.game.add.sprite(this.x, this.y, 'Atlas',"b6.png");
        this.sprite.animations.add('left', ['b6.png', 'b7.png', 'b8.png', 'b9.png', 'b10.png', 'b11.png'], 9, true);
        this.sprite.animations.add('right', ['b0.png', 'b1.png', 'b2.png', 'b3.png', 'b4.png', 'b5.png'], 9, true);
        //asetaan fysiikat bossille
        this.game.physics.enable(this.sprite);
        this.sprite.body.gravity.y = 250;
        this.sprite.body.bounce.y = 0.7;
        
        this.sprite.x = this.x;
        this.previous_x = this.sprite.x;
        this.sprite.body.velocity.x = -175;
        //lisataan aanet
        this.deadSound = this.game.add.sound('deadSound');
        this.bottleDeadSound = this.game.add.sound('bottleDeadSound');
        this.bossNoHit = this.game.add.sound('bossNoHit');
        this.backgroundMusic = backgroundMusic;
    },
    update: function (layer1,player) {
        this.game.physics.arcade.collide(this.sprite, layer1); //boss tormaa layer1 kanssa
        this.game.physics.arcade.collide(this.sprite, player, this.hitEnemy, null, this); //mikali boss osuu spriteen...
        if (this.sprite.body.velocity.x <= 1){ //nopeuden/suunnan mukaan paatetaan mika animaatio toistetaan
            this.facing = 'left';
        }else{
            this.facing = 'right';
        }
        this.sprite.animations.play(this.facing);
    // vaihda suuntaa jos on kavelty distancen verran
    if (Math.abs(this.sprite.x - this.previous_x) >= this.distance) {
        this.sprite.body.velocity.x *= -1;
        this.previous_x = this.sprite.x;
    }
    //jos bossi on maassa niin randomin verran hyppya ylos
    if (this.sprite.body.onFloor())
        {
            this.sprite.body.velocity.y = -(Math.floor((Math.random() * 500) + 100));
        }
    },
    hitEnemy: function (enemy, player) {;
        // jos pelaaja osuu bossin paalle ja edellisesta on kulunut 3sekunttia
        if (enemy.body.touching.up && this.game.time.time > this.hitTimer) {
            this.hitTimer = this.game.time.time + 3000;
            this.bottleDeadSound.play();
            player.body.velocity.y = -300;
            this.spriteLives -= 1;
            if(this.spriteLives <= 0){
                this.backgroundMusic.destroy();
                BasicGame.gameWin = true;
                this.game.state.start('End');
            }
        }
        // jos pelaaja osuu bossin paalle ja edellisesta ei ole kulunut 3sekunttia
        else if (enemy.body.touching.up && this.game.time.time <= this.hitTimer){
            this.bossNoHit.play();
            player.body.velocity.y = -500;
        }
        //jos pelaaja osuu muualle kuin bossin paalle
        else {
            this.backgroundMusic.destroy();
            this.deadSound.play();
            this.game.state.restart('Boss');
            BasicGame.life -=1;
            if (BasicGame.life <= 0){
                BasicGame.gameWin = false;
                this.game.state.start('End');
            }
        }
    }
};


