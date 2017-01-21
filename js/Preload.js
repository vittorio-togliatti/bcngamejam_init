var SideScroller = SideScroller || {};
 
//loading the game assets
 
SideScroller.Preload = function(){};
 
SideScroller.Preload.prototype = {
 
  preload: function() {
    
      //Ejemplos

    //this.load.spritesheet('btn_continuar', 'img/common/btn_continuar.png', 150, 38, 2);
    //this.load.image('atras_negro', 'img/common/btn_atras_negro.png');
    //this.load.audio('explosion', 'audio/explosion.ogg');
    //this.game.load.physics("sprite_physics", "balloon.json");     //Poligonos
 
    //load game assets
    this.load.image('bkg_menu', 'jam_img/main.png');
    this.load.image('bugP1', 'jam_img/bugP1.png');
	this.load.image('bugP2', 'jam_img/bugP2.png');
	this.load.image('island1', 'jam_img/island_1.png');
    this.load.image('island2', 'jam_img/island_2.png');
    this.load.image('sidebar1', 'jam_img/sidebar.jpg');
    this.load.image('sidebar2', 'jam_img/sidebar.jpg');	
      
    this.load.spritesheet('ss_rana', 'jam_img/rana.png', 143, 140, 11);
   
    this.game.load.physics("sprite_physics", "poligonos.json");
  },
 
  create: function() {
      //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      this.state.start('Menu');
  }
 
};
