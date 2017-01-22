var Waves = Waves || {};
 
Waves.Menu = function() {};


Waves.Menu.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
  
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		 if ( DEVICE == CONST.MAKEY_MAKEY ) {
			this.game.add.sprite( 0, 0, 'menuMakeyMakey', 0 );	
		 } else if ( DEVICE == CONST.POINTER_EVENTS ){
			this.game.add.sprite( 0, 0, 'menuPointerEvents', 0 );
		 } else {
			// CONST.KEYBOARD?
		 }
	  
      
		this.game.input.keyboard.onDownCallback = this.onKeyDownCallback.bind( this );
		
		this.input.onDown.add( this.onMouseDownCallback, this );
		
		this.playClickArea = new PIXI.Rectangle( 823, 265, 185, 125 );
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    }, 
	
	onKeyDownCallback: function( keyCode ) {
	
		if ( DEVICE == CONST.MAKEY_MAKEY ) {
			var keyCode = this.game.input.keyboard.event.keyCode;			
			if ( keyCode == 39 || keyCode == 65 || keyCode == 71  ) {
				this.state.start( 'Play' );
			}
		}
		
	},	
 
  onMouseDownCallback: function() {
	 if ( DEVICE == CONST.MAKEY_MAKEY ) {
		// Sólo sirve para cuando si queremos cambiar el dispositivo!
	} else if ( DEVICE == CONST.POINTER_EVENTS ) {
		var x = this.game.input.activePointer.x;
		var y = this.game.input.activePointer.y;		
		if ( this.playClickArea.contains( x, y ) ) {
			this.state.start( 'Play' );
		}
	} else {
		// KEYBOARD???
	}
		
  }
    
};


