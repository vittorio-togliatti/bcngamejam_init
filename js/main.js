var SideScroller = SideScroller || {};

var scoreP1 = 0;
var scoreP2 = 0;
var winner = null;
var originalHeight = 600;
var originalWidth = 800;
var windowWidth = 1200;
var windowHeight = 600;

//var currentScaleFactor = windowHeight / originalHeight;
//    windowHeight = originalHeight;
//    windowWidth = windowWidth / currentScaleFactor;
   
SideScroller.game = new Phaser.Game( windowWidth, windowHeight, Phaser.AUTO, '', '', '', false, '' );
 
//SideScroller.game.state.add('Boot', SideScroller.Boot);
//SideScroller.game.state.add('Splash', SideScroller.Splash);
SideScroller.game.state.add( 'Preload', SideScroller.Preload );
SideScroller.game.state.add('Menu', SideScroller.Menu);
SideScroller.game.state.add( 'Game', SideScroller.Game );
SideScroller.game.state.add( 'Winner', SideScroller.Winner );
//SideScroller.game.state.add('Credits', SideScroller.Credits);

SideScroller.game.state.start('Preload');