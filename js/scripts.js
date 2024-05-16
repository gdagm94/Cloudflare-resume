(function($) {
  "use strict"; // Start of use strict
  //The purpose of "use strict" is to indicate that the code should be executed in "strict mode".
  //With strict mode, you can not, for example, use undeclared variables (lessprone to errors)
  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
      this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ?
        target :
        $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate({
            scrollTop: target.offset().top,
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });
  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });
  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#sideNav",
  });
})(jQuery); // End of use strict

//dark mode
function make_me_dark() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}

function queryAssistant(userQuery) {
  // Make an API call to the OpenAI Assistants API
  // Replace 'YOUR_API_KEY' with your actual API key
  fetch('https://platform.openai.com/playground/assistants?assistant=asst_sOahCcirt3x03jeXPEoDG5Nt', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer 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'
      },
      body: JSON.stringify({
          prompt: userQuery,
          max_tokens: 150  // Adjust max_tokens based on your assistant's configuration
      })
  })
  .then(response => response.json())
  .then(data => {
      document.getElementById('chatMessages').innerHTML += '<p><strong>User:</strong> ' + userQuery + '</p>';
      document.getElementById('chatMessages').innerHTML += '<p><strong>AI Assistant:</strong> ' + data.choices[0].text + '</p>';
  })
  .catch(error => {
      console.error('Error:', error);
      document.getElementById('chatMessages').innerHTML += '<p>An error occurred. Please try again later.</p>';
  });
}

function sendMessage() {
    var userInput = document.getElementById('userInput').value;
    document.getElementById('chatMessages').innerHTML += '<p><strong>User:</strong> ' + userInput + '</p>';
    queryAssistant(userInput);
    document.getElementById('userInput').value = ''; // Clear input field after sending message
}

function openForm() {
  document.getElementById("myForm").style.display = "block";
}
function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
