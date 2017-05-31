(function () {

   // luodaan Phaser peli ja laitetaan se 'game' diviin, 800,640:koko, Phaser.AUTO: WEbGl sallittu mikäli tuettu
    var game = new Phaser.Game(800,640, Phaser.AUTO, 'game');

    //  Lisataan peliin statet ja nimetaan ne
    game.state.add('Load', LoadGame.Game);
    game.state.add('Start', StartGame.Game);
    game.state.add('Boss', BossGame.Game);    
    game.state.add('Game', BasicGame.Game);
    game.state.add('Game2', BasicGame2.Game);
    game.state.add('End', EndGame.Game);
    
    //  Aloitetaan Load statesta
    game.state.start('Load');

})();

