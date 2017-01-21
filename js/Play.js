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
	
	 this.game.add.sprite( 150, 0, 'play', 0 );
		
	  // Game logic
	  scoreP1 = 0;
	  scoreP2 = 0;
	  winner = null;
	  this.currentPlayer = 1;
  
	  // Waves
	  this.waves = this.game.add.graphics( 0, 0 );
  
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
      this.sidebars = this.game.add.group();
      this.ranas = this.game.add.group();
      
      // Creo objetos
      this.addSidebar1( 75, 300 );
      this.addSidebar2( 1125, 300 );
	  this.addBugs( 5, "bugP1", this.bugsP1, this.bugsP1CollisionGroup, this.onBugP1CollidingIsland );
	  this.addBugs( 5, "bugP2", this.bugsP2, this.bugsP2CollisionGroup, this.onBugP2CollidingIsland );     
	  this.addIsland( 250, windowHeight / 2, "island1" );
	  this.addIsland( windowWidth - 250, windowHeight / 2, "island2"  );
      this.addRana( 300, 100 );
	  
	  var style = { font: "bold 75px Arial", fill: "#7e5f33", boundsAlignH: "center", boundsAlignV: "middle" };	  
      this.scoreP1Text = this.game.add.text( 48, 70, "0", style );	  
      this.scoreP2Text = this.game.add.text( 1110, 70, "0", style );

	  // sidebarsPlaying
	  this.borderP1 = this.game.add.sprite( 0, 0, "borderP1" )
	  this.borderP2 = this.game.add.sprite( 1050, 0, "borderP2" );
	  this.borderP2.visible = false;
	  
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
      
	  // Events
	  this.game.input.keyboard.onDownCallback = this.onKeyDownCallback.bind( this );
      this.input.onDown.add( this.onMouseDownCallback, this );
   
 }, 
 
  update: function() {
     
	this.waves.alpha -= 0.025;
            
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
			var y = Math.random() * windowHeight;
			var bug = group.create( x, y, img );
			this.game.physics.p2.enable( [ bug ], false );
			bug.body.fixedRotation = false;
			bug.body.setCollisionGroup( collisionGroup );
			bug.body.collides( [ this.islandsCollisionGroup ], onCollisionCallback, this );
			bug.body.collides( [ this.bugsP1CollisionGroup, this.bugsP2CollisionGroup,this.sidebarsCollisionGroup, this.ranasCollisionGroup ], null, this );
			bug.body.damping = 0.6;
			bug.checkWorldBounds = true;
			bug.outOfBoundsKill = true;
		}
	},
	
	addIsland: function( x, y,island_image) {
		var island = this.islands.create( x, y, island_image );
		this.game.physics.p2.enable( [ island ], false );
		island.body.fixedRotation = true;
		island.body.mass = 3;
		island.body.setCollisionGroup( this.islandsCollisionGroup );	
		island.body.collides( [ this.islandsCollisionGroup, this.bugsP1CollisionGroup, this.bugsP2CollisionGroup,this.sidebarsCollisionGroup, this.ranasCollisionGroup  ] );
		island.checkWorldBounds = true;
		island.outOfBoundsKill = true;
	},
	
	addRana: function( x, y) {
		var rana = this.ranas.create( x, y, "ss_rana",0);
        this.anim_rana = rana.animations.add('ss_rana',[1,2,3,4,5,6,7,8,9,10],30);
		this.game.physics.p2.enable([rana],false);
        rana.body.clearShapes();
        rana.body.loadPolygon("sprite_physics", "rana");
        
		rana.body.fixedRotation = false;
		rana.body.mass = 3;
		rana.body.setCollisionGroup( this.ranasCollisionGroup );	
		rana.body.collides([this.islandsCollisionGroup,this.sidebarsCollisionGroup]);
        rana.body.collides( [ this.bugsP1CollisionGroup,this.bugsP2CollisionGroup ], this.onCollisionRana, this );
		rana.checkWorldBounds = true;
		//rana.outOfBoundsKill = true;
	},
    
    addSidebar1: function( x, y ) {
		this.sidebar1 = this.sidebars.create( x, y, "sidebar1" );
		this.game.physics.p2.enable( [ this.sidebar1 ], false );
		this.sidebar1.body.fixedRotation = true;
		this.sidebar1.body.static = true;
		this.sidebar1.body.setCollisionGroup( this.sidebarsCollisionGroup );	
		this.sidebar1.body.collides( [ this.islandsCollisionGroup, this.bugsP1CollisionGroup, this.bugsP2CollisionGroup, this.ranasCollisionGroup  ] );
	},
    
    addSidebar2: function( x, y ) {
		this.sidebar2 = this.sidebars.create( x, y, "sidebar2" );
		this.game.physics.p2.enable( [ this.sidebar2 ], false );
		this.sidebar2.body.fixedRotation = true;
		this.sidebar2.body.static = true;
		this.sidebar2.body.setCollisionGroup( this.sidebarsCollisionGroup );	
		this.sidebar2.body.collides( [ this.islandsCollisionGroup, this.bugsP1CollisionGroup, this.bugsP2CollisionGroup, this.ranasCollisionGroup ] );
	},
	
	onKeyDownCallback: function( keyCode ) {
	
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
		
	},

    onMouseDownCallback: function() {
		// Test mouse clicks!
		var x = this.game.input.activePointer.x;
		var y = this.game.input.activePointer.y;
		this.createSplash( x, y );
		/*
		// Makey Makey
		this.createSplash( 750, 300 );
		*/
    },
	
	createSplash: function( x, y ) {
		
		this.waves.clear();
		this.waves.alpha = 1;
		this.waves.lineStyle( 1, 0x334d50, 1 );
		this.waves.drawCircle( x, y, 20 );
		this.waves.drawCircle( x, y, 40 );
		this.waves.drawCircle( x, y, 80 );
		this.waves.drawCircle( x, y, 160 );		
		
		this.applyImpulse( x, y, this.islands.children[0] );
		this.applyImpulse( x, y, this.islands.children[1] );
        
        this.applyImpulse( x, y, this.ranas.children[0] );
		
		for ( var i = 0; i < this.bugsP1.children.length; i++ ) {			
			this.applyImpulse( x, y, this.bugsP1.children[i] );
		}
		
		for ( var j = 0; j < this.bugsP2.children.length; j++ ) {
			this.applyImpulse( x, y, this.bugsP2.children[j] );
		}
		
		// Cambio player
		if ( this.currentPlayer == 1 ) {
			this.numTapsP1--;
			if ( this.numTapsP1 == 0 ) { 
				this.currentPlayer = 2;
				this.borderP1.visible = false;
				this.borderP2.visible = true;
				this.numTapsP2 = 3;
			}
		} else { /* this.currentPlayer == 2 */
			this.numTapsP2--;
			if ( this.numTapsP2 == 0 ) { 
				this.currentPlayer = 1;
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
		
	},
		
	applyImpulse: function( x, y, bug ) {
	
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
		bug.sprite.destroy();
		scoreP1++;
		this.scoreP1Text.text = scoreP1;
		this.checkWinner();
	},
	
	onBugP2CollidingIsland: function( bug, island ) {
		bug.sprite.destroy();
		scoreP2++;
		this.scoreP2Text.text = scoreP2;
		this.checkWinner();
	},
	
    onCollisionRana: function( rana, bug ) {
		if ( bug.sprite ) {
            bug.sprite.destroy();
            this.anim_rana.play();
			this.checkWinner();
        }
    },	
	
	checkWinner: function() {
		if ( scoreP1 > scoreP2 + this.bugsP2.children.length ) {
			winner = 1;
			this.state.start('Winner');
		}
		if ( scoreP2 > scoreP1 + this.bugsP1.children.length ) {
			winner = 2;
			this.state.start('Winner');
		}
		if ( scoreP1 === scoreP2 
			&& this.bugsP1.children.length === 0 
			&& this.bugsP2.children.length === 0 ) {
			winner = null;
			this.state.start('Winner');
		}
	}
	
	/*
	areBugsAlive(  ) {
		
	}
	*/
    
};


