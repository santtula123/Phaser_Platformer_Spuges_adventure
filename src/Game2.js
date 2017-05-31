BasicGame2 = {
};
BasicGame2.Game = function (game) {
    //luodaan kentassa kaytettavat oliot ja annetaan niille vaadittavat parametrit
    this.game = game;
    this.map = new BasicGame.Map("8BITTIGAMEMUSICA",0.2,'map2',this.game);
    this.tele = new BasicGame.Tele(6288,576,'Boss',this.game);
    this.mystery = new BasicGame.Mystery(this.map,this.game);
    this.texts = new BasicGame.Texts(this.game);
    this.coins = new BasicGame.Coins(this.game,this.map);
    this.player = new BasicGame.Player(true,this.game); //luodaan uusi pelaaja
    this.enemy = new BasicGame.Enemy(this.game,this.map);
    this.enemyFlying = new BasicGame.EnemyFlying(this.game,this.map);    
};
BasicGame2.Game.prototype = {
//kutsutaan olioiden create funtioita ja annetaan parametrit mikali tarve    
create: function () {
    BasicGame.score = BasicGame.stateStartScore; //asetetaan pisteet samaksi kuin staten alussa,koska muuten kuollessa pisteet pysyisivat samana.
    /********MAP**************/
        this.map.create();
    /*********TELE*************/
        this.tele.create(this.map.backgroundMusic);
    /********MYSTERY***********/    
        this.mystery.create();
    /********TEXTS*************/
        this.texts.create();
    /*******COINS**************/
        this.coins.create();
    /*****Player_create********/
        this.player.create();
    /*****Enemy_create********/
        this.enemy.create(this.map.backgroundMusic);
    /*****Enemy_Flying_create********/
        this.enemyFlying.create(this.map.backgroundMusic);
    
},
//kutsutaan olioiden update funktioita ja annetaan tarvittavat parametrit
update: function() {
    this.tele.update(this.player.sprite);
    this.mystery.update(this.player.sprite);
    this.texts.update();
    this.coins.update(this.player.sprite);
    this.player.update(this.map.layer1);
    this.enemy.update(this.player.sprite);
    this.enemyFlying.update(this.player.sprite);
}
};


