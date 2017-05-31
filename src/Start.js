StartGame = {
};
StartGame.Game = function (game) {
};
StartGame.Game.prototype = {
    create: function () {
        //Lisataan tekstit aloitusruutuun
        this.sky = this.game.add.tileSprite(0,0,800,640,'Atlas','sky.png'); //taustalle taivas
        
        this.game.add.text(140, 140, 'Spugen Seikkailu',  //Pelin otsikko
        { font: '70px Sans' ,fontStyle:'bold', fill: '#ffffff' });
        //nappulat ja niita painettaessa kutsuttavat funktiot
        this.button = this.game.add.button(this.game.world.centerX - 150, 300, 'Atlas', this.start, this, "PlayButton.png", "PlayButton.png", "PlayButton.png");
        
        this.button = this.game.add.button(this.game.world.centerX - 150, 450, 'Atlas', this.showHelp, this, "HelpButton.png", "HelpButton.png", "HelpButton.png");
        
        this.insGrp = this.game.add.group();
        
        this.ins = this.game.add.sprite(112,120,'Atlas','help.png');
        //lisataan backbuttoni
        this.backButton = this.game.add.sprite(690, 70, 'Atlas','BackButton.png');
	this.backButton.inputEnabled = true;
	this.backButton.anchor.setTo(0.5,0.5);
	this.backButton.events.onInputDown.add(this.hideHelp,this); //painettaessa backbuttonia kutsutaan hidehelp
        this.game.add.tween(this.backButton.scale).to( { x: 0.95,y:0.95 }, 1000, Phaser.Easing.Linear.None, true, 0, 1000, true); //laitetaan backbuttonille pienta efektia
		
		
	this.insGrp.add(this.ins);
	this.insGrp.add(this.backButton);
	this.insGrp.alpha=0;
    },
    start: function () {
        this.game.state.start('Game'); //aloitetaan itse Game state
    },
    showHelp:function(){
		this.game.add.tween(this.insGrp).to( { alpha:1 }, 1000, Phaser.Easing.none, true); //pistetaan help nakuviin
		this.ins.inputEnabled = true;
		this.ins.events.onInputDown.add(this.hideHelp,this); //painettaessa mista vaan piilotetaan help
    },
    hideHelp:function(){
		this.ins.inputEnabled = false;
		this.game.add.tween(this.insGrp).to( { alpha:0 }, 1000, Phaser.Easing.none, true); //pistetaan help poos nakyvista
    }
};


