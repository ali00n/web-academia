import { memberAPI } from '../utils/api.js';

let currentStep = 1;
const totalSteps = 4;

document.addEventListener('DOMContentLoaded', () => {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    if (!token) {
        alert('Por favor, faça login primeiro.');
        window.location.href = 'login.html';
        return;
    }

    // Initialize form
    updateProgress();

    // Form submission
    const form = document.getElementById('onboardingForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    }
});

function nextStep() {
    // Validate current step
    if (!validateStep(currentStep)) {
        return;
    }

    if (currentStep < totalSteps) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('completed');

        // Show next step
        currentStep++;
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');

        updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function prevStep() {
    if (currentStep > 1) {
        // Hide current step
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.remove('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('active');

        // Show previous step
        currentStep--;
        document.querySelector(`.form-step[data-step="${currentStep}"]`).classList.add('active');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.remove('completed');
        document.querySelector(`.step[data-step="${currentStep}"]`).classList.add('active');

        updateProgress();

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function updateProgress() {
    const progress = ((currentStep - 1) / (totalSteps - 1)) * 100;
    document.getElementById('progressBar').style.width = `${progress}%`;
}

function validateStep(step) {
    const currentFormStep = document.querySelector(`.form-step[data-step="${step}"]`);
    const inputs = currentFormStep.querySelectorAll('input[required], select[required]');

    let isValid = true;

    inputs.forEach(input => {
        if (!input.value || input.value === '') {
            input.classList.add('error');
            isValid = false;

            // Show error message
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('span');
                errorMsg.className = 'error-message';
                errorMsg.textContent = 'Este campo é obrigatório';
                input.parentNode.appendChild(errorMsg);
            }
        } else {
            input.classList.remove('error');
            const errorMsg = input.parentNode.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.remove();
            }
        }
    });

    if (!isValid) {
        alert('Por favor, preencha todos os campos obrigatórios.');
    }

    return isValid;
}

function selectPlan(planType) {
    // Remove selected class from all plans
    document.querySelectorAll('.plan-card').forEach(card => {
        card.classList.remove('selected');
    });

    // Add selected class to chosen plan
    document.querySelector(`.plan-card[data-plan="${planType}"]`).classList.add('selected');

    // Set hidden input value
    document.getElementById('selectedPlan').value = planType;

    // Move to next step after short delay
    setTimeout(() => {
        nextStep();
    }, 500);
}

async function handleSubmit(event) {
    event.preventDefault();

    // Validate final step
    if (!validateStep(currentStep)) {
        return;
    }

    // Collect all form data
    const profileData = {
        fullName: document.getElementById('fullName').value,
        age: parseInt(document.getElementById('age').value),
        weight: parseFloat(document.getElementById('weight').value),
        height: null, // Will be added from member dashboard
        trainingGoal: document.getElementById('trainingGoal').value,
        selectedPlan: document.getElementById('selectedPlan').value,
        paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value
    };

    try {
        // Call backend API
        await memberAPI.createProfile(profileData);

        // Show success message
        alert('Cadastro concluído com sucesso! Bem-vindo à Black Fitness! 🎉');

        // Redirect to member dashboard
        window.location.href = 'member-dashboard.html';
    } catch (error) {
        alert(error.message || 'Erro ao salvar perfil. Tente novamente.');
    }
}

// Make functions globally available
window.nextStep = nextStep;
window.prevStep = prevStep;
window.selectPlan = selectPlan;
