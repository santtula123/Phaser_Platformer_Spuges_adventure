BasicGame.Mystery = function (map,game) {
    this.map = map;
    this.game = game;
    this.sprite = null;
};
BasicGame.Mystery.prototype = {
    create: function () {
    //  luodaan mystery ryhma ja laitetaan niille vartalo
    this.mystery = this.game.add.group();
    this.mystery.enableBody = true;
    

    // luodaan object group mysterysta gid:34 mystery boxeja
    this.map.mapp.createFromObjects('Mystery', 34, 'Atlas', "question_1.png", true, false, this.mystery);
    
    this.mystery.forEach(function(item) {
            //asetetaan tormays tarkistukset jokaiselle
            item.body.checkCollision.left = false;
            item.body.checkCollision.right = false;
            item.body.checkCollision.up = false;
        }, this); 
    //  lisataan animaatiot ja pistetaan ne pyorimaan
    this.mystery.callAll('animations.add', 'animations', 'mysteryMove', ["question_1.png", "question_2.png", "question_3.png"], 8, true);
    this.mystery.callAll('animations.play', 'animations', 'mysteryMove');
    //listaan efekti boxille
    this.mysterySound = this.game.add.sound('mysterySound');
    },
    update: function (playersprite) {;
    //tarkastellaan onko yhteenkaan mysteryyn tormatty
    this.mystery.forEach(function(item) {
        if(this.game.physics.arcade.collide(item, playersprite) && item.body.touching.down){
            this.collectCoin(item, playersprite);
        }
    }, this); 


    },
    collectCoin: function(mystery, player) {
        mystery.kill(); //tuhotaan mystery box
        this.mysterySound.play(); //soitetaan efekti
        BasicGame.score += 5; //lisataan ruhtinaalliset viisi pistetta :)
    }
};


