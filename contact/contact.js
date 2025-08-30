// EmailJS будет инициализирован в Index.js, если нужно
// (function(){
//     emailjs.init("YOUR_PUBLIC_KEY"); // Replace with your EmailJS public key
// })();

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');
const submitBtn = contactForm?.querySelector('.submit-btn');

if (contactForm) {
    // Add event listener for form submission
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Prevent default form submission

        // Check if EmailJS is loaded
        if (typeof emailjs === 'undefined') {
            alert('EmailJS ծառայությունը հասանելի չէ: Խնդրում ենք ստուգել ինտերնետ կապը և կրկին փորձել:');
            return;
        }

        const serviceID = 'service_o1s9342'; // Replace with your Service ID
        const templateID = 'template_xxt8o1u'; // Replace with your Template ID

        // Collect form data
        const formData = {
            contact: this.contact?.value || '',
            message: this.message?.value || '',
            email: 'emma.yan03@gmail.com' // Updated to 'email' to match Email.js template
        };

        // Validate form data
        if (!formData.contact.trim() || !formData.message.trim()) {
            alert('Խնդրում ենք լրացնել բոլոր դաշտերը:');
            return;
        }

        // Show loading state
        const originalText = submitBtn?.innerHTML;
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Ուղարկվում է...';
        }

        // Send the email
        emailjs.send(serviceID, templateID, formData)
            .then(function(response) {
                if (successMessage) successMessage.style.display = 'block'; // Show success message
                contactForm.reset(); // Clear the form
                setTimeout(() => {
                    if (successMessage) successMessage.style.display = 'none'; // Hide success message after a few seconds
                }, 5000);
            }, function(error) {
                alert('Նամակը չհաջողվեց ուղարկել: Խնդրում ենք փորձել ավելի ուշ:'); // Show error message in Armenian
            })
            .finally(() => {
                // Reset button state
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
    });
}

// Add smooth scroll animation on load
window.addEventListener('load', function() {
    // Add staggered animation to contact info items
    const infoItems = document.querySelectorAll('.info-item');
    infoItems.forEach((item, index) => {
        item.style.animationDelay = (1.5 + index * 0.2) + 's';
    });
});