const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const socket = io();

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
  div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
  <p class="text">
    ${message}
  </p>`;
  document.querySelector(".chat-messages").appendChild(div);
}
