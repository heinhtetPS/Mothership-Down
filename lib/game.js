document.addEventListener('DOMContentLoaded', () => {

  //run once
  initialize();

  function initialize() {
    //initialize canvas vars
    window.canvas = document.getElementById('canvas');
    window.canvasBG = document.getElementById('canvas-BG');
    window.canvasUI = document.getElementById('canvas-UI');
    window.ctx = canvas.getContext('2d');
    window.ctx_bg = canvasBG.getContext('2d');
    window.ctx_ui = canvasUI.getContext('2d');

    //initialize images
    window.imageRepo = new function() {

      this.allimages = 5;
      this.loaded = 0;
      this.mothershipImg = new Image();
      this.mothershipImg.src = "./assets/images/altship.png";

      this.cannonSheet = new Image();
      this.cannonSheet.src = "./assets/images/cannonsheet.png"

      this.spaceBG = new Image();
      this.spaceBG.src = "./assets/images/maxresdefault.jpg";
      // this.spaceBG.onload = () => {}

      this.shieldSheet= new Image();
      this.shieldSheet.src = "./assets/images/shieldsheet.png";

      this.enemy1 = new Image();
      this.enemy1.src = "./assets/images/enemy1.png";

      this.explosion = new Image();
      this.explosion.src = "./assets/images/explonew.png";

      this.arrows = new Image();
      this.arrows.src = "./assets/images/arrows.png";
      this.arrows.onload = () => {
        ctx_ui.drawImage(this.arrows,
        85, 210, 50, 50);
      }

      this.spacebar = new Image();
      this.spacebar.src = "./assets/images/spacebar.png";
      this.spacebar.onload = () => {
        ctx_ui.drawImage(this.spacebar,
        340, 258, 100, 50);
      }
      this.healthbar = new Image();
      this.beacon = new Image();
      this.powerPanel = new Image();

    }//end of image repo

    window.audioRepo = new function() {

      this.bgm = document.createElement("audio");
      this.bgm.src = "./assets/audio/bgm.mp3";
      this.bgm.volume = 0.05;
      this.bgm.loop = true;

      this.shootsound = document.createElement("audio");
      this.shootsound.src = "./assets/audio/shoot.wav";

      this.playerDmg = document.createElement("audio");
      this.playerDmg.src = "./assets/audio/explo3.wav";

      this.bulletExplo = document.createElement("audio");
      this.bulletExplo.src = "./assets/audio/explo2.wav";

      this.enemyExplo = document.createElement("audio");
      this.enemyExplo.src = "./assets/audio/explo1.wav";

    }//end of audio Repo

    //helper methods-----------------------

    //max is not included
    window.randomInt = function(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }
    //used with screen logic
    window.screenResets = {
      top: 0,
      bottom: 400,
      left: 0,
      right: 600
    }
    //list of bullets on screen
    window.bulletList = [];
    //list of enemies on screen
    //max is currently 12
    window.enemyList = [];
    //list of explosions
    window.explosionList = [];
    //List of player cannons and mothership
    window.playerList = [];
    window.playing = false;
    window.score = 0;
    window.beaconstatus = 9999;
  }//end of initialize

  if (!window.playing && !window.defeat && !window.victory) {

    //doesn't work
    // document.fonts.load('8px "Press Start 2P"').then(drawIntro());
    window.setTimeout(drawIntro, 100);

    //press enter event
    document.addEventListener('keydown', (e) => {

      if (e.keyCode === 13 && !window.playing) {
        e.preventDefault();
        ctx_ui.clearRect(0,0, 600, 400);
        window.playing = true;
        window.bg = new Parallax();
        window.audioRepo.bgm.play();
        //adding mute button functionality
        document.getElementById('mutebutton').addEventListener('click', (e) => {
          e.preventDefault();
          e = e || window.event;
          window.audioRepo.bgm.muted = !window.audioRepo.bgm.muted;
          window.audioRepo.shootsound.muted = !window.audioRepo.shootsound.muted;
          window.audioRepo.playerDmg.muted = !window.audioRepo.playerDmg.muted;
          window.audioRepo.bulletExplo.muted = !window.audioRepo.bulletExplo.muted;
          window.audioRepo.enemyExplo.muted = !window.audioRepo.enemyExplo.muted;
          e.currentTarget.classList.toggle('x');
        }, false);

        setAllIntervals();
        updateLoop();
      }
    });
  }

  //initialize scripts

  //initialize mship
  const Player = require('./player');
  const Mothership = Player.Mothership;
  const mothership = new Mothership();
  playerList.push(mothership);
  //initialize cannon vars
  const Cannon = Player.Cannon;
  let cannon = new Cannon();
  playerList.push(cannon);

  //parallax bg
  const Parallax = require('./parallaxbg');
  //main bullet script
  const bullet = require('./bullet');
  //main enemy script
  const enemyShip = require('./enemy_ship');
  //explo script
  const Explosion = require('./explosion');

    function updateShip() {
      //mothership
      if (playerList[0].shieldHP > 0) {
        playerList[0].drawShield();
      } else if (playerList[0].shieldHP === 0) {
        playerList[0].clearShield();
      }
      playerList[0].drawSelf();
    }

    function updateBullets() {
      for (let i = 0; i < bulletList.length; i++) {

        if (bulletList[i].alive) {
          //if bullet is alive and still within play area...
          if (bulletList[i].posY > -20 && bulletList[i].posY < 400) {
            ctx.clearRect(bulletList[i].posX, bulletList[i].posY,
              bulletList[i].width, bulletList[i].height);
            ctx.fillStyle = "orange";
              if (bulletList[i].tag === "player") {
                //bullet source is player
                bulletList[i].posY -= 5;
                bulletList[i].checkCollision(enemyList);
                bulletList[i].checkCollision(bulletList);
              } else {
                //check if bullet source is enemy
                bulletList[i].posY += 2;
                bulletList[i].checkCollision(playerList);
              }
            ctx.fillRect(bulletList[i].posX, bulletList[i].posY,
            bulletList[i].width, bulletList[i].height);

          } else {
            //if pos is going off, delete it
            //splice removes from i position, 1 thing
            bulletList[i].alive = false;
            bulletList[i].posX = -1000;
            bulletList[i].posY = -1000;
            bulletList.splice(i, 1);
          }
        } else {
          //if its in the list but not alive...
          bulletList[i].posX = -1000;
          bulletList[i].posY = -1000;
          bulletList.splice(i, 1);
        }
      }

    }

    function updateExplosions() {
      for (let i = 0; i < explosionList.length; i++) {
        if (explosionList[i].alive) {
          ctx.clearRect(explosionList[i].posX, explosionList[i].posY,
            explosionList[i].width -10, explosionList[i].height - 10);

            explosionList[i].update();
            explosionList[i].drawSelf();
              if (explosionList[i].timer >= 200) {
                explosionList[i].destroy();
                explosionList.splice(i, 1);
              }
        } else {
          //if its in the list but not alive...
          explosionList[i].destroy();
          explosionList.splice(i, 1);
        }
      }
    }

    function enemyUpdate() {
      if (window.playing) {

        for (let i = 0; i < enemyList.length; i++) {
          if (enemyList[i].alive) {
            //movement
            enemyList[i].clearSelf();
            enemyList[i].moveHorizontal();
            enemyList[i].moveVertical();
            enemyList[i].drawSelf();

            //shooting
            if (!enemyList[i].cooldown)
              enemyList[i].shoot(enemyList[i]);

            if (enemyList[i].cooldownTimer > 0) {
              enemyList[i].cooldownTimer -= 1;
            } else {
              enemyList[i].cooldown = false;
            }

          } else {
            //get rid of enemy from list
            enemyList.splice(i, 1);
          }
        }
      }
    }

    function randomSpawn() {
      if (window.playing) {
        if (enemyList.length < 12) {
          let randomX = randomInt(0, 10);
          let spawnXs = [60, 110, 160, 220, 270, 320, 370, 420, 470, 520]
          let newenemy = new enemyShip(spawnXs[randomX], 30,
            30, 30, 30, 30, "enemyShip");
            newenemy.drawSelf();
            enemyList.push(newenemy);
          }
      }
    }

    function beacon(image) {
      this.timer = 20000;
      this.image = image;
      this.imagePosX = 400;
      this.imagePosY = 200;
      this.runTimer = function() {
        this.timer -= 1;
        this.imagePosY += 1;
      }

      this.drawSelf = function() {
        //draw beacon, vertical line, 2 horiz lines
        //clear, then invoke update, then redraw
        ctx_ui.clearRect(this.imagePosX, this.imagePosY, 100, 50);
        // this.runTimer();
        // ctx_ui.drawImage(imageRepo.beacon,
        // this.imagePosX, this.imagePosY, 100, 50);
      }

    }

    function drawUI() {
      //left side
      ctx_ui.font = "14px Calibri";
      ctx_ui.clearRect(0, 280, 100, 80);
      ctx_ui.fillText("Score:", 0, 300);
      ctx_ui.fillText(window.score, 45, 300);
      ctx_ui.fillText("Shield:", 0, 320);
      ctx_ui.fillText(playerList[0].shieldHP, 45, 320);
      ctx_ui.fillText("Hull:", 0, 340);
      ctx_ui.fillText(playerList[0].hullHP, 45, 340);


      //rightside
      ctx_ui.clearRect(500, 280, 100, 50);
      ctx_ui.fillText("Beacon Status:", 510, 300);
      ctx_ui.fillText(window.beaconstatus, 510, 320);
    }

    function drawIntro() {
      ctx_bg.fillRect(0,0,600,400);
      ctx_ui.fillStyle = "White";
      ctx_ui.font = '8px "Press Start 2P"';
      ctx_ui.fillText("You are the last remaining survivors of your species,", 40, 40);
      ctx_ui.fillText("thrust into the void of space...", 40, 50);
      ctx_ui.fillText("...after your homeworld was ravaged by environmental destruction", 40, 60);
      ctx_ui.fillText("your sensors have identified a nearby habitable planet...", 40, 80);
      ctx_ui.fillText("The third planet in the Milky Way Galaxy...", 40, 90);
      ctx_ui.font = '16px "Press Start 2P"';
      ctx_ui.fillText("PROTECT THE MOTHERSHIP", 40, 160);
      ctx_ui.fillText("UNTIL INVASION BEACON TOUCHDOWN.", 40, 180);
      ctx_ui.font = '12px "Press Start 2P"';
      ctx_ui.fillText("Use      to move cannon's position.", 40, 260);
      ctx_ui.fillText("Shoot puny Earthlings with       .", 40, 280);
      ctx_ui.fillText("Press Enter to Begin.", 40, 340);
    }

    function drawDefeat() {

      ctx_ui.fillStyle = "White";
      ctx_ui.font = '40px "Press Start 2P"';
      ctx_ui.fillText("DEFEAT", canvas.width / 2 -100, 55);
      ctx_ui.font = '20px "Press Start 2P"';
      ctx_ui.fillText("Retry?", canvas.width / 2 -100, 125);

      if (retrychosen) {
        ctx_ui.fillStyle = "Yellow";
        ctx_ui.fillText("Yes", canvas.width / 2 + 60, 125);
        ctx_ui.fillStyle = "White";
        ctx_ui.fillText("No", canvas.width / 2 + 140, 125);
      }
      if (!retrychosen) {
        ctx_ui.fillStyle = "White";
        ctx_ui.fillText("Yes", canvas.width / 2 + 60, 125);
        ctx_ui.fillStyle = "Yellow";
        ctx_ui.fillText("No", canvas.width / 2 + 140, 125);
      }

    }

    function updateLoop() {

      if (window.playing) {
        window.requestAnimationFrame(updateLoop);
        window.bg.drawSelf();
        updateShip();
        drawUI();
        updateBullets();
        updateExplosions();
        updateCannon();
        if (window.beaconstatus > -4)
        window.beaconstatus -= 2;
        defeatCondition();
        winCondition();
      } else {
        window.requestAnimationFrame(pausedLoop);
      }

    }

    function pausedLoop() {
      window.requestAnimationFrame(pausedLoop);
      drawDefeat();
    }

  function setAllIntervals() {
    //custom update intervals
      window.setInterval(randomSpawn, 3000);
      window.setInterval(enemyUpdate, 500);
  }//end set all intervals

  function updateCannon() {
    let thisCannon = window.playerList[1];
    if (!thisCannon.alive) {
      thisCannon.deathtimer += 1;
      if (thisCannon.deathtimer >= 90) {
        thisCannon.respawn();
        thisCannon.deathtimer = 0;
      }
    } else {
      //its alive
      thisCannon.drawSelf();
    }

    //managing weapon cooldown
    if (thisCannon.cooling) {
      thisCannon.cooldown -= 1;
    }

    if (thisCannon.cooldown <= 0) {
      thisCannon.cooling = false;
      thisCannon.cooldown = 15;
    }

  }//end of update cannon


  //player movement definitions
  //gotta split horizontal and vertical properly
  function moveRight() {

    ctx.clearRect(cannon.posX, cannon.posY, cannon.width, cannon.height - 15);

    //horizontal movement
    if (cannon.posX > 70 && cannon.posX < 530) {
      cannon.posX += 20;
    } else {
      cannon.posX += 10;
    }

    //vertical movement

    //descend while you're on right
    if (cannon.posX > 415) {
      cannon.posY += 10;
    }
    //ascend while you're on left
    else if (cannon.posX < 300) {
      cannon.posY -= 10;
    } else if (cannon.posX < 185) {
      cannon.posY -= 15;
    }

    //downward bounds
    if (cannon.posY > 400)
    cannon.posY = 400;

    //upward bounds
    if (cannon.posY < 260)
    cannon.posY = 260;

    cannon.screenResets();
  }

  function moveLeft() {

    ctx.clearRect(cannon.posX, cannon.posY, cannon.width, cannon.height - 15);

    //horizontal movement
    if (cannon.posX > 70 && cannon.posX < 580) {
      cannon.posX -= 20;
    } else {
      cannon.posX -= 10;
    }

    //vertical movement

    //decend while you're on left
    if (cannon.posX < 185) {
      cannon.posY += 10;
    }
    //ascend while you're on right
    else if (cannon.posX > 300) {
      cannon.posY -= 10;
    } else if (cannon.posX > 415) {
      cannon.posY -= 15;
    }

    //downward bounds
    if (cannon.posY > 400)
    cannon.posY = 400;

    //upward bounds
    if (cannon.posY < 260)
    cannon.posY = 260;
    cannon.screenResets();
  }

  function defeatCondition() {
    if (playerList[0].hullHP <= 0)
    defeat();
  }

  //do once upon defeat
  function defeat() {
    window.playing = false;
    window.audioRepo.bgm.pause();
    window.defeat = true;
    window.retrychosen = true;

    if (window.defeat) {
      cannon.alive = false;

      //keypress handler for retry
      document.addEventListener('keydown', (e) => {
        if (e.keyCode === 37) {
          e.preventDefault();
          window.retrychosen = true;
          console.log(retrychosen);
        }
        if (e.keyCode === 39) {
          e.preventDefault();
          window.retrychosen = false;
          console.log(retrychosen);
        }

        if (e.keyCode === 13 && window.retrychosen) {
          e.preventDefault();
          console.log(window.retrychosen);
          location.reload();
        }
      });
    }

  }

  function winCondition() {
    if (playerList[0].hullHP > 0 && beaconstatus <= 0)
    victory();
  }

  function victory() {
    window.playing = false;
    window.audioRepo.bgm.pause();
    window.victory = true;
    if (window.victory) {
      cannon.alive = false;
      ctx_ui.fillStyle = "White";
      ctx_ui.font = '40px "Press Start 2P"';
      ctx_ui.fillText("VICTORY", canvas.width / 2 -100, 55);
    }
    //show graphic for victory
  }


  //keypress handler
  //this is also basically the update() for player
  document.addEventListener('keydown', (e) => {

    if (cannon.alive) {
      switch (e.keyCode) {

        //left
        case 37:
          e.preventDefault();
          moveLeft();
          ctx.drawImage(imageRepo.cannonSheet,
          0, 0, 90, 220,
          cannon.posX, cannon.posY, cannon.width, cannon.height - 20);
        break;

        //right
        case 39:
          e.preventDefault();
          moveRight();
          ctx.drawImage(imageRepo.cannonSheet,
          0, 0, 90, 220,
          cannon.posX, cannon.posY, cannon.width, cannon.height - 20);
        break;

        //spacebar shoot
        case 32:
          e.preventDefault();
          playerList[1].playerShoot();
        break;

        //this is a tester button (q)
        case 81:
          e.preventDefault();
          playerList[0].takeDamage();
        break;

          //add another case for pause if time allows
          default:
        }

    }
  });

})//end of DOMContentLoaded
