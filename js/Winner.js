var Waves = Waves || {};
 
Waves.Winner = function() {};


Waves.Winner.prototype = {
 
  preload: function() {
 
    },
 
  create: function() {
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	  this.game.add.sprite( 0, 0, 'winner', 0 );
	  this.input.onDown.add( this.onMouseDownCallback, this );
	  
	  var style = { font: "bold 75px Arial", fill: "#7e5f33", boundsAlignH: "center", boundsAlignV: "middle" };	  
      this.scoreP1Text = this.game.add.text( 48, 70, scoreP1, style );	  
      this.scoreP2Text = this.game.add.text( 1110, 70, scoreP2, style );  

  },
 
  onMouseDownCallback: function() {
     this.state.start('Menu');
  }
    
};


