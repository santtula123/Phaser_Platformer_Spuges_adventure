BasicGame.Texts = function (game) {
    this.game = game;
};
BasicGame.Texts.prototype = {
    create: function () {
        this.timer = this.game.time.time;  //luodaan ajastin  
        /*******************score*******************************/
        //pisteet peliin
        this.scoreText = this.game.add.text(16, 16, 'Pisteet: ' + BasicGame.score, {fontSize: '32px', fill: '#FFFFFF'});
        this.scoreText.fixedToCamera=true;    
        /*******************highScore*******************************/
        //haetaan localstoragesta highscoret mikali löytyy
        if (localStorage.getItem("spugeHighscore") !== null) {
            BasicGame.highScore = JSON.parse(localStorage.getItem('spugeHighscore'));
        }
        this.HighscoreText = this.game.add.text(340, 16, 'Ennätyspisteet: ' + BasicGame.highScore, {fontSize: '32px', fill: '#FFFFFF'});
        this.HighscoreText.fixedToCamera=true;
        /*******************Life*******************************/
        //elamat nakyviin peliin
        this.lifeText = this.game.add.text(660, 16, 'Elämä: ' + BasicGame.life, {fontSize: '32px', fill: '#FFFFFF'});
        this.lifeText.fixedToCamera=true;   
    },
    update: function () {;
        //kutsutaan 2 kertaa sekunnissa eli 60/2=30 ruudun valein...saastetaan resursseja ja pieni viive pisteiden tulossa on hyva juttu :)
        if (this.game.time.time > this.timer){
            this.scoreText.text = 'Pisteet: ' + BasicGame.score;
            this.timer = this.game.time.time + 500;
        }    
    }

};


