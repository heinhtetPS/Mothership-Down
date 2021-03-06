# Mothership-Down
[Live](http://heinhtetps.info/Mothership-Down/)

![wireframe sketch](https://github.com/heinhtetPS/Mothership-Down/blob/master/Project%20Docs/screen.jpg "wireframe sketch")

Mothership Down tells the story of the popular arcade classic "Space Invaders" but from the side of the Alien invaders instead of the humans. It contains elements of the original space invaders, but adds additional layers of resource management and some tower defense mechanics that introduce a deeper sense of urgency and hectic gameplay into the mix.

You are the last remaining survivors of your species, thrust into the void of space, after your homeworld was ravaged by environmental destruction. Hoping to start anew, 8 colony ships embarked in 8 different directions hoping to find sanctuary. Of those ships, you command Mothership Omega, the last line of defense against extinction. You must do whatever it takes to ensure the survival of your brethren. As our game begins, your sensors have identified the 3rd planet in the Milky way Galaxy with a 65% habitability rating. Not ideal, but better than anything you've encountered thusfar...

## Gameplay

The player must balance defending the mothership from earth's defense forces and charging up enough power to drop an invasion beacon into earth's atmosphere, which will alert all other surviving colony ships to the location and complete your mission. The mothership will have shields, manual gun defense and automatic turret defenses at your disposal. You must decide which systems need power and re-distribute power dynamically to balance offense, defense and the primary objective: launching the invasion beacon into Earth's atmosphere. Earth's defense forces will attack with space fighter jets, kinetic weaponry, missile weaponry and EMP disruptors to halt your efforts. Ensure the survival of your species and win this last stand against the earthlings.

## MVP

- Basic space invaders functionality: shooting from the main cannon and being able to destroy space fighters
- Basic power toggling UI. Able to distinguish between powered up systems and powered down.
- Set up auto cannons in specific spots like a tower defense
- Victory when the beacon touches down successfully. Defeat when mothership is destroyed.

Bonus
- Upgrade weaponry and ship capabilities
- Upgrade capabilities of Earth defense forces (more enemy unit types)
- Get better textures and sharpen other aesthetic issues.

## Technologies, Libraries, APIs

Currently, all game logic is in vanilla Javascript and all graphics/animations are being rendered in HTML5 Canvas. Webpack is used to organize script files.

### Game

The main game loop is established and maintained in game.js. First, all assets are initialized such as the canvas DOM elements, audio, spritesheets and variable trackers.

### Update

Game logic is handled by the update loop, which loops through all game objects and decides their upcoming behavior depending on game state and player input. For example, bulletList lists all bullets on screen and loops through them to apply their velocity each frame. The speed and trajectory are decided upon bullet generation, however their actual movement is handled by update. Player controls are also contained here, updating the player's cannon depending on keystrokes received.

### Draw & Animation

Each game object has a drawSelf() function which commands the object to display their associated image from the spritesheets (which are initialized in the beginning of the game). Sprites that animate are simply drawing different parts of their sprite sheet and looping through them using an internal timer. For example, the explosion animation is achieved by looping through 7 static sprite images in very quick succession.    

## Wireframes

Main screen:

![wireframe sketch](https://github.com/heinhtetPS/Mothership-Down/blob/master/Project%20Docs/Photo%20Sep%2006%2C%2012%2057%2056%20AM.jpg "wireframe sketch")


## Implementation Timeline

### Phase 1
#### make basic skeleton of space invaders game
- parallax stars background
- cannon that can shoot bullets and move on x axis
- particle system for generating explosions and bullets
- ships appear and shoot bullets towards the bottom of screen
- add shield feature, can turn on or off

### Phase 2
- Make Power distribution UI and beacon progress bar
- Add the power and distribution system
- 2nd type of enemy ship can shoot rockets that do more dmg but can be shot down
- Add victory and defeat conditions

### Phase 3
- Add build ability to build auto cannons
- enemies drop energy that can be used to build or upgrade max power
- Add additional enemies: ship that spawn other ships, ship that locks down one of your systems until destroyed
- Create a wave spawn system that directs the level experience

### Extras
- Find usable textures or spritesheets for: mothership, enemy ship generic, enemy ship carrier, rocket, earth, invasion beacon
- Maybe some spacey UI textures?
- get spash images for victory and defeat screen.
- Get backgorund music and sound effect for shoot, explosion, menu click,
- Additional ship upgrades, weapon upgrade system
- More enemy unit types: fast kamikaze plane, slow hydrogen bomb carrier

## Credits
- Spaceship assets from http://millionthvector.blogspot.com/
- Music by Shoji Meguro.
