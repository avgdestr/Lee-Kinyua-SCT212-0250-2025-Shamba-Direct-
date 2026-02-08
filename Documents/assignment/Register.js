const rules = {
    fullName: {
        required: true,
        minLength: 2,
        message: 'Please enter your full name (at least 2 characters)'
    },
    email: {
        required: true,
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Please enter a valid email address'
    },
    phone: {
        required: true,
        pattern: /^(\+254|0)[17]\d{8}$/,
        message: 'Please enter a valid Kenyan phone number (e.g., 0712345678)'
    },
    county: {
        required: true,
        message: 'Please select your county'
    },
    password: {
        required: true,
        minLength: 8,
        pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
        message: 'Password must be at least 8 characters with uppercase, lowercase, and numbers'
    },
    confirmPassword: {
        required: true,
        match: 'password',
        message: 'Passwords do not match'
    },
    privacyConsent: {
        required: true,
        checked: true,
        message: 'You must agree to the Privacy Policy'
    },
    termsConsent: {
        required: true,
        checked: true,
        message: 'You must agree to the Terms and Conditions'
    }
};

// Validate Single Field
function validateField(fieldName) {
    const field = document.getElementById(fieldName);
    const errorEl = document.getElementById(fieldName + '-error');
    const rule = rules[fieldName];
    
    if (!field || !rule) return true;
    
    const value = field.type === 'checkbox' ? field.checked : field.value.trim();
    let isValid = true;
    let errorMsg = '';
    
    if (rule.required && !value) {
        isValid = false;
        errorMsg = rule.message;
    }
    
    if (isValid && rule.minLength && value.length < rule.minLength) {
        isValid = false;
        errorMsg = rule.message;
    }
    
    if (isValid && rule.pattern && !rule.pattern.test(value)) {
        isValid = false;
        errorMsg = rule.message;
    }
    
    if (isValid && rule.match) {
        const matchField = document.getElementById(rule.match);
        if (matchField && value !== matchField.value.trim()) {
            isValid = false;
            errorMsg = rule.message;
        }
    }
    
    if (isValid && rule.checked && !field.checked) {
        isValid = false;
        errorMsg = rule.message;
    }
    
    if (errorEl) {
        errorEl.textContent = isValid ? '' : errorMsg;
    }
    
    if (isValid) {
        field.classList.remove('error');
    } else {
        field.classList.add('error');
    }
    
    return isValid;
}

function validateAll() {
    const fields = Object.keys(rules);
    let isValid = true;
    
    fields.forEach(field => {
        if (!validateField(field)) {
            isValid = false;
        }
    });
    
    return isValid;
}

function handleSubmit(e) {
    e.preventDefault();
    
    if (!validateAll()) {
        alert('Please fix the errors in the form');
        return;
    }
    
    const formData = new FormData(e.target);
    const userData = {
        userType: formData.get('userType'),
        fullName: formData.get('fullName'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        county: formData.get('county'),
        privacyConsent: formData.get('privacyConsent') === 'on',
        termsConsent: formData.get('termsConsent') === 'on',
        marketingConsent: formData.get('marketingConsent') === 'on',
        date: new Date().toISOString()
    };
    const userProfile = {
        id: 'user_' + Math.random().toString(36).substr(2, 9),
        name: userData.fullName,
        email: userData.email,
        type: userData.userType
    };
    setCookie('user_profile', JSON.stringify(userProfile), 365);
    showSuccess();
}

function showSuccess() {
    document.getElementById('register-form-container').classList.add('hidden');
    document.getElementById('success-message').classList.remove('hidden');
}

function setupForm() {
    const form = document.getElementById('registration-form');
    if (!form) return;
  
    form.addEventListener('submit', handleSubmit);
   
    const fields = ['fullName', 'email', 'phone', 'county', 'password', 'confirmPassword'];
    fields.forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.addEventListener('blur', () => validateField(fieldName));
            field.addEventListener('input', () => {
                const errorEl = document.getElementById(fieldName + '-error');
                if (errorEl) errorEl.textContent = '';
                field.classList.remove('error');
            });
        }
    });
    
    const password = document.getElementById('password');
    const confirm = document.getElementById('confirmPassword');
    if (password && confirm) {
        password.addEventListener('input', () => {
            if (confirm.value) validateField('confirmPassword');
        });
    }
}

if (document.getElementById('registration-form')) {
    document.addEventListener('DOMContentLoaded', setupForm);
}