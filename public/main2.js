var forever = require('forever-monitor');
var child   = new (forever.Monitor)('server/main2.js');

child.on('start', function() {
    console.error('Forever start script for ' + child.times + ' time');
});

var socket = io.connect('http://localhost:5000', { 'forceNew': true });

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
