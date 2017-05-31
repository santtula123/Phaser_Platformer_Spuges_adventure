BasicGame.Player = function (cameraFollow,game) {
    //properties of Player
    this.game = game;
    this.cameraFollow = cameraFollow; //seuraako kamera vai ei -> boolean
    this.sprite = null;
};
BasicGame.Player.prototype = {
    create: function () {
    this.facing = 'left';
    this.jumpTimer = 0; //luodaan hyppyajastin   
    this.sprite = this.game.add.sprite(100, 200, 'Atlas','sp6.png'); //luodaan sprite
    //luodaan animaatiot
    this.sprite.animations.add('left', ['sp3.png', 'sp4.png', 'sp5.png'], 9, true);
    this.sprite.animations.add('turn', ['sp6.png'], 20, true);
    this.sprite.animations.add('right', ['sp0.png', 'sp1.png', 'sp2.png'], 9, true);
    //fysiikkojen asetukset
    this.game.physics.enable(this.sprite);
    this.sprite.body.gravity.y = 250;
    this.sprite.body.bounce.y = 0.5;
    //olion luonnissa maaritetty kameran seuraus on/off??
    if (this.cameraFollow === true){
        this.game.camera.follow(this.sprite);
    }
    //liikkumisen nappulat ja mobiilin tarkoitetut pallurat
    this.cursors = this.game.input.keyboard.createCursorKeys();
    this.jumpButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    left = false;
    right=false;
    jump=false;
    
    // luodaan virtuaali kontrollerin nappulat
    this.buttonjump = this.game.add.button(660, 540, 'Atlas', null, this, "button_jump_0.png", "button_jump_1.png", "button_jump_0.png");  //game, x, y, key, callback, callbackContext, overFrame, outFrame, downFrame, upFrame
    this.buttonjump.fixedToCamera = true;  //our buttons should stay on the same place  
    this.buttonjump.events.onInputOver.add(function(){jump=true;});
    this.buttonjump.events.onInputOut.add(function(){jump=false;});
    this.buttonjump.events.onInputDown.add(function(){jump=true;});
    this.buttonjump.events.onInputUp.add(function(){jump=false;});
    
    this.buttonleft = this.game.add.button(0, 550, 'Atlas', null, this, "Button_move01.png", "Button_move02.png", "Button_move01.png");
    this.buttonleft.fixedToCamera = true;
    this.buttonleft.events.onInputOver.add(function(){left=true;});
    this.buttonleft.events.onInputOut.add(function(){left=false;});
    this.buttonleft.events.onInputDown.add(function(){left=true;});
    this.buttonleft.events.onInputUp.add(function(){left=false;});
    
    this.buttonright = this.game.add.button(160, 550, 'Atlas', null, this, "Button_move01.png", "Button_move02.png", "Button_move01.png");
    this.buttonright.fixedToCamera = true;
    this.buttonright.events.onInputOver.add(function(){right=true;});
    this.buttonright.events.onInputOut.add(function(){right=false;});
    this.buttonright.events.onInputDown.add(function(){right=true;});
    this.buttonright.events.onInputUp.add(function(){right=false;});
    
    //luodaan hyppyaani
    this.jumpSound = this.game.add.audio('jumpSound');
    
    },
    update: function (layer1) {   
    this.game.physics.arcade.collide(this.sprite, layer1); //tormaytetaan pelaaja layer 1 kanssa
    this.sprite.body.velocity.x = 0;
    //tarkastellaan pelaajan painallukset
    if (this.cursors.left.isDown || left)
    {
        this.sprite.body.velocity.x = -150;

        if (this.facing !== 'left')
        {
            this.sprite.animations.play('left');
            this.facing = 'left';
        }
    }
    else if (this.cursors.right.isDown || right)
    {
        this.sprite.body.velocity.x = 150;

        if (this.facing !== 'right')
        {
            this.sprite.animations.play('right');
            this.facing = 'right';
        }
    }
    else
    {
        if (this.facing !== 'idle')
        {
            this.sprite.animations.stop();

            if (this.facing === 'left')
            {
                this.sprite.frame = 'sp6.png';
            }
            else
            {
                this.sprite.frame = 'sp7.png';
            }

            this.facing = 'idle';
        }
    }
        //hahmon tulee olla maassa ja hyppyjen valissa tulee olla 750ms
        if ((this.jumpButton.isDown || jump )&& this.sprite.body.onFloor() && this.game.time.time > this.jumpTimer)
        {
            this.sprite.body.velocity.y = -350;
            this.jumpSound.play();
            this.jumpTimer = this.game.time.time + 750;
        }
        //koitetaan korjata virhetta jos nappulat alkavat sekoilemaan
        if (!this.game.input.activePointer.isMouse){ right=false; left=false; jump=false;}     

    }
};


