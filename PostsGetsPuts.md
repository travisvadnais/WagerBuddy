### Gets, Posts, and Puts

## gets

|  GET   	       |  PROCESS                    	  |  RETURNS           	|
|-----------       |-----------	                      |-------------    	|
|                  |                                  |                     |
| /names           | used to ensure nickname          | All user.id and     | [ ]
|                  | isn't already used for initial   | user.nickname       |
|                  | log in, and for populating       | in alphabetical     |
|                  | opponent dropdown                | order               | 
|                  |                                  |                     |
| /activebets/:id  | used to pull all active bets     | bets.id, bets.title,| [x]
|                  | where no winner has been         | bets.player2name    |
|                  | declared that                    |                     |
|                  | the player id is involved in     |                     |
|                  |                                  |                     |
|                  |                                  |                     |
|/inactivebets/:id | used to pull all completed bets  | bets.id, bets.title,| [x]
|                  | where a winner has been declared | bets.player2name,   |
|                  | that the player id is involved   |  bets.player1win    |
|                  | in                               |                     |
|                  |                                  |                     |
|                  |                                  |                     |
| /bet/:betid      | used to pull a single bet's      | bets.id, bets.title | [x]
|                  |  details                         |bets.terms,          |
|                  |                                  | bets.stakes,        |
|                  |                                  | bets.settledate     |
|                  |                                  | bets.player2name    | 
|                  |                                  | bets.player1win     |
|                  |                                  | bets.player2win     |
|                  |                                  | bets.player1welch   |
|                  |                                  | bets.player2welch   |
|                  |                                  | bets.betdate        |
|                  |                                  |                     |
|                  |                                  |                     |
| /record/:id      | used to pull overall totals      | player.wins         | [ ]
|                  | for the player id                | player.losses       |
|                  |                                  | player.welches      |
|                  |                                  | player.activebets   |   
|                  |                                  |                     |
----------------------------------------------------------------------------


## posts

|  POST 	       |  PROCESS                    	  |  RETURNS           	|
|-----------       |-----------	                      |-------------    	|
|                  |                                  |                     |
| /newuser         | from one-time only log-in screen,|  user.id            | [ ]
|                  | Passes user.nickname, user.email |  (newly created)    |
|                  | to server                        |                     |           
|                  |                                  |                     |
| /newbet          | Passes user.id, bet.title,       | bet.id              | [x]
|                  | bet.terms, bet.stakes,           | (newly created)     |
|                  | bet.player2name OR bet.player2id |                     |
|                  | Optional*                        |                     | 
|                  | bet.settledate                   |                     |
|                  | to server                        |                     |
|                  |                                  |                     |
-----------------------------------------------------------------------------



## puts

|  PUT  	       |  PROCESS                    	  |  RETURNS           	|
|-----------       |-----------	                      |-------------    	|
|                  |                                  |                     |
|   /betupdate     | Passes                           |                     | [x]
|                  | bet: id                          |  bet:id             |
|                  | winner: 1, or 2                  |                     |
|                  | welcher: 1, or 2                 |                     |
|                  |                                  |                     |
-----------------------------------------------------------------------------  

## Special notes:

# Before sending a new user
Before submitting a new user (login), pull all users and check if their nickname is already 
being used - if it is, prompt for a new one.  Once a unique nickname is supplied, then post to the server.

# When sending a new wager

1) Populate the dropdown list items of all nicknames with the users_id property so that can be sent in the post if they select from it. 

2) When sending the new bet object, send the users_id property (integer) if they used the dropdown to select someone already in the database, or the player2 nickname (string) if they filled in the field with a name.  Do not allow them to type in a number as the nickname.

# When listing all wagers

You can make one list for active wagers (not yet decided), and another list for inactive (decided) wagers.  We think colorizing the backgrounds of the inactive wagers (red if player1 lost, green if they won) would be a nice touch.


