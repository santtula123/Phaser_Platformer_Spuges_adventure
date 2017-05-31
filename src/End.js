EndGame = {
};

// create Game function in BasicGame
EndGame.Game = function (game) {
};
EndGame.Game.prototype = {
    create: function () {
        //naytetaan scoret
        if (BasicGame.gameWin === false){
            this.game.add.text(80, 80, 'Game over',
            { font: '50px Arial' , fill: '#ffffff' });
        }else{
            this.game.add.text(80, 80, 'Voitit Pelin!!!',
            { font: '50px Arial' , fill: '#ffffff' });
        }
         this.game.add.text(80, 150, 'Pisteet: ' + BasicGame.score,
        { font: '50px Arial' , fill: '#ffffff' });
        
         this.game.add.text(80, 200, 'Ennätyspisteet: ' + BasicGame.highScore,
        { font: '50px Arial' , fill: '#ffffff' });
        //jos scoret ylittaa highscoren niin asetetaan se locastorageen talteen
        if (BasicGame.score > BasicGame.highScore) {
            this.game.add.text(80, 300, 'Uusi Ennätys!!!',
            { font: '50px Arial' , fill: '#ffffff' });
            var paketti = JSON.stringify(BasicGame.score);
            localStorage.setItem("spugeHighscore", paketti);
        }
        this.button = this.game.add.button(350, 500, 'Atlas', this.restart, this, "button_jump_0.png", "button_jump_1.png", "button_jump_0.png");        
        this.game.add.text(80, 400,
                        'Paina "R" näppäintä tai punaista ympyrää uudelleenkäynnistääksesi pelin',
                        { font: '20px Arial' , fill: '#ffffff' });
        this.player = this.game.add.sprite(580, 200, 'Atlas','sp6.png');
        this.player.scale.setTo(2,2);
        this.player.anchor.setTo(.5, 1);
        this.player.animations.add('playerDead', ['sp6.png', 'sp7.png', 'sp8.png'], 7, true);
        this.player.animations.play('playerDead');
        //asetetaan alkuarvoihn jotta restartatessa olisi elama ja pisteet alkuarvoissa.                
        BasicGame.score = 0;
        BasicGame.life = 3;
        BasicGame.stateStartScore = 0;
        BasicGame.gameWin = false;
        //asetetaan nappain R
        var wkey = this.game.input.keyboard.addKey(Phaser.Keyboard.R);
        //mikali painetaan R restartataan peli
        wkey.onDown.addOnce(this.restart, this);
    },
    update: function() {
        this.player.angle += 1;
    },
    restart: function () {
        this.game.state.start('Game');
    }
};


