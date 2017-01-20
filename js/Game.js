var SideScroller = SideScroller || {};
 
SideScroller.Game = function() {};


SideScroller.Game.prototype = {
 
  preload: function(){
 
        this.game.time.advancedTiming = true;
        this.game.stage.backgroundColor = '#C9C9C9';
      
        //scaling options
        this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      
       // Start the P2 Physics Engine
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        //  Turn on impact events for the world, without this we get no collision callbacks
        this.game.physics.p2.setImpactEvents(true);
        // Set the gravity
        this.game.physics.p2.gravity.y = 0;
        this.game.physics.p2.gravity.x = 0;
 
    },
 
  create: function() {
  
	  // Game logic
	  this.scoreP1 = 0;
	  this.scoreP2 = 0;
  
	  // Collision groups
	  this.bugsP1CollisionGroup = this.game.physics.p2.createCollisionGroup();
	  this.bugsP2CollisionGroup = this.game.physics.p2.createCollisionGroup();
	  this.islandsCollisionGroup = this.game.physics.p2.createCollisionGroup();
	  this.game.physics.p2.updateBoundsCollisionGroup();
	  
	  // Grupos
	  this.bugsP1 = this.game.add.group();
	  this.bugsP2 = this.game.add.group();
	  this.islands = this.game.add.group();	  
	  this.addBugs( 5, "bugP1", this.bugsP1, this.bugsP1CollisionGroup, this.onBugP1CollidingIsland );
	  this.addBugs( 5, "bugP2", this.bugsP2, this.bugsP2CollisionGroup, this.onBugP2CollidingIsland );     
	  this.addIsland( 250, 300 );
	  this.addIsland( 750, 300 );
	  
	  // Events
      this.input.onDown.add( this.myclick, this );
   
 }, 
 
  update: function() {
     
            
  },
 
  render: function() {
  
		this.game.debug.text( "SCORE 01: " + this.scoreP1 + " / Bugs alive: " + this.bugsP1.children.length, 20, 20, "#000", "20px Courier");
		this.game.debug.text( "SCORE 02: " + this.scoreP2 + " / Bugs alive: " + this.bugsP1.children.length, 20, 40, "#000", "20px Courier");
 
//        this.game.debug.text( this.game.time.fps || '--', 20, 20, "#00ff00", "10px Courier");  
//        this.game.debug.text('Speed: ' + this.player.body.velocity.y, 20, 40, "#00ff00", "10px Courier");
   
//        this.game.debug.text('Width: ' + window.screen.availWidth * window.devicePixelRatio, 20, 60, "#00ff00", "10px Courier");
//        this.game.debug.text('Height: ' + window.screen.availHeight * window.devicePixelRatio, 20, 80, "#00ff00", "10px Courier");
        
    },
    
    //functions
	
	addBugs: function( num, img, group, collisionGroup, onCollisionCallback ) {
		for ( var i = 0; i < num; i++ )  {
			var x = Math.random() * 1000;
			var y = Math.random() * 600;
			var bug = group.create( x, y, img );
			this.game.physics.p2.enable( [ bug ], true );
			bug.body.fixedRotation = false;
			bug.body.setCollisionGroup( collisionGroup );
			bug.body.collides( [ this.islandsCollisionGroup ], onCollisionCallback, this );
			bug.body.collides( [ this.bugsP1CollisionGroup, this.bugsP2CollisionGroup ], null, this );
			//bug.body.damping = 0;
			bug.checkWorldBounds = true;
			bug.outOfBoundsKill = true;
		}
	},
	
	addIsland: function( x, y ) {
		var island = this.islands.create( x, y, "island" );
		this.game.physics.p2.enable( [ island ], true );
		island.body.fixedRotation = true;
		island.body.mass = 3;
		island.body.setCollisionGroup( this.islandsCollisionGroup );	
		island.body.collides( [ this.islandsCollisionGroup, this.bugsP1CollisionGroup, this.bugsP2CollisionGroup ] );
		island.checkWorldBounds = true;
		island.outOfBoundsKill = true;
	},
    
	/*
    addBicho: function(x, y) {
        this.bicho = this.bichos.create(x, y,'bicho');
        this.game.physics.p2.enable([this.bicho], false);
        this.bicho.body.fixedRotation = false;
        //grua.body.damping = 0;
        this.bicho.checkWorldBounds = true;
        this.bicho.outOfBoundsKill = true;
        
    },
	*/
    
    myclick: function() {
		this.applyImpulse( this.islands.children[0] );
		this.applyImpulse( this.islands.children[1] );
		for ( var i = 0; i < this.bugsP1.children.length; i++ ) {			
			this.applyImpulse( this.bugsP1.children[i] );
		}		
		for ( var j = 0; j < this.bugsP2.children.length; j++ ) {
			this.applyImpulse( this.bugsP2.children[j] );
		}
    },
		
	applyImpulse: function( bug ) {
        var distancia = this.game.input.activePointer.position.distance( bug.body );
        
        var y = this.game.input.activePointer.y;
        var x = this.game.input.activePointer.x;
   
        var bichox = bug.body.x;
        var bichoy = bug.body.y;
        
        var impX = x - bichox;
        var impY = y - bichoy;
        
        var impulso = {x:impX, y:impY};
        
        var impNormalized = this.normalize(impulso);

                
        if (distancia<400){
            var fuerza = (400 - distancia)* 0.01;
            var impulse = [impNormalized.x * fuerza,impNormalized.y * fuerza];
            bug.body.applyImpulse(impulse, 0, 0); 
        }
		
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
		//bug.sprite.kill();
		//bug.sprite.body.destroy();
		//this.bugsP1.remove( bug );
		this.scoreP1++;
	},
	
	onBugP2CollidingIsland: function( bug, island ) {
		//bug.sprite.kill();
		//bug.sprite.body.destroy();
		//this.bugsP2.remove( bug );
		this.scoreP2++;
	}
    
};


