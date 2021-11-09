## ws-tic-tac-toe

# Description

A Reactjs/nodejs project that uses websockets

- create and join games
- chat in real life with your opponent

# Technologies

- library ws on the backend and websocket on the backend
- mongodb where we store:
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
- no password authentication needed, you can sign up and sign in using only a unique username
