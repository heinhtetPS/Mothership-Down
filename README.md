# Mothership-Down

## Proposal

Mothership Down tells the story of the popular arcade classic "Space Invaders" from the side of the Alien invaders instead of the humans. It contains elements of the original space invaders, but adds additional layers of resource management and some tower defense that introduce a deeper sense of urgency and hectic gameplay into the mix.

You are the last remaining survivors of your species, thrust into the void of space, after your homeworld was ravaged by environmental destruction. Hoping to start anew, 8 colony ships embarked in 8 different directions hoping to find sanctuary. Of those ships, you command Mothership Omega, the last line of defense against extinction. You must do whatever it takes to ensure the survival of your bretheren. As our game begins, your sensors have identified the 3rd planet in the Milky way Galaxy with a 65% habitability rating. Not ideal, but better than anything you've encountered thusfar...

## Gameplay

The player must balance defending the mothership from earth's defense forces and charging up enough power to drop an invasion beacon into earth's atmosphere, which will alert all other surviving colony ships to the location and complete your mission. The mothership will have shields, manual gun defense and automatic turret defenses at your disposal. You must decide which systems need power and re-distribute power dynamically to balance offense, defense and the primary objective: launching the invasion beacon into Earth's atmosphere. Earth's defense forces will attack with space fighter jets, kinetic weaponry, missle weaponry and EMP disruptors to halt your efforts. Ensure the survival of your species and win this last stand against the earthlings.

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

Currently, I am aiming to write all logic in Javascript and most graphics being rendered in HTML5 Canvas via sprite sheets and sprite animation.


## Wireframes

Main and only screen:

![wireframe sketch](https://github.com/heinhtetPS/Mothership-Down/blob/master/Project%20Docs/Photo%20Sep%2006%2C%2012%2057%2056%20AM.jpg "wireframe sketch")


## Implementation Timeline

### Phase 1
#### make basic skeleton of space invaders game
- parallax stars background
- cannon that can shoot bullets and move on x axis
- particle system for generating explosions and bullets
- enemy ships are on a grid,
- ships appear and shoot bullets towards the bottom of screen
- 2nd type of enemy ship can shoot rockets that do more dmg but can be shot down
- add shield feature, can turn on or off

### Phase 2
- Make Power distribution UI and beacon progress bar
- Add the power and distribution system
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
- More enemy unit types: fast kamikaze plane, slow hydrogen bomb carrier,
