var Waves = Waves || {};
 
Waves.Menu = function() {};


Waves.Menu.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
  
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	  this.game.add.sprite( 0, 0, 'menu', 0 );
      
    this.input.onDown.add( this.onMouseDownCallback, this );
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    }, 
 
  onMouseDownCallback: function() {
     this.state.start('Play');
    }
    
};


