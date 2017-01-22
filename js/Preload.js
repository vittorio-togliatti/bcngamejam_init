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
    this.load.image('menuMakeyMakey', 'img/menuMakeyMakey.jpg');
	this.load.image('menuPointerEvents', 'img/menuPointerEvents.jpg');
	this.load.image('playMakeyMakey', 'img/playMakeyMakey.jpg');
	this.load.image('playPointerEvents', 'img/playPointerEvents.jpg');
    this.load.image('winnerMakeyMakey', 'img/winnerMakeyMakey.jpg');
	this.load.image('winnerPointerEvents', 'img/winnerPointerEvents.jpg');
    this.load.image('bugP1', 'img/bugP1.png');
	this.load.image('bugP2', 'img/bugP2.png');
    this.load.image('sidebarP1MakeyMakey', 'img/sidebarP1MakeyMakey.png');
	this.load.image('sidebarP1PointerEvents', 'img/sidebarP1PointerEvents.png');
    this.load.image('sidebarP2MakeyMakey', 'img/sidebarP2MakeyMakey.png');
	this.load.image('sidebarP2PointerEvents', 'img/sidebarP2PointerEvents.png');	
    this.load.image('borderP1', 'img/borderP1.png');
    this.load.image('borderP2', 'img/borderP2.png');
    this.load.image('tapP1', 'img/tapP1.png');
    this.load.image('tapP2', 'img/tapP2.png');	
    this.load.image('sidebarBugP1MakeyMakey', 'img/sidebarBugP1MakeyMakey.png');
	this.load.image('sidebarBugP1PointerEvents', 'img/sidebarBugP1PointerEvents.png');	
    this.load.image('sidebarBugP2MakeyMakey', 'img/sidebarBugP2MakeyMakey.png');
	this.load.image('sidebarBugP2PointerEvents', 'img/sidebarBugP2PointerEvents.png');	
	
    this.load.spritesheet('ss_rana', 'img/ss_rana.png', 143, 140, 11);
	this.load.spritesheet('ss_waves', 'img/ss_waves.png', 201, 201, 8 );
    this.load.spritesheet('ss_isla1', 'img/anim_isla1.png', 100, 100, 3);
    this.load.spritesheet('ss_isla2', 'img/anim_isla2.png', 100, 100, 3);
    this.load.spritesheet('ss_pez', 'img/pez_anim.png', 27, 59, 4);

    this.load.image('winnerDark', 'img/winnerDark.png');
	this.load.image('winnerDD', 'img/winnerDD.png');
	this.load.image('winnerHojas', 'img/winnerHojas.png');
	this.load.image('winnerLW', 'img/winnerLW.png');
	this.load.image('winnerWL', 'img/winnerWL.png');

   
    this.game.load.physics("sprite_physics", "poligonos.json");
  },
 
  create: function() {
      //scaling options
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.state.start('Menu');
  }
 
};
