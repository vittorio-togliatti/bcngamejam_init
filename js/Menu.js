var Waves = Waves || {};
 
Waves.Menu = function() {};


Waves.Menu.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
  
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.add.sprite( 0, 0, 'menu', 0 );
      
		this.game.input.keyboard.onDownCallback = this.onKeyDownCallback.bind( this );
		
		this.input.onDown.add( this.onMouseDownCallback, this );
		
		this.playClickArea = new PIXI.Rectangle( 823, 265, 185, 125 );
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    }, 
	
	onKeyDownCallback: function( keyCode ) {
	
		if ( DEVICE == MAKEY_MAKEY ) {
			var keyCode = this.game.input.keyboard.event.keyCode;
			
			if ( keyCode == 39 || keyCode == 65 || keyCode == 71  ) {
				this.state.start( 'Play' );
			}
		}
		
	},	
 
  /*
	Aquí habría que diferenciar si usamos Makey Makey o ratón.
	Con Makey Makey el click sirve para cambiar el dispositivo de juego.
	Con ratón habría que pulsar en cada item.
	Por ahora dejamos el ratón para ir a play!!!
  */
  onMouseDownCallback: function() {
	 if ( DEVICE == MOUSE ) {
		var x = this.game.input.activePointer.x;
		var y = this.game.input.activePointer.y;		
		if ( this.playClickArea.contains( x, y ) ) {
			this.state.start( 'Play' );
		}
	} else {
		// MAKEY_MAKEY cambiaría el device!
		// KEYBOARD???
	}
		
  }
    
};


