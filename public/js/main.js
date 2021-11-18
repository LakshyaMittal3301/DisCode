const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

// Getting Username and Room
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});

const socket = io();

// Join Room
socket.emit("joinRoom", { username, room });

// Get Room and Users
socket.on("roomUsers", ({ room, users }) => {
  outputRoomName(room);
  outputUser(users);
});

// Message from server
socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);

  // Scroll Down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  // Get chat message
  const msg = e.target.elements.msg.value;

  // Emit chat message
  socket.emit("chatMessage", msg);
  e.target.elements.msg.value = "";
  e.target.elements.msg.focus();
});

// Output message to dom
function outputMessage(message) {
  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}

// Add Room name
function outputRoomName(room) {
  document.getElementById("room-name").innerText = room;
}

// Add User List
function outputUser(users) {
  const users_ul = document.getElementById("users");
  users_ul.innerHTML = "";
  users.forEach((user) => {
    const user_li = document.createElement("li");
    user_li.innerText = user.username;
    users_ul.appendChild(user_li);
  });
}
