var Waves = Waves || {};
 
Waves.Play = function() {};

Waves.Play.prototype = {
 
  preload: function() {
 
        this.game.time.advancedTiming = true;
        this.game.stage.backgroundColor = '#C9C9C9';
      
        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		//this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
      
     
       // Start the P2 Physics Engine
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        //  Turn on impact events for the world, without this we get no collision callbacks
        this.game.physics.p2.setImpactEvents( true );
        // Set the gravity
        this.game.physics.p2.gravity.y = 0;
        this.game.physics.p2.gravity.x = 0;
 
    },
 
  create: function() {
	
    
      
    this.audio_rana  = this.add.audio('audio_rana');
    this.audio_weheee  = this.add.audio('audio_weheee');
    this.audio_drop  = this.add.audio('audio_drop');
    this.audio_juego  = this.add.audio('audio_juego');
    
       
      

	 if ( DEVICE == CONST.MAKEY_MAKEY ) {
		this.game.add.sprite( 150, 0, 'playMakeyMakey', 0 );
	 } else if ( DEVICE == CONST.POINTER_EVENTS ) {
		this.game.add.sprite( 150, 0, 'playPointerEvents', 0 );
	 } else {
		// KEYBOARD???
	 }
      
    // Para rotar el pez y que vaya al cursor
	//this.addPez();
	//this.anim_pez.play(5,true);
	//this.pezTween = this.game.add.tween( this.pez );
	//this.pezTweenAngle = this.game.add.tween( this.pez );
		
	  // Game logic
	  scoreP1 = 0;
	  scoreP2 = 0;
	  winner = null;
	  this.currentPlayer = 1;
	  this.tapEnabled = false;
  
  	  // Waves
	  // this.waves = this.game.add.graphics( 0, 0 ); 
	  this.waves = [
			this.game.add.sprite( 0, 0, 'ss_waves', 7 ),
			this.game.add.sprite( 0, 0, 'ss_waves', 7 ),
			this.game.add.sprite( 0, 0, 'ss_waves', 7 )
	  ];
	  this.waves[0].anchor.set( 0.5 );
	  this.waves[1].anchor.set( 0.5 );
	  this.waves[2].anchor.set( 0.5 ); 
	  this.wave_animations = [
			this.waves[0].animations.add( 'ss_waves', [ 0, 1, 2, 3, 4, 5, 6, 7 ], 25 ),
			this.waves[1].animations.add( 'ss_waves', [ 0, 1, 2, 3, 4, 5, 6, 7 ], 25 ),
			this.waves[2].animations.add( 'ss_waves', [ 0, 1, 2, 3, 4, 5, 6, 7 ], 25 )
	  ];
  
	  // Collision groups
	  this.bugsP1CollisionGroup = this.game.physics.p2.createCollisionGroup();
	  this.bugsP2CollisionGroup = this.game.physics.p2.createCollisionGroup();
	  this.islandsCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.sidebarsCollisionGroup = this.game.physics.p2.createCollisionGroup();
      this.ranasCollisionGroup = this.game.physics.p2.createCollisionGroup();
	  this.game.physics.p2.updateBoundsCollisionGroup();
	  
	  // Grupos
	  this.bugsP1 = this.game.add.group();
	  this.bugsP2 = this.game.add.group();
	  this.islands = this.game.add.group();	
      this.ranas = this.game.add.group();

	  this.addBugs( 9, "bugP1", this.bugsP1, this.bugsP1CollisionGroup, this.onBugP1CollidingIsland );
	  this.addBugs( 9, "bugP2", this.bugsP2, this.bugsP2CollisionGroup, this.onBugP2CollidingIsland );     
	  this.addIsland1( 250, windowHeight / 2);
	  this.addIsland2( windowWidth - 250, windowHeight / 2);

      this.addRana( 600, 50 );
	  this.addRana( 600, 550 );
	  
	  /*
	  this.waves = this.game.add.sprite( 600, 300, 'ss_waves', 5 );
	  this.waves.anchor.set( 0.5 );
	  this.anim_waves = this.waves.animations.add( 'ss_waves', [ 0, 1, 2, 3, 4, 5, 6 ], 25 );
	  //this.waves.visible = true;	
		*/	

	  // Creo objetos
	  this.sidebars = this.game.add.group();	  
      this.addSidebar1( 75, 300 );
      this.addSidebar2( 1125, 300 ); 
		 
      // sidebarsPlaying	  
      this.scoreP1Text = this.game.add.text( 48, 70, "0",
								{ font: "bold 75px Arial", fill: "#79562a", boundsAlignH: "center", boundsAlignV: "middle" } );
      this.scoreP2Text = this.game.add.text( 1110, 70, "0",
								{ font: "bold 75px Arial", fill: "#4c8d36", boundsAlignH: "center", boundsAlignV: "middle" } );

	  this.borderP1 = this.game.add.sprite( 0, 0, "borderP1" )
	  this.borderP2 = this.game.add.sprite( 1050, 0, "borderP2" );
	  this.borderP2.visible = false;		
	  
	  this.sidebarBugP1 = null;
	  if ( DEVICE == CONST.MAKEY_MAKEY ) {
		this.sidebarBugP1 = this.game.add.sprite( -200, 300, "sidebarBugP1MakeyMakey" );
	  } else if ( DEVICE == CONST.POINTER_EVENTS ) {
		this.sidebarBugP1 = this.game.add.sprite( -200, 300, "sidebarBugP1PointerEvents" );
	  } else {
		// KEYBOARD??? OTHER???
	  }
	  this.sidebarBugP1TweenIn = this.game.add.tween( this.sidebarBugP1 )
		.to( { x: -20 }, 1000, Phaser.Easing.Elastic.Out )
		.delay( 250 );
	  this.sidebarBugP1TweenIn.onComplete.add( this.enableTap, this );
	  this.sidebarBugP1TweenOut = this.game.add.tween( this.sidebarBugP1 )
		.to( { x: -200 }, 1000, null );
	  this.sidebarBugP2 = null;
	  if ( DEVICE == CONST.MAKEY_MAKEY ) {
		this.sidebarBugP2 = this.game.add.sprite( 1200, 300, "sidebarBugP2MakeyMakey" );
	  } else if ( DEVICE == CONST.POINTER_EVENTS ) {
		this.sidebarBugP2 = this.game.add.sprite( 1200, 300, "sidebarBugP2PointerEvents" );
	  } else {
		// KEYBOARD??? OTHER???
	  }
	  this.sidebarBugP2TweenIn = this.game.add.tween( this.sidebarBugP2 )
		.to( { x: 1020 }, 1000, Phaser.Easing.Elastic.Out )
		.delay( 250 );
	  this.sidebarBugP2TweenIn.onComplete.add( this.enableTap, this );
	  this.sidebarBugP2TweenOut = this.game.add.tween( this.sidebarBugP2 )
		.to( { x: 1200 }, 1000, null );	 		
	  
	  // taps
	  this.numTapsP1 = 3;
	  this.tapsP1 = [
		this.game.add.sprite( 40, 247, "tapP1" ),
		this.game.add.sprite( 62, 247, "tapP1" ),
		this.game.add.sprite( 84, 247, "tapP1" )
	  ];
	  this.numTapsP2 = 0;
	  this.tapsP2 = [
		this.game.add.sprite( 1101, 247, "tapP2" ),
		this.game.add.sprite( 1123, 247, "tapP2" ),
		this.game.add.sprite( 1145, 247, "tapP2" )
	  ];
	  this.tapsP2[0].visible = false;
	  this.tapsP2[1].visible = false;
	  this.tapsP2[2].visible = false; 	  
	  
	  // Lanzamos ya el tween del chinche P1
	  this.sidebarBugP1TweenIn.start();
      
	  // Events
	  this.game.input.keyboard.onDownCallback = this.onKeyDownCallback.bind( this );
      this.input.onDown.add( this.onMouseDownCallback, this );
   
      this.audio_juego.loopFull();
 }, 
 
  update: function() {
     
	//this.waves.alpha -= 0.025;
  },
 
	/*
  render: function() {
  
		// this.game.debug.text( scoreP1, 50, 100, "#000", "60px Arial" );
		// this.game.debug.text( scoreP2, 1100, 100, "#000", "60px Arial" );
        
   },
   */
    
    //functions
	
	addBugs: function( num, img, group, collisionGroup, onCollisionCallback ) {
		for ( var i = 0; i < num; i++ )  {
			var x = 450 + Math.random() * 300;
			var y = 200 + Math.random() * 200;
			var bug = group.create( x, y, img );
			this.game.physics.p2.enable( [ bug ], false );
            
            bug.body.clearShapes();
            bug.body.loadPolygon("sprite_physics", "bug");
            
			bug.body.fixedRotation = false;
			bug.body.setCollisionGroup( collisionGroup );
			bug.body.collides( [ this.islandsCollisionGroup ], onCollisionCallback, this );
			bug.body.collides( [ this.bugsP1CollisionGroup, this.bugsP2CollisionGroup,this.sidebarsCollisionGroup, this.ranasCollisionGroup ], null, this );
			bug.body.damping = 0.6;
			bug.checkWorldBounds = true;
			bug.outOfBoundsKill = true;
		}
	},
	
	addIsland1: function( x, y) {
		var island = this.islands.create( x, y, 'ss_isla1',2 );
        this.anim_isla1 = island.animations.add('ss_isla1',[0,1,0,1,0,1,2],5);
    
		this.game.physics.p2.enable( [ island ], false );
		island.body.fixedRotation = true;
		island.body.mass = 3;
		island.body.setCollisionGroup( this.islandsCollisionGroup );	
		island.body.collides( [ this.islandsCollisionGroup, this.sidebarsCollisionGroup, this.ranasCollisionGroup  ] );
        island.body.collides( [ this.bugsP1CollisionGroup, this.bugsP2CollisionGroup, ], this.onCollisionIsla1Yepeee, this );
		island.checkWorldBounds = true;
		island.outOfBoundsKill = true;
	},
    
    addIsland2: function( x, y) {
		var island = this.islands.create( x, y, 'ss_isla2',2 );
        this.anim_isla2 = island.animations.add('ss_isla2',[0,1,0,1,0,1,2],5);
        
		this.game.physics.p2.enable( [ island ], false );
		island.body.fixedRotation = true;
		island.body.mass = 3;
		island.body.setCollisionGroup( this.islandsCollisionGroup );	
		island.body.collides( [ this.islandsCollisionGroup, this.sidebarsCollisionGroup, this.ranasCollisionGroup  ] );
        island.body.collides( [ this.bugsP1CollisionGroup, this.bugsP2CollisionGroup, ], this.onCollisionIsla2Yepeee, this );
		island.checkWorldBounds = true;
		island.outOfBoundsKill = true;
	},

    //El Pez
//    addPez: function( x, y) {
//		this.pez = this.game.add.sprite( 300, 300, 'ss_pez', 0 );
//       
//      
//        this.anim_pez = this.pez.animations.add('ss_pez',[0,1,2,3],10);
//        
//        this.game.physics.enable(this.pez, Phaser.Physics.ARCADE);
//        
//        this.pez.body.allowRotation = false;
//        this.pez.anchor.setTo(0.5, 0.5);
//        
//    
//	},
	
	addRana: function( x, y ) {
		var rana = this.ranas.create( x, y, "ss_rana",0);
      
		this.game.physics.p2.enable([rana],false);
        rana.body.clearShapes();
        rana.body.loadPolygon("sprite_physics", "rana");
        
		rana.body.fixedRotation = false;
		rana.body.mass = 3;
		rana.body.setCollisionGroup( this.ranasCollisionGroup );	
		rana.body.collides([this.islandsCollisionGroup,this.sidebarsCollisionGroup,this.ranasCollisionGroup]);
        rana.body.collides( [ this.bugsP1CollisionGroup,this.bugsP2CollisionGroup ], this.onCollisionRana, this );
		rana.checkWorldBounds = true;
		//rana.outOfBoundsKill = true;
        
        
        rana.body.anim_rana = rana.animations.add('ss_rana',[1,2,3,4,5,6,7,8,9,10],30);
	},
    
    addSidebar1: function( x, y ) {
		if ( DEVICE == CONST.MAKEY_MAKEY ) {
			this.sidebar1 = this.sidebars.create( x, y, "sidebarP1MakeyMakey" );
		} else {
			this.sidebar1 = this.sidebars.create( x, y, "sidebarP1PointerEvents" );
		}
		this.game.physics.p2.enable( [ this.sidebar1 ], false );
		this.sidebar1.body.fixedRotation = true;
		this.sidebar1.body.static = true;
		this.sidebar1.body.setCollisionGroup( this.sidebarsCollisionGroup );	
		this.sidebar1.body.collides( [ this.islandsCollisionGroup, this.bugsP1CollisionGroup, this.bugsP2CollisionGroup, this.ranasCollisionGroup  ] );
	},
    
    addSidebar2: function( x, y ) {
		if ( DEVICE == CONST.MAKEY_MAKEY ) {
			this.sidebar2 = this.sidebars.create( x, y, "sidebarP2MakeyMakey" );
		} else {
			this.sidebar2 = this.sidebars.create( x, y, "sidebarP2PointerEvents" );
		}
		this.game.physics.p2.enable( [ this.sidebar2 ], false );
		this.sidebar2.body.fixedRotation = true;
		this.sidebar2.body.static = true;
		this.sidebar2.body.setCollisionGroup( this.sidebarsCollisionGroup );	
		this.sidebar2.body.collides( [ this.islandsCollisionGroup, this.bugsP1CollisionGroup, this.bugsP2CollisionGroup, this.ranasCollisionGroup ] );
	},
	
	onKeyDownCallback: function( keyCode ) {
	
		if ( DEVICE == CONST.MAKEY_MAKEY ) {
		
			var keyCode = this.game.input.keyboard.event.keyCode;
			
			//
			// Top row
			//
			if ( keyCode == 38 ) { /* Up */
				this.createSplash( 150, 0 );
			} else if ( keyCode == 40 ) { /* Down */
				this.createSplash( 450, 0 );
			} else if ( keyCode == 37 ) { /* Left */
				this.createSplash( 750, 0 );
			} else if ( keyCode == 39 ) { /* Right */
				this.createSplash( 1050, 0 );
			//
			// Middle row
			// 
			} else if ( keyCode == 87 ) { /* w */
				this.createSplash( 150, 300 ); 		
			} else if ( keyCode == 32 ) { /* space */
				this.createSplash( 450, 300 );
			// Mouse click <------------------------------- see onMouseDownCallback
			} else if ( keyCode == 65 ) { /* a */
				this.createSplash( 1050, 300 );
			//
			// Bottom row
			//
			} else if ( keyCode == 83 ) { /* s */
				this.createSplash( 150, 600 );
			} else if ( keyCode == 68 ) { /* d */
				this.createSplash( 450, 600 );
			} else if ( keyCode == 70 ) { /* f */
				this.createSplash( 750, 600 );
			} else if ( keyCode == 71 ) { /* g */
				this.createSplash( 1050, 600 );
			//
			// 
			//
			}  else {
				// NOP!
			}
		}
		
	},

    onMouseDownCallback: function() {
	
		if ( DEVICE == CONST.MAKEY_MAKEY ) {
			this.createSplash( 750, 300 );
		} else if ( DEVICE == CONST.POINTER_EVENTS ) { /* La variable DEVICE se modifica en main.js */
			var x = this.game.input.activePointer.x;
			var y = this.game.input.activePointer.y;
			this.createSplash( x, y );
		} else {
			// KEYBOARD ???
		}
    },
	
	createSplash: function( x, y ) {
		if ( this.tapEnabled && x > 149 && x < 1051 ) { /* Importante 149 y 1051 porque con 150 y 1050 las ondas de MakeyMakey no se lanzan! */
		
            
           // Para rotar el pez y que vaya al cursor
//            var rotation = (Math.atan2(this.pez.y - y, this.pez.x - x) - Math.PI/2)  * (180/Math.PI);
//            this.pezTween.stop();
//            this.pezTweenAngle.stop();
//            this.pezTween = this.game.add.tween( this.pez ).to( { x:x,y:y }, 5000, Phaser.Easing.Quadratic.InOut );
//            this.pezTweenAngle = this.game.add.tween( this.pez).to( {angle:rotation}, 1000, Phaser.Easing.Quadratic.InOut );
//            this.pezTweenAngle.start();
//            this.pezTween.start();
            
			/*
			this.waves.clear();
			this.waves.alpha = 1;
			this.waves.lineStyle( 1, 0x334d50, 1 );
			this.waves.drawCircle( x, y, 20 );
			this.waves.drawCircle( x, y, 40 );
			this.waves.drawCircle( x, y, 80 );
			this.waves.drawCircle( x, y, 160 );
			*/
			/*
			this.waves[ ] 
			this.waves.x = x;
			this.waves.y = y;
			//this.waves.visible = true;			
			this.anim_waves.play();
			*/
			
			this.applyImpulse( x, y, this.islands.children[0] );
			this.applyImpulse( x, y, this.islands.children[1] );
			
			this.applyImpulse( x, y, this.ranas.children[0] );
            this.applyImpulse( x, y, this.ranas.children[1] );
			
			for ( var i = 0; i < this.bugsP1.children.length; i++ ) {			
				this.applyImpulse( x, y, this.bugsP1.children[i] );
			}
			
			for ( var j = 0; j < this.bugsP2.children.length; j++ ) {
				this.applyImpulse( x, y, this.bugsP2.children[j] );
			}
			
			// Cambio player
			if ( this.currentPlayer == 1 ) {
				this.numTapsP1--;
				this.waves[ this.numTapsP1 ].x = x;
				this.waves[ this.numTapsP1 ].y = y;
				this.wave_animations[ this.numTapsP1 ].play();
				if ( this.numTapsP1 == 0 ) {
					this.tapEnabled = false;
					this.currentPlayer = 2;
					this.sidebarBugP1TweenOut.start();
					this.sidebarBugP2TweenIn.start();				
					this.borderP1.visible = false;
					this.borderP2.visible = true;
					this.numTapsP2 = 3;
				}
			} else { /* this.currentPlayer == 2 */
				this.numTapsP2--;
				this.waves[ this.numTapsP2 ].x = x;
				this.waves[ this.numTapsP2 ].y = y;
				this.wave_animations[ this.numTapsP2 ].play();				
				if ( this.numTapsP2 == 0 ) {
					this.tapEnabled = false;			
					this.currentPlayer = 1;
					this.sidebarBugP2TweenOut.start();
					this.sidebarBugP1TweenIn.start();
					this.borderP1.visible = true;
					this.borderP2.visible = false;				
					this.numTapsP1 = 3;
				}
			}
			// Refresh tap status!!!
			for ( var t = 0; t < 3; t++ ) {
				if ( t < this.numTapsP1 ) {
					this.tapsP1[t].visible = true;	
				} else {
					this.tapsP1[t].visible = false;	
				}
				if ( t < this.numTapsP2 ) {
					this.tapsP2[t].visible = true;	
				} else {
					this.tapsP2[t].visible = false;	
				}
			}
		}
	},
	
	enableTap: function() {
		this.tapEnabled = true;
	},
		
	applyImpulse: function( x, y, bug ) {
	    this.audio_drop.play();
        
        var distancia = this.distance( x, y, bug.body.x, bug.body.y );
   
        var bichox = bug.body.x;
        var bichoy = bug.body.y;
        
        var impX = x - bichox;
        var impY = y - bichoy;
        
        var impulso = {x:impX, y:impY};
     
        var impNormalized = this.normalize(impulso);
        
        if ( distancia < 400 ) {
            var fuerza = (400 - distancia) * 0.02;
            var impulse = [impNormalized.x * fuerza,impNormalized.y * fuerza];
            bug.body.applyImpulse(impulse, 0, 0); 
        }
		
	},
	
	distance: function( x1, y1, x2, y2 ) {
		var x = x1 - x2;
		var y = y1 - y2;
		return Math.sqrt( x * x + y * y );	
	},
    
    normalize: function(vector) {
		var length =  Math.sqrt( vector.x * vector.x + vector.y * vector.y );
        if ( length > 0 ) {
            return { x: vector.x / length, y: vector.y / length };
        } else {
            return { x: 0, y: 0 };
		}
    },
	
	onBugP1CollidingIsland: function( bug, island ) {
        this.runBugEmitter(bug.sprite.body.x,bug.sprite.body.y);
		bug.sprite.destroy();
        this.audio_weheee.play();
		scoreP1++;
		this.scoreP1Text.text = scoreP1;
		this.checkWinner();
	},
	
	onBugP2CollidingIsland: function( bug, island ) {
        this.runBugEmitter(bug.sprite.body.x,bug.sprite.body.y);
		bug.sprite.destroy();
        this.audio_weheee.play();
		scoreP2++;
		this.scoreP2Text.text = scoreP2;
		this.checkWinner();
	},
	
    onCollisionRana: function( rana, bug ) {
		if ( bug.sprite ) {
            this.runBugEmitter(bug.sprite.body.x,bug.sprite.body.y);
            bug.sprite.destroy();
            rana.sprite.body.anim_rana.play();
            this.audio_rana.play();
			this.checkWinner();
        }
    },	
    
    onCollisionIsla1Yepeee: function(){
        this.anim_isla1.play();
    },
    
    onCollisionIsla2Yepeee: function(){
        this.anim_isla2.play();
    },
	
	checkWinner: function() {
		if ( scoreP1 > scoreP2 + this.bugsP2.children.length ) {
			winner = 1;
            this.goToFinishPause();
		}
		if ( scoreP2 > scoreP1 + this.bugsP1.children.length ) {
			winner = 2;
			  this.goToFinishPause();
		}
		if ( scoreP1 === scoreP2 
			&& this.bugsP1.children.length === 0 
			&& this.bugsP2.children.length === 0 ) {
			winner = null;
			 this.goToFinishPause();
		}
	},
    
    runBugEmitter: function(x,y){
        emitter = this.game.add.emitter(x, y);

        emitter.makeParticles('particle_bug');

        emitter.setRotation(0, 0);
        emitter.setAlpha(0.3, 0.8);
        emitter.setScale(0.5, 1);
        emitter.gravity = -50;
        emitter.setXSpeed(-10,10);
        emitter.setYSpeed(-1,-10);

        //	false means don't explode all the sprites at once, but instead release at a rate of one particle per 100ms
        //	The 5000 value is the lifespan of each particle before it's killed
        emitter.start(true, 2000, null, 10);
        //  And 2 seconds later we'll destroy the emitter
        //this.game.time.events.add(2000, this.destroyEmitter, this);
    },
    
    goToFinishPause: function(){
            this.game.time.events.add(700, this.goToWinner, this);
        },
    
    goToWinner: function(){
        this.audio_juego.stop();
        this.state.start('Winner');
    }
    
    
};


