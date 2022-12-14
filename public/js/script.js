// const chatbox = document.querySelector("#chatbox");
// const socket = io("http://localhost:3000")
// const audio = new Audio("ring.mp3")
// const username = prompt("Username")

// socket.on("connect", () => {
//   console.log("connect");
// });

// socket.emit("join", username);
// socket.on("nousername", () => {
//   alert("Please enter the username");
//   username = prompt("username")
//   socket.emit("join", username)
// })

// socket.on("joined_user",data=>{
//          displayMessage("ChitoBot",`${data} joined the chat`)
// })
// socket.on("chat",data=>{
//     displayMessage(data.username,data.msg)
//     chatbox.scrollTop = chatbox.scrollHeight
//     audio.play()
// })
// socket.on("left",data=>{
//     displayMessage("ChitoBot",data.msg)
// })

// const input = document.querySelector("input")
// const button = document.querySelector("button")
// button.addEventListener("click",(e)=>{
//   e.preventDefault()
//     if(input.value == ""){
//         alert("Please type your message!")
//     }
//     else{
//         displayMessage(username,input.value)
//         chatbox.scrollTop = chatbox.scrollHeight
//         socket.emit("chat_message",input.value)
//         audio.play()
//     }
// })

// function displayMessage(user, msg) {
//   const div = document.createElement("div");
//   div.classList.add("message");
//   div.innerHTML = ` <p class="user">${user}</p>
//     <p class="chat_message">${msg}</p>`;
//   chatbox.appendChild(div);
// }
const chatbox = document.querySelector(".chatbox");
const chatarea = document.querySelector(".chat-area");
const audio = new Audio("ring.mp3")
 
// connecting to the server
const socket = io('')
 
// asking user for the username
let username = prompt("username")
 
// SENDING EVENTS TO THE SERVER
socket.emit("join", username)
 
// HANDLING WHEN USER NOT ENTERED THE USERNAME
socket.on("nousername", () => {
    alert("please enter the username");
    username = prompt("username")
    socket.emit("join", username)
})
// HANDLING EVENTS ON THE CLIENT SIDE
socket.on("joined_user", data => {
    displayMessage("ChitoBot", `${data} joined the chat`)
    chatbox.scrollTop = chatbox.scrollHeight
    chatarea.scrollTop = chatbox.scrollHeight
})
socket.on("chat", data => {
    audio.play()
    displayMessage(data.username, data.msg)
    chatbox.scrollTop = chatbox.scrollHeight
    chatarea.scrollTop = chatbox.scrollHeight
})
socket.on("left", (data) => {
    displayMessage("ChitoBot", data.msg)
})
// selecting elements
 const sound = document.querySelector(".add")
 
const input = document.querySelector("input");
const button = document.querySelector("button");
 
button.addEventListener("click", () => {
    if (input.value == "") {
        alert("Please type something")
    }
    else {
        displayMessage(username, input.value)
        chatbox.scrollTop = chatbox.scrollHeight
        chatarea.scrollTop = chatbox.scrollHeight
        socket.emit("chat_message", input.value)
        input.value= ""
 
    }
})

function enterKeyPressed(event) {
    if (event.keyCode == 13) {
        if (input.value == "") {
            alert("Please type something")
        }
        else {
            displayMessage(username, input.value)
            chatbox.scrollTop = chatbox.scrollHeight
            chatarea.scrollTop = chatbox.scrollHeight
            socket.emit("chat_message", input.value)
            input.value= ""
     
        }
    } else {
       
    }
 } 
 
function displayMessage(user, msg) {
    const div = document.createElement("div");
    const div1 = document.createElement("div");
    const inputString = user;
    const outputString1 = inputString.slice(0, 1);
    div1.classList.add("message_box");
    div1.innerHTML = `  <div class="chat-smg-img">
    <div class="img bg-color">
        <span class="img-color">${outputString1}</span>
    </div>
</div>
<div class="chat-msg-content">
    <div class="chat-msg-name">
        <div class="msg-name user">
            <h6 class="user">
                ${user}
            </h6>
        </div>  
     </div>
     <div class="chat-msg-text chat_message">
        <p>
            ${msg}
        </p>
        </div>
    </div>
    `
    
    chatbox.appendChild(div1)
}