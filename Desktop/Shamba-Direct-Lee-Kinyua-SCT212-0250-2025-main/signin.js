function validateSignInForm() {
    const form = document.getElementById('signin-form');
    const email = document.getElementById('signin-email').value.trim();
    const password = document.getElementById('signin-password').value;
    let isValid = true;

    document.getElementById('signin-email-error').textContent = '';
    document.getElementById('signin-password-error').textContent = '';

    if (!email) {
        document.getElementById('signin-email-error').textContent = 'Email is required';
        isValid = false;
    } else if (!email.includes('@')) {
        document.getElementById('signin-email-error').textContent = 'Please enter a valid email';
        isValid = false;
    }

    if (!password) {
        document.getElementById('signin-password-error').textContent = 'Password is required';
        isValid = false;
    } else if (password.length < 8) {
        document.getElementById('signin-password-error').textContent = 'Password must be at least 8 characters';
        isValid = false;
    }

    return isValid;
}

function handleSignInSubmit(e) {
    e.preventDefault();

    if (!validateSignInForm()) {
        return;
    }

    const email = document.getElementById('signin-email').value;
    const rememberMe = document.getElementById('remember-me').checked;

    if (rememberMe) {
        localStorage.setItem('remembered_email', email);
    } else {
        localStorage.removeItem('remembered_email');
    }

    const form = document.getElementById('signin-form');
    form.classList.add('hidden');
    
    const successMessage = document.getElementById('success-message');
    if (successMessage) {
        successMessage.classList.remove('hidden');
    }

    localStorage.setItem('user_signed_in', 'true');
    localStorage.setItem('user_email', email);

    setTimeout(() => {
        window.location.href = 'index.html';
    }, 2000);
}

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signin-form');
    if (form) {
        form.addEventListener('submit', handleSignInSubmit);
    }

    const rememberedEmail = localStorage.getItem('remembered_email');
    if (rememberedEmail) {
        document.getElementById('signin-email').value = rememberedEmail;
        document.getElementById('remember-me').checked = true;
    }
});
