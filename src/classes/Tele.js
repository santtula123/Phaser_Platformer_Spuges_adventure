BasicGame.Tele = function (x,y,nextLevel,game) {
    //telen sijainti
    this.x = x;
    this.y = y;
    this.game = game;
    //mille levelille tele vie eli mille statelle
    this.nextLevel = nextLevel;
    this.sprite = null;
};
BasicGame.Tele.prototype = {
    create: function (backgroundMusic) {
        this.timer = this.game.time.time;  //luodaan ajastin  
        this.sprite = this.game.add.sprite(this.x, this.y, 'Atlas',"tele1.png"); //luodaan tele sprite kohtaan x y
        this.game.physics.arcade.enable(this.sprite); //fysiikat paalle
        this.sprite.body.moves = false; //ei saa liikkua
        this.sprite.animations.add('teleMove', ["tele1.png", "tele2.png", "tele3.png"], 9, true); //luodaan animaatio
        this.sprite.animations.play('teleMove'); 
        //luodaan aanet
        this.teleSound = this.game.add.audio('teleSound');
        this.backgroundMusic = backgroundMusic;
    },
    update: function (player) {
        //tarkistetaan 400millisekunnin valein onko telen kanssa ovelapattu
        if (this.game.time.time > this.timer){
            this.game.physics.arcade.overlap(this.sprite, player, this.changeState, null, this);
            this.timer = this.game.time.time + 400;
        }             
    },
    changeState: function (player){
        this.backgroundMusic.destroy(); //musiikit pois
        BasicGame.stateStartScore = BasicGame.score; //talletetaan edellisen staten pisteet
        this.teleSound.play(); //soitetaan telen efekti
        this.game.state.start(this.nextLevel); //ja olion luonnissa maaritetylle statelle siirtyminen
    }
};


