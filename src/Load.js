LoadGame = {
};

LoadGame.Game = function (game) {
};

LoadGame.Game.prototype = {
    
    //scaalaus init() funktiossa
    init: function () {
        // set up input max pointers
        this.input.maxPointers = 2;
        // set up stage disable visibility change
        //this.stage.disableVisibilityChange = true;
        // Set up the scaling method used by the ScaleManager
        // Valid values for scaleMode are:
        // * EXACT_FIT
        // * NO_SCALE
        // * SHOW_ALL
        // * RESIZE
        // See http://docs.phaser.io/Phaser.ScaleManager.html for full document
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //this.scale.setScreenSize(true);
        // If you wish to align your game in the middle of the page then you can
        // set this value to true. It will place a re-calculated margin-left
        // pixel value onto the canvas element which is updated on orientation 
        // resizing events. It doesn't care about any other DOM element that may
        // be on the page, it literally just sets the margin.
        //this.scale.pageAlignHorizontally = true;
        //this.scale.pageAlignVertically = true;
        // Force the orientation in landscape or portrait.
        // * Set first to true to force landscape. 
        // * Set second to true to force portrait.
        //this.scale.forceOrientation(false, false);
        // Sets the callback that will be called when the window resize event
        // occurs, or if set the parent container changes dimensions. Use this 
        // to handle responsive game layout options. Note that the callback will
        // only be called if the ScaleManager.scaleMode is set to RESIZE.
        //this.scale.setResizeCallback(this.gameResized, this);
        // Set screen size automatically based on the scaleMode. This is only
        // needed if ScaleMode is not set to RESIZE.
        //this.scale.updateLayout(true);
        // Re-calculate scale mode and update screen size. This only applies if
        // ScaleMode is not set to RESIZE.
        //this.scale.refresh();
    
    },
    preload: function () {
        this.game.add.text(240, 340, 'Ladataan...',
        { font: '70px Sans' ,fontStyle:'bold', fill: '#ffffff' }); //enenkuin paastaan menuun naytetaan kayttajalle lataus teksti
        /*****************Ladataan kartat *****************/
        this.game.load.tilemap('map1', 'assets/map/map1.json',  null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('map2', 'assets/map/map2.json',  null, Phaser.Tilemap.TILED_JSON);
        this.game.load.tilemap('boss', 'assets/map/boss.json',  null, Phaser.Tilemap.TILED_JSON);
        /**************Ladataan kuvat(atlas ja tilesetti) ***********/
        this.game.load.atlasJSONHash('Atlas', 'assets/Atlas.png', 'assets/Atlas.json');
        this.game.load.image('16x16', 'assets/16x16.png');
        /************Ladataan pelin musiikit ja aanet *********/
        this.game.load.audio('coinSound', 'assets/Sounds/coin.ogg');
        this.game.load.audio('jumpSound', 'assets/Sounds/jump.ogg');
        this.game.load.audio('deadSound', 'assets/Sounds/dead.ogg');
        this.game.load.audio('mysterySound', 'assets/Sounds/mystery.ogg');
        this.game.load.audio('teleSound', 'assets/Sounds/tele.ogg');
        this.game.load.audio('bottleDeadSound', 'assets/Sounds/bottleDead.ogg');
        this.game.load.audio('bossNoHit', 'assets/Sounds/bossNoHit.ogg');
        this.game.load.audio('bossBackground', 'assets/Sounds/bossBackground.ogg');
        this.game.load.audio('8BITTIGAMEMUSICA', 'assets/Sounds/8BITTIGAMEMUSICA.ogg');
        
    },
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE); //kaynnistetaan fysiikat
        this.game.state.start('Start'); //siirrytaan start stateen
    }
};
