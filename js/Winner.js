var SideScroller = SideScroller || {};
 
SideScroller.Winner = function() {};


SideScroller.Winner.prototype = {
 
  preload: function() {
 
    },
 
  create: function() {
		this.game.add.sprite( 0, 0, 'winner', 0 );
		this.input.onDown.add( this.onMouseDownCallback, this );
console.log( "AND THE WINNER IS: " + winner );
  }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    }, 
 
  onMouseDownCallback: function() {
     this.state.start('Menu');
  }
    
};


