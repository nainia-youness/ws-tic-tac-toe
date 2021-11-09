## ws-tic-tac-toe

# Description

A React.js/nodejs project that uses Websockets to:

- Create and join tic-tact-toe games
- Chat in real life with your opponent

# Technologies

- Library ws-express on the backend and websocket on the backend
- Mongodb (MongoDB Atlas) where we store:
  - the users
    example:
    {
    \_id:"u1",
    username:"username1",
    }
  - the games
    example:
    {
    \_id:"gid",
    is_available:true,
    host_gamer_id:{user_id:"uid1",sign:'X'},
    guest_gamer_id:{user_id:"uid2",sign:'O'},
    state:[{ user_id:"u1",move:0},{ user_id:"u2",move:2},{ user_id:"u1",move:3}]
    }
  - the chat rooms , each game have a corresponding chat room
    example:
    {
    \_id:"cid",
    game_id:"gid",
    state:[ {user_id:"u1",content:"hello"},{user_id:"u2",content:"hi"}]
    }
- The user's connections were stored in the server as a list
- The ODM mongoose
- The server is the one calculating the state and telling the users who won, lost or if it is a draw
- No password authentication is needed, you can sign up and sign in using only a unique username

# Endpoints

**Backend**

- sign in and sign up are regular endpoints handled using solely express
- the client send requests to the websocket through the endpoint /websocket.
  here are the methods
  - connect : add the client connection in the list of connections in the server
  - disconnect : to remove client from that list
  - create : a user create a game (the game is unavailable)
  - available : make the game available so that another person can join it.
    the user actually sends both create and available at the same time in
    this implementation.
  - cancel_game_creation : if no user joins your game even if it's available,
    you can cancel the search and the game/chat is deleted
  - join : the user look for available games.
    if he finds one, he joins in and the server sends both to him (the guest) and
    to the game host a request telling them that the game started.
  - update : only the server sends this request and doesn't expect any response from the users.
    he sends it once the game stated(user joined) to both gamers.
    it contains the chat room state and the game state.
    if someone won,lost or it's a draw, the server sends it to both users.
    if one user lost the websocket connection by leaving the page, disconnecting, refreshing page or changing routes, the other user wins.
  - chat : the user's chat is added to the corresponding chat room state
  - play : the user's move is added to the corresponding game state.
    since the game is tic-tac-toe, the server makes sure that it's the users turn
    before adding the move. if it is not, he sends an error

**Frontend**

private routes

- /signUpSignIn
- /SignUp
- /SignIn

private routes

- /createJoinGame
- /play

/Not found Page
