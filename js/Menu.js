var SideScroller = SideScroller || {};
 
SideScroller.Menu = function() {};


SideScroller.Menu.prototype = {
 
  preload: function(){
 
    },
 
  create: function() {
    this.game.add.sprite(0, 0, 'bkg_menu',0);
      
    this.input.onDown.add( this.onMouseDownCallback, this );
    }, 
 
  update: function() {
     
    },
 
  render: function(){
        
    }, 
 
  onMouseDownCallback: function() {
     this.state.start('Game');
    }
    
};


