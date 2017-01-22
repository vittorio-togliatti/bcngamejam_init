var Waves = Waves || {};
 
Waves.Winner = function() {};


Waves.Winner.prototype = {
 
  preload: function() {
 
  },
 
  create: function() {
  
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	 if ( DEVICE == CONST.MAKEY_MAKEY ) {
		this.game.add.sprite( 0, 0, 'winnerMakeyMakey', 0 );
	 } else if ( DEVICE == CONST.POINTER_EVENTS ){
		this.game.add.sprite( 0, 0, 'winnerPointerEvents', 0 );
	 }	
	   
      this.scoreP1Text = this.game.add.text( 490, 175, scoreP1, 
						{ font: "bold 120px Arial", fill: "#7e5f33", boundsAlignH: "center", boundsAlignV: "middle" } );	  
      this.scoreP2Text = this.game.add.text( 640, 175, scoreP2, 
						{ font: "bold 120px Arial", fill: "#4c8d36", boundsAlignH: "center", boundsAlignV: "middle" } );

	  this.game.add.sprite( 0, 300, "winnerHojas" );
	  
	  this.input.onDown.add( this.onMouseDownCallback, this );
	  
	  if ( winner == 1 ) {
		this.game.add.sprite( 0, 65, "winnerWL" );
	  } else if ( winner == 2 ) {
		this.game.add.sprite( 0, 65, "winnerLW" );
	  } else {
		this.game.add.sprite( 0, 65, "winnerDD" );
	  }
	  
	  this.game.input.keyboard.onDownCallback = this.onKeyDownCallback.bind( this );
	  
	  this.mainMenuClickArea = new PIXI.Rectangle( 460, 414, 135, 120 );
	  this.playAgainClickArea = new PIXI.Rectangle( 604, 414, 135, 120 );

  },
 
	onKeyDownCallback: function( keyCode ) {
		if ( DEVICE == CONST.MAKEY_MAKEY ) {
			var keyCode = this.game.input.keyboard.event.keyCode;
			
			if ( keyCode == 38 || keyCode == 40 || keyCode == 87 || keyCode == 32 || keyCode == 83 || keyCode == 68 ) {
				this.state.start( 'Menu' );
			}
			if ( keyCode == 37 || keyCode == 39 /* || Mouse click! */  || keyCode == 65 || keyCode == 70 || keyCode == 71 ) {
				this.state.start( 'Play' );
			}
		}
		
	},
 

  onMouseDownCallback: function() {
  
	 if ( DEVICE == CONST.MAKEY_MAKEY ) {
		this.state.start( 'Play' );
	 } else if ( DEVICE == CONST.POINTER_EVENTS ) {
		var x = this.game.input.activePointer.x;
		var y = this.game.input.activePointer.y;		
		if ( this.mainMenuClickArea.contains( x, y ) ) {
			this.state.start( 'Menu' );
		}
		if ( this.playAgainClickArea.contains( x, y ) ) {
			this.state.start( 'Play' );
		}		
	 } else {
		// Keyboard?
	 }
  }
    
};


