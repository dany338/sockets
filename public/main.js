/*var forever = require('hode_modules/lib/forever-monitor');
var child   = new (forever.Monitor)('/server/main.js');
child.start();

child.on('start', function (_, data) {
    console.log('Forever process running server.js on ' + port);
    next(null, child);
  });*/


var socket = io.connect('http://www.genion.co:5000', { 'forceNew': true });

socket.on('messages', function (data) {
  console.log(data);
  render(data);
})

function render(data) {
  var html = data.map(function (elem, index) {
    return (`<div>
              <strong>${elem.author}</strong>:
              <em>${elem.text}</em>
            </div>`);
  }).join(" ");

  document.getElementById('messages').innerHTML = html;
}

function addMessage(e) {
  var message = {
    author: document.getElementById('username').value,
    text: document.getElementById('texto').value
  };

  socket.emit('new-message', message);
  return false;
}
