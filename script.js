// =====================
// DOM ELEMENTS
// =====================

const sections = document.querySelectorAll(".step-content");
const sidebarSteps = document.querySelectorAll(".step");

const nextButton = document.getElementById("next-button");
const backStep2 = document.getElementById("back-step2");
const nextStep2 = document.getElementById("next-step2");
const backStep3 = document.getElementById("back-step3");
const nextStep3 = document.getElementById("next-step3");
const backStep4 = document.getElementById("back-step4");
const confirmButton = document.getElementById("confirm-button");
const userName = document.getElementById("userName");
const email = document.getElementById("email");
const phone = document.getElementById("phone");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const phoneError = document.getElementById("phone-error");

const planCards = document.querySelectorAll(".plan_card");
const planError = document.getElementById("plan-error");

const addonCards = document.querySelectorAll(".addon_card");
const addonError = document.getElementById("addon-error");

const selectedPlanContainer = document.getElementById("selected-plan");
const selectedAddonsContainer = document.getElementById("selected-addons");
const totalPrice = document.getElementById("total-price");

// STATE

let currentStep = 1;
let selectedPlan = "";
let selectedAddons = [];

const planPrices = {
    Arcade: 9,
    Advanced: 12,
    Pro: 15
};
const addonPrices = {
    "Online service": 1,
    "Larger storage": 2,
    "Customizable profile": 2
};

// =====================
// FUNCTIONS
// =====================

function showStep(step) {

    sections.forEach(section =>
        section.classList.add("hidden")
    );

    document
        .getElementById(`step${step}`)
        .classList.remove("hidden");

        sidebarSteps.forEach(sidebarStep =>
            sidebarStep.classList.remove("active")
        );

    const activeSidebarStep = document.querySelector(
        `[data-step="${step}"]`
    );

    if (activeSidebarStep) {
        activeSidebarStep.classList.add("active");
    }

    currentStep = step;
}
function validateStep1() {
    let isValid = true;

    nameError.textContent = "";
    emailError.textContent = "";
    phoneError.textContent = "";

    const nameValue = userName.value.trim();
    const emailValue = email.value.trim();
    const phoneValue = phone.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^[+\d\s-]{7,20}$/;

    if (nameValue === "") {
        nameError.textContent = "Name is required";
        isValid = false;
    }

    if (emailValue === "") {
        emailError.textContent = "Email is required";
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        emailError.textContent = "Enter a valid email";
        isValid = false;
    }

    if (phoneValue === "") {
        phoneError.textContent = "Phone number is required";
        isValid = false;
    } else if (!phonePattern.test(phoneValue)) {
        phoneError.textContent = "Enter a valid phone number";
        isValid = false;
    }

    return isValid;
}

function selectPlan(card) {

    planCards.forEach(plan => {
        plan.classList.remove("selected");
    });

    card.classList.add("selected");

    selectedPlan = card.dataset.plan;

    planError.textContent = "";
}

function toggleAddon(card) {

    const checkbox = card.querySelector('input[type="checkbox"]');
    const addonName = card.dataset.addon;

    card.classList.toggle("selected");

    checkbox.checked = card.classList.contains("selected");

    if (checkbox.checked) {
        selectedAddons.push(addonName);
    } else {
        selectedAddons = selectedAddons.filter(
            addon => addon !== addonName
        );
    }

    addonError.textContent = "";
}

function updateSummary() {

    const planPrice = planPrices[selectedPlan];

    selectedPlanContainer.querySelector("h3").textContent = selectedPlan;

    selectedPlanContainer.querySelector("p").textContent =`$${planPrice}/mo`;

    

    let total = planPrice;

    let addonsHTML = "";

    selectedAddons.forEach(addon => {
        total += addonPrices[addon];

        addonsHTML += `
            <p>${addon} (+$${addonPrices[addon]}/mo)</p>
            `;
    });

selectedAddonsContainer.innerHTML = addonsHTML;

    totalPrice.textContent = `Total: $${total}/mo`;
}

planCards.forEach(card => {
    card.addEventListener("click", () => {
        selectPlan(card);
    });
});

addonCards.forEach(card => {

    card.addEventListener("click", () => {
        toggleAddon(card);
    });

});

nextButton.addEventListener("click", () => {
    if (validateStep1()) {
        showStep(2);
    }
});

backStep2.addEventListener("click", () => {
    showStep(1);
});

nextStep2.addEventListener("click", () => {

    if (selectedPlan === "") {
        planError.textContent = "Please select a plan";
        return;
    }

    showStep(3);
});

backStep3.addEventListener("click", () => {
    showStep(2);
});

nextStep3.addEventListener("click", () => {

    if (selectedAddons.length === 0) {
        addonError.textContent = "Please select at least one add-on";
        return;
    }

    updateSummary();
    showStep(4);

});

backStep4.addEventListener("click", () => {
    showStep(3);
});

confirmButton.addEventListener("click", () => {
    showStep(5);
});

document.querySelector("form").addEventListener("submit", (e) => {
    e.preventDefault();
});
