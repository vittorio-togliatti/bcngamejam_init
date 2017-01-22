var Waves = Waves || {};
 
Waves.Winner = function() {};


Waves.Winner.prototype = {
 
  preload: function() {
 
  },
 
  create: function() {
      
      this.audio_final  = this.add.audio('audio_final');
  
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	 if ( DEVICE == CONST.MAKEY_MAKEY ) {
		this.game.add.sprite( 0, 0, 'winnerMakeyMakey', 0 );
	 } else if ( DEVICE == CONST.POINTER_EVENTS ){
		this.game.add.sprite( 0, 0, 'winnerPointerEvents', 0 );
	 }	
	  
	  var style = { font: "bold 120px Arial", fill: "#7e5f33", boundsAlignH: "center", boundsAlignV: "middle" };	  
      this.scoreP1Text = this.game.add.text( 490, 175, scoreP1, style );	  
      this.scoreP2Text = this.game.add.text( 640, 175, scoreP2, style );

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
      
      this.audio_final.loopFull();

  },
 
	onKeyDownCallback: function( keyCode ) {
		if ( DEVICE == CONST.MAKEY_MAKEY ) {
			var keyCode = this.game.input.keyboard.event.keyCode;
			
			if ( keyCode == 38 || keyCode == 40 || keyCode == 87 || keyCode == 32 || keyCode == 83 || keyCode == 68 ) {
				this.goToMenu();
			}
			if ( keyCode == 37 || keyCode == 39 /* || Mouse click! */  || keyCode == 65 || keyCode == 70 || keyCode == 71 ) {
				this.goToPlay();
			}
		}
		
	},
 

  onMouseDownCallback: function() {
  
	 if ( DEVICE == CONST.MAKEY_MAKEY ) {
		this.goToPlay();
	 } else if ( DEVICE == CONST.POINTER_EVENTS ) {
		var x = this.game.input.activePointer.x;
		var y = this.game.input.activePointer.y;		
		if ( this.mainMenuClickArea.contains( x, y ) ) {
			this.goToMenu();
		}
		if ( this.playAgainClickArea.contains( x, y ) ) {
			this.goToPlay();
		}		
	 } else {
		// Keyboard?
	 }
  },
    
    goToMenu: function(){
        this.audio_final.stop();
        this.state.start( 'Menu' );
    },
    
    goToPlay: function(){
        this.audio_final.stop();
        this.state.start( 'Play' );
    }
    
};


