BasicGame.Map = function (music,volume,level,game) {
    //properties of Player
    this.game = game;
    this.music = music; //taustamusa
    this.volume = volume; //sen vola
    this.level = level; //mika leveli on kyseessa eli state
    this.mapp = null;
};

//set Player function prototype
BasicGame.Map.prototype = {
    create: function () {
    this.sky = this.game.add.tileSprite(0,0,800,640,'Atlas','sky.png'); //luodaan paikallaan oleva tausta
    this.sky.fixedToCamera=true;
    
    this.mapp = this.game.add.tilemap(this.level); //luodaan tilemap

    this.mapp.addTilesetImage('16x16'); //mapin kayttama tileset
    //luodaan layerit
    this.layer1 = this.mapp.createLayer('Tile Layer 1'); 
    this.layer1.renderSettings.enableScrollDelta = false;
    this.layer2 = this.mapp.createLayer('Tile Layer 2');
    this.layer2.renderSettings.enableScrollDelta = false;

    this.layer1.resizeWorld();
    //asetetaan tiilet joihin tormataan...eli kaikkiin
    this.mapp.setCollisionBetween(1, 250, true, this.layer1);
    //musiikit looppina soimaan maaritetylla volumella
    this.backgroundMusic = this.game.add.audio(this.music);
    this.backgroundMusic.loop = true;
    this.backgroundMusic.volume = this.volume;
    this.backgroundMusic.play();
    
    }
};


