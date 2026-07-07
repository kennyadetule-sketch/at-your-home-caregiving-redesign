// ===============================
// MOBILE MENU TOGGLE
// ===============================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("active");

});




// ===============================
// CLOSE MENU AFTER CLICKING LINK
// ===============================

const navItems = document.querySelectorAll(".nav-links a");


navItems.forEach(item => {

    item.addEventListener("click", () => {

        navLinks.classList.remove("active");

    });

});




// ===============================
// SIMPLE SCROLL REVEAL EFFECT
// ===============================


const sections = document.querySelectorAll("section");


const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                entry.target.classList.add("show");

            }

        });

    },

    {
        threshold:0.15
    }

);



sections.forEach(section => {

    section.classList.add("hidden");

    observer.observe(section);

});


// FAQ Accordion

const faqButtons = document.querySelectorAll(".faq-question");

faqButtons.forEach(button => {

    button.addEventListener("click", () => {

        const answer = button.nextElementSibling;

        const icon = button.querySelector("i");

        if (answer.style.maxHeight) {

            answer.style.maxHeight = null;

            icon.classList.remove("fa-minus");
            icon.classList.add("fa-plus");

        } else {

            answer.style.maxHeight = answer.scrollHeight + "px";

            icon.classList.remove("fa-plus");
            icon.classList.add("fa-minus");

        }

    });

});


// Scroll to Top Button

const scrollTopBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {

    if (window.scrollY > 400) {

        scrollTopBtn.style.display = "block";

    } else {

        scrollTopBtn.style.display = "none";

    }

});

scrollTopBtn.addEventListener("click", () => {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});


/* ===========================
   CONTACT FORM SUBMISSION
=========================== */

const careForm = document.getElementById("careForm");

if (careForm) {

    careForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const submitButton = careForm.querySelector("button[type='submit']");

        const originalText = submitButton.innerHTML;

        submitButton.disabled = true;
        submitButton.innerHTML = "Sending...";

        const formData = {

            name: careForm.name.value.trim(),

            email: careForm.email.value.trim(),

            phone: careForm.phone.value.trim(),

            service: careForm.service.value,

            message: careForm.message.value.trim()

        };

        try {

            const response = await fetch("http://localhost:5000/api/contact", {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(formData)

            });

            const data = await response.json();

            if (response.ok) {

                alert(data.message);

                careForm.reset();

            } else {

                if (data.errors) {

                    alert(data.errors[0].msg);

                } else {

                    alert(data.message);

                }

            }

        } catch (error) {

            console.error(error);

            alert("Unable to connect to the server. Please try again.");

        }

        submitButton.disabled = false;

        submitButton.innerHTML = originalText;

    });

}