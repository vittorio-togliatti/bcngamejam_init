var Waves = Waves || {};

var scoreP1 = 0;
var scoreP2 = 0;
var winner = null;
var windowWidth = 1200;
var windowHeight = 600;
   
Waves.game = new Phaser.Game( windowWidth, windowHeight, Phaser.AUTO, '', '', '', false, '' );
 
//Waves.game.state.add('Boot', Waves.Boot);
//Waves.game.state.add('Splash', Waves.Splash);
Waves.game.state.add( 'Preload', Waves.Preload );
Waves.game.state.add('Menu', Waves.Menu);
Waves.game.state.add( 'Play', Waves.Play );
Waves.game.state.add( 'Winner', Waves.Winner );
//Waves.game.state.add('Credits', Waves.Credits);

Waves.game.state.start('Preload');