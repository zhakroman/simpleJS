
 // class - repeated sprites( e.g.: enemies )
 // id    - unique( e.g.: character  );
 
 // first - init new 2D html game 
 
var $main = new HTMLGameEngine(function() {
 return {
  name   : "SuperMario"
  scene  : "Mario", // the main scene id
  width  : 700,
  height : 500,
   audio  : function( register ) {
    register({root : "../music"} , 
    [
      { 
          name: "background", 
          src: "bg.mp3"
      } , { 
          name: "jumping", 
          src: "jump.mp3"
      } , { 
          name: "runnig", 
          src : "run.mp3"
       }
     ]);
   },
  image   : function( register ) {
    register({root: "../img", type: "png"}, [
      { name: "Mario", src: "mario" }
     ])
    }
  }
}).startLoad(["image", "audio"]);

// get DOM utils
var dom = $main.acquire("DOM");

$main
    .on("progress", function( progress ){
       dom("#preload", {cache: true}).text("Loaded: " + progress * 100);
    })
    .on("fail", function( objects ) {
      // object that failed to preload
    })
    .on("success", init_2DGame )
    
    
    function init_2DGame() {
     
     
    };
    