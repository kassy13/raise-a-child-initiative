document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("donationForm");
    const amountButtons = document.querySelectorAll(".amount-btn");
    const customAmountInput = document.getElementById("customAmount");
    const paymentMethodSelect = document.getElementById("paymentMethod");
    const paymentDetails = document.getElementById("paymentDetails");
    const cardDetails = document.getElementById("cardDetails");
    const bankDetails = document.getElementById("bankDetails");
    const paypalDetails = document.getElementById("paypalDetails");

    let selectedAmount = 0;

    // Amount button click handler
    amountButtons.forEach(button => {
        button.addEventListener("click", function () {
            customAmountInput.value = ""; // Reset custom input if a preset amount is selected
            selectedAmount = parseInt(this.getAttribute("data-amount"));
            clearActiveButtons();
            this.classList.add("active");
        });
    });

    // Clear active buttons
    function clearActiveButtons() {
        amountButtons.forEach(button => {
            button.classList.remove("active");
        });
    }

    // Ensure only one amount is selected/entered
    customAmountInput.addEventListener("input", () => {
        if (customAmountInput.value !== "") {
            clearActiveButtons(); // Remove active state from buttons if custom input is used
            selectedAmount = 0; // Set selectedAmount to 0 since we're using a custom value
        }
    });

    // Show appropriate payment details based on selection
    paymentMethodSelect.addEventListener("change", function () {
        const selectedPaymentMethod = paymentMethodSelect.value;

        // Hide all payment method details first
        cardDetails.style.display = "none";
        bankDetails.style.display = "none";
        paypalDetails.style.display = "none";

        // Remove required attributes from all payment method fields
        removeRequiredAttributes();

        if (selectedPaymentMethod === "creditCard") {
            cardDetails.style.display = "block";
            addRequiredAttributes(["cardNumber", "expiryDate", "cvv"]); // Add required to card fields
        } else if (selectedPaymentMethod === "bankTransfer") {
            bankDetails.style.display = "block";
        } else if (selectedPaymentMethod === "paypal") {
            paypalDetails.style.display = "block";
        }

        paymentDetails.style.display = selectedPaymentMethod ? "block" : "none";
    });

    // Helper function to remove required attributes from payment fields
    function removeRequiredAttributes() {
        const fields = ["cardNumber", "expiryDate", "cvv"];
        fields.forEach(fieldId => {
            document.getElementById(fieldId).removeAttribute("required");
        });
    }

    // Helper function to add required attributes
    function addRequiredAttributes(fields) {
        fields.forEach(fieldId => {
            document.getElementById(fieldId).setAttribute("required", true);
        });
    }

    // Form submission handler
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = form.name.value.trim();
        const email = form.email.value.trim();
        const customAmount = parseInt(customAmountInput.value.trim());
        const paymentMethod = paymentMethodSelect.value;
        const donationAmount = customAmount || selectedAmount;

        // Sanitize input
        if (!name.match(/^[a-zA-Z ]+$/)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Name',
                text: 'Please enter a valid name using only letters and spaces.',
            });
            return;
        }

        if (!validateEmail(email)) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Email',
                text: 'Please enter a valid email address.',
            });
            return;
        }

        if (!donationAmount || donationAmount < 1) {
            Swal.fire({
                icon: 'error',
                title: 'Invalid Amount',
                text: 'Please enter a valid donation amount.',
            });
            return;
        }

        if (!paymentMethod) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select a payment method.',
            });
            return;
        }

        if (paymentMethod === "creditCard" && (!form.cardNumber.value || !form.expiryDate.value || !form.cvv.value)) {
            Swal.fire({
                icon: 'error',
                title: 'Card Details Missing',
                text: 'Please enter your credit card details.',
            });
            return;
        }

        // Simulate form submission (replace this with actual payment API integration)
        Swal.fire({
            icon: 'success',
            title: 'Thank you!',
            text: 'Your donation has been successfully processed.',
        });

        form.reset();
        selectedAmount = 0;
        clearActiveButtons();
        paymentDetails.style.display = "none";
    });

    // Helper function to validate email
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(String(email).toLowerCase());
    }
});
