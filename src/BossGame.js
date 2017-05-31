BossGame = {
};
BossGame.Game = function (game) {
 //luodaan kentassa kaytettavat oliot ja annetaan niille vaadittavat parametrit     
    this.game = game;
    this.map = new BasicGame.Map('bossBackground',1,"boss",this.game);
    this.texts = new BasicGame.Texts(this.game);
    this.player = new BasicGame.Player(false,this.game); //luodaan uusi pelaaja
    this.boss = new BasicGame.Boss(650,300,600,this.game);
};
BossGame.Game.prototype = {
 //kutsutaan olioiden create funtioita ja annetaan parametrit mikali tarve   
create: function () {
    BasicGame.score = BasicGame.stateStartScore; //asetetaan pisteet samaksi kuin staten alussa,koska muuten kuollessa pisteet pysyisivat samana.
    /********MAP**************/
        this.map.create();
    /********TEXTS*************/
        this.texts.create();
    /*****Player_create********/
        this.player.create();
    /*****BOSS_CREATE**********/
        this.boss.create(this.map.backgroundMusic);
            
},
//kutsutaan olioiden update funktioita ja annetaan tarvittavat parametrit
update: function() {
    this.texts.update();
    this.player.update(this.map.layer1);
    this.boss.update(this.map.layer1,this.player.sprite);
}
};


