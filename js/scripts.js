// Emailjs user id script
(function() {
  emailjs.init('1Nm0oJLU7V8IyS-yH'); // Replace 'YOUR_USER_ID' with your actual EmailJS user ID
})();

(function($) {
  "use strict";

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate({
          scrollTop: target.offset().top
        }, 1000, "easeInOutExpo");
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
    target: "#sideNav"
  });
})(jQuery);

// Toggle dark mode
function make_me_dark() {
  $("body").toggleClass("dark-mode");
}

// Form validation
(function() {
  'use strict';
  window.addEventListener('load', function() {
    var forms = document.getElementsByClassName('needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);

  var preferredContactSelect = document.getElementById('preferredContact');
  var emailGroup = document.getElementById('emailGroup');
  var phoneGroup = document.getElementById('phoneGroup');

  preferredContactSelect.addEventListener('change', function() {
    if (preferredContactSelect.value === 'email') {
      emailGroup.style.display = 'block';
      phoneGroup.style.display = 'none';
      document.getElementById('emailAddress').setAttribute('required', true);
      document.getElementById('phoneNumber').removeAttribute('required');
    } else if (preferredContactSelect.value === 'phone') {
      emailGroup.style.display = 'none';
      phoneGroup.style.display = 'block';
      document.getElementById('phoneNumber').setAttribute('required', true);
      document.getElementById('emailAddress').removeAttribute('required');
    } else if (preferredContactSelect.value === 'both') {
      emailGroup.style.display = 'block';
      phoneGroup.style.display = 'block';
      document.getElementById('emailAddress').setAttribute('required', true);
      document.getElementById('phoneNumber').setAttribute('required', true);
    } else {
      emailGroup.style.display = 'none';
      phoneGroup.style.display = 'none';
      document.getElementById('emailAddress').removeAttribute('required');
      document.getElementById('phoneNumber').removeAttribute('required');
    }
  });

  document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.checkValidity()) {
      emailjs.sendForm('service_s2kg4nf', 'template_a3hdcze', this)
        .then(function() {
          showThankYouMessage();
        }, function(error) {
          console.log('FAILED...', error);
          alert('Message sending failed. Please try again later.');
        });
    }
    this.classList.add('was-validated');
  });

//Thank you message
  function showThankYouMessage() {
    var thankYouMessage = document.getElementById('thank-you-message');
    thankYouMessage.style.display = 'block';
    setTimeout(function() {
      thankYouMessage.style.display = 'none';
    }, 3000);
  }
})();  