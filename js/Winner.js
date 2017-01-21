var Waves = Waves || {};
 
Waves.Winner = function() {};


Waves.Winner.prototype = {
 
  preload: function() {
 
  },
 
  create: function() {
  
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	  this.game.add.sprite( 0, 0, "winner", 0 );
	  
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

  },
 
  onMouseDownCallback: function( x, y ) {
     this.state.start( 'Menu' );
  }
    
};


