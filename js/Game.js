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
      
    //*******  variables customización *******//
   

    //***********  end customize ************//
      
      //objetos suelo
	  
	  this.bugsP1 = this.game.add.group();
	  this.bugsP2 = this.game.add.group();
	  
      //this.bichos = this.game.add.group();
      //this.addBicho(300, 300);
	  
	  this.addBugsToGroup( 5, "bugP1", this.bugsP1 );
	  this.addBugsToGroup( 5, "bugP2", this.bugsP2 );
      
      this.input.onDown.add(this.myclick, this);
   
 }, 
 
  update: function() {
     
            
  },
 
  render: function()
 
    {
 
//        this.game.debug.text(this.game.time.fps || '--', 20, 20, "#00ff00", "10px Courier");  
//        this.game.debug.text('Speed: ' + this.player.body.velocity.y, 20, 40, "#00ff00", "10px Courier");
   
//        this.game.debug.text('Width: ' + window.screen.availWidth * window.devicePixelRatio, 20, 60, "#00ff00", "10px Courier");
//        this.game.debug.text('Height: ' + window.screen.availHeight * window.devicePixelRatio, 20, 80, "#00ff00", "10px Courier");
        
    },
    
    //functions
	
	addBugsToGroup: function( num, img, group ) {
		for ( var i = 0; i < num; i++ )  {
			var x = Math.random() * 1000;
			var y = Math.random() * 600;
			var bug = group.create( x, y, img );
			this.game.physics.p2.enable([bug], false);
			bug.body.fixedRotation = false;
			//grua.body.damping = 0;
			bug.checkWorldBounds = true;
			bug.outOfBoundsKill = true;			
		}
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
		for ( var i = 0; this.bugsP1.children.length; i++ ) {
			this.applyImpulseToBug( this.bugsP1.children[i] );
		}
		for ( var j = 0; this.bugsP2.children.length; j++ ) {
			this.applyImpulseToBug( this.bugsP2.children[j] );
		} 
    },
	
	applyImpulseToBug: function( bug ) {
	
        var distancia = this.game.input.activePointer.position.distance( bug.body );
        
        var y = this.game.input.activePointer.y;
        var x = this.game.input.activePointer.x;
   
        var bichox = bug.body.x;
        var bichoy = bug.body.y;
        
        var impX = x - bichox;
        
        
        var impY = y - bichoy;
        
        var impulso = {x:impX,y:impY};
        
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
	

    }
    
    
    
    
    
    
};


