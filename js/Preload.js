var Waves = Waves || {};
 
//loading the game assets
 
Waves.Preload = function(){};
 
Waves.Preload.prototype = {
 
  preload: function() {
    
      //Ejemplos

    //this.load.spritesheet('btn_continuar', 'img/common/btn_continuar.png', 150, 38, 2);
    //this.load.image('atras_negro', 'img/common/btn_atras_negro.png');
    //this.load.audio('explosion', 'audio/explosion.ogg');
    //this.game.load.physics("sprite_physics", "balloon.json");     //Poligonos
 
    //load game assets
    this.load.audio('audio_rana', 'audio/rana.mp3');
    this.load.audio('audio_weheee', 'audio/weheee.mp3');
    
    this.load.image('particle_bug', 'img/particula_1.png');
    this.load.image('menu', 'img/menu.jpg');
	this.load.image('play', 'img/play.jpg');
	this.load.image('winner', 'img/winner.png');
    this.load.image('bugP1', 'img/bugP1.png');
	this.load.image('bugP2', 'img/bugP2.png');
	this.load.image('island1', 'img/island1.png');
    this.load.image('island2', 'img/island2.png');
    this.load.image('sidebar1', 'img/sidebarP1.png');
    this.load.image('sidebar2', 'img/sidebarP2.png');
    this.load.image('borderP1', 'img/borderP1.png');
    this.load.image('borderP2', 'img/borderP2.png');	
    this.load.image('tapP1', 'img/tapP1.png');
    this.load.image('tapP2', 'img/tapP2.png');	
    this.load.spritesheet('ss_rana', 'img/ss_rana.png', 143, 140, 11);
   
    this.game.load.physics("sprite_physics", "poligonos.json");
  },
 
  create: function() {
      //scaling options
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.state.start('Menu');
  }
 
};
