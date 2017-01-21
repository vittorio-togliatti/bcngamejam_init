var SideScroller = SideScroller || {};
 
SideScroller.Game = function() {};


SideScroller.Game.prototype = {
 
  preload: function(){
 
        this.game.time.advancedTiming = true;
        this.game.stage.backgroundColor = '#C9C9C9';
      
        //scaling options
        //this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
      
       // Start the P2 Physics Engine
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        //  Turn on impact events for the world, without this we get no collision callbacks
        this.game.physics.p2.setImpactEvents( true );
        // Set the gravity
        this.game.physics.p2.gravity.y = 0;
        this.game.physics.p2.gravity.x = 0;
 
    },
 
  create: function() {
        
	  // Game logic
	  this.scoreP1 = 0;
	  this.scoreP2 = 0;
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
      
      //Creo objetos
      this.addSidebar1(75,300);
      this.addSidebar2(1125,300);
	  this.addBugs( 5, "bugP1", this.bugsP1, this.bugsP1CollisionGroup, this.onBugP1CollidingIsland );
	  this.addBugs( 5, "bugP2", this.bugsP2, this.bugsP2CollisionGroup, this.onBugP2CollidingIsland );     
	  this.addIsland( 250, windowHeight / 2, "island1" );
	  this.addIsland( windowWidth - 250, windowHeight / 2, "island2"  );
      this.addRana(300,100);
	  
      
      //this.rana = this.game.add.sprite(100, 100, 'ss_rana',0);
      
      
	  // Events
	  this.game.input.keyboard.onDownCallback = this.onKeyDownCallback.bind( this );
      this.input.onDown.add( this.onMouseDownCallback, this );
   
 }, 
 
  update: function() {
     
	this.waves.alpha -= 0.025;
            
  },
 
  render: function() {
  
		this.game.debug.text( this.scoreP1 /* + " / " + this.bugsP1.children.length */, 75, 50, "#000", "40px Courier" );
		this.game.debug.text( this.scoreP2 /* + " / " + this.bugsP2.children.length */, 1125, 50, "#000", "40px Courier" );
        
   },
    
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
		this.sidebar1 = this.sidebars.create( x, y, "sidebar2" );
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

    onCollisionRana: function(rana,bug) {
		if (bug.sprite){
            bug.sprite.destroy();
            this.anim_rana.play();
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
		this.waves.lineStyle( 1, 0x0000FF, 1 );
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
			this.currentPlayer = 2;
		} else { /* this.currentPlayer == 2 */
			this.currentPlayer = 1;
		}
		
console.log( "--- CURRENT PLAYER: " + this.currentPlayer );		
		
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
		this.scoreP1++;
	},
	
	onBugP2CollidingIsland: function( bug, island ) {
		bug.sprite.destroy();
		this.scoreP2++;
	}
    
};


