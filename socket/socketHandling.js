let questions = require('./Game/QuestionGenerate');

module.exports = io => {
  io.on('connection', function(socket) {
    // socket.on('disconnect', function() {});

    socket.on('onSending_Message', msg => {
      io.emit('onRecieve_Message', msg);
    });

    socket.on('findGame', data => {
      socket.join(data.MatchToken);

      let room = io.sockets.adapter.rooms[data.MatchToken];
      io.in(data.MatchToken).emit(data.MatchToken, room.length);
    });

    socket.on('startGame', data => {
      io.emit('starting_game', {
        gametoken: data.MatchToken
      });
    });

    socket.on('quiz', data => {
      if (data === 'new_question') io.emit('game', questions.GetQuestion());
    });

    socket.on('rank', data => {
      io.emit('scoreranks', {
        matchtoken: data.matchtoken,
        username: data.username,
        points: data.points
      });
    });

    socket.on('join', function(data) {
      socket.join(data.roomId);
      socket.room = data.roomId;
      const sockets = io.of('/').in().adapter.rooms[data.roomId];
      if (sockets.length === 1) {
        socket.emit('init');
      } else {
        if (sockets.length === 2) {
          io.to(data.roomId).emit('ready');
        } else {
          socket.room = null;
          socket.leave(data.roomId);
          socket.emit('full');
        }
      }
    });
    socket.on('signal', data => {
      io.to(data.room).emit('desc', data.desc);
    });
    socket.on('disconnect', () => {
      const roomId = Object.keys(socket.adapter.rooms)[0];
      if (socket.room) {
        io.to(socket.room).emit('disconnected');
      }
    });
  });
};
