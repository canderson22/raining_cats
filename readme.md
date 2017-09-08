# [Raining Cats](https://canderson22.github.io/raining_cats)

Catch the most raining cats to avoid them getting eated by hungry dogs.

## How to play
Each player will have four 20 second rounds to catch the most cats they can by moving the mouse over each cat.
After each 20 secound round, the speed of the rain will increase. After player one plays four rounds it will be player two's turn.

##Development & Technologies Used
- HTML
- CSS
- JavaScript

##Approach 

Started with a game object where I tried to put most of the logic for the whole game. I then created functions to wipe the page clean and generate new HTML through JavaScript. I created animations to make the cats fall down the page and mouseenter events to capture the cats and recieve points. I created a function at the end of the animations to signify that the player missed that cat and then duduct points. Lastly I created a play again button where I clear all the values in the game object and regenerate the HTML and start game function again.

##Unsolved Problems

Wanted to clean up code that is not DRY.
Styling issues with background being displayed on different screens.
Smoother transitions from round to round.
Better styling of overall game.


##User Stories

As a user, I can enter my name so I can know which player goes first.

As a user, I can easily move the controls, so I do not get frustrated or struggle to play the game.

As a user, I can easily understand the instructions, so I know how to score and win the game.

As a user, when I win its clearly displayed, so I know I have won.

As a user, it is easy to restart the game, so i can quickly play again.

As a user, if I have the highest score ever, I would like it to be saved to be given the recognition.