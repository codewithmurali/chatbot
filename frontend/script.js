document.addEventListener("DOMContentLoaded", function () {
  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");

  sendBtn.addEventListener("click", function () {
    const message = userInput.value.trim();

    if (message !== "") {
      displayMessage(message, "user-message");
      sendMessageToBackend(message);
      userInput.value = "";
    }
  });

  function displayMessage(message, messageType) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    // Add additional class based on message type
    if (messageType === "bot-response") {
      messageElement.classList.add("bot-response");
    } else if (messageType === "user-message") {
      messageElement.classList.add("user-message");
    }
    else if (messageType === "error-message") {
      messageElement.classList.add("error-message");
    }

    messageElement.innerHTML = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function sendMessageToBackend(message) {
    fetch("/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message }),
    })
      .then((response) => response.json())
      .then((data) => {
        const response = data.response;

        // Check if the response is an object
        if (typeof response === "object") {
          // Format the response for display
          let formattedResponse =
            "<p><strong>Head of Department:</strong> " +
            response["Head of Department"] +
            "</p>";
          formattedResponse += "<p><strong>Professors:</strong></p>";
          formattedResponse += "<ul>";
          response.Professors.forEach((professor) => {
            formattedResponse += "<li>" + professor + "</li>";
          });
          formattedResponse += "</ul>";
          displayMessage(formattedResponse, "bot-response"); // Display bot response

          // Display user message only if there's a bot response
          
        } else {
          // Display the response as is
          displayMessage(response, "bot-response"); // Display bot response
        }
      })
      .catch((error) => {
        const errorMessage = "An error occurred: " + error.message;
        displayMessage(errorMessage, "error-message"); // Display error message
      });
  }
});
