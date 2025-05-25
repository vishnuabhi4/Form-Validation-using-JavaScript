
        document.addEventListener('DOMContentLoaded', function () {
            const form = document.getElementById('signupForm');
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirmPassword');
            const email = document.getElementById('email');
            const togglePassword = document.getElementById('togglePassword');
            const toggleIcon = document.getElementById('toggleIcon');
            const submitBtn = document.getElementById('submitBtn');
            const spinner = document.getElementById('spinner');
            const successMessage = document.getElementById('successMessage');

            // Password visibility toggle
            togglePassword.addEventListener('click', function () {
                const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
                password.setAttribute('type', type);
                toggleIcon.classList.toggle('bi-eye');
                toggleIcon.classList.toggle('bi-eye-slash');
            });

            // Password strength checker
            password.addEventListener('input', function () {
                const value = this.value;
                const strengthDiv = document.getElementById('passwordStrength');
                let strength = 0;
                let feedback = '';

                if (value.length >= 8) strength++;
                if (/[a-z]/.test(value)) strength++;
                if (/[A-Z]/.test(value)) strength++;
                if (/[0-9]/.test(value)) strength++;
                if (/[^A-Za-z0-9]/.test(value)) strength++;

                switch (strength) {
                    case 0:
                    case 1:
                    case 2:
                        feedback = '<span class="strength-weak">Weak password</span>';
                        break;
                    case 3:
                    case 4:
                        feedback = '<span class="strength-medium">Medium password</span>';
                        break;
                    case 5:
                        feedback = '<span class="strength-strong">Strong password</span>';
                        break;
                }

                strengthDiv.innerHTML = feedback;
            });

            // Real-time email validation
            email.addEventListener('input', function () {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                const emailError = document.getElementById('emailError');
                
                if (this.value && !emailRegex.test(this.value)) {
                    emailError.textContent = 'Please enter a valid email address.';
                } else if (this.value && emailRegex.test(this.value)) {
                    // Check if email might already exist (simulation)
                    const commonEmails = ['test@test.com', 'admin@admin.com', 'user@user.com'];
                    if (commonEmails.includes(this.value.toLowerCase())) {
                        emailError.textContent = 'This email address is already registered.';
                        this.setCustomValidity('Email already exists');
                    } else {
                        this.setCustomValidity('');
                    }
                }
            });

            // Real-time password matching
            function checkPasswordMatch() {
                const confirmPasswordError = document.getElementById('confirmPasswordError');
                
                if (confirmPassword.value && password.value !== confirmPassword.value) {
                    confirmPassword.setCustomValidity('Passwords do not match');
                    confirmPasswordError.textContent = 'Passwords do not match.';
                } else if (confirmPassword.value && password.value === confirmPassword.value) {
                    confirmPassword.setCustomValidity('');
                    confirmPasswordError.textContent = '';
                } else {
                    confirmPassword.setCustomValidity('');
                }
            }

            password.addEventListener('input', checkPasswordMatch);
            confirmPassword.addEventListener('input', checkPasswordMatch);

            // Form submission
            form.addEventListener('submit', function (event) {
                event.preventDefault();
                event.stopPropagation();

                // Check password match
                checkPasswordMatch();

                if (form.checkValidity()) {
                    // Show loading state
                    submitBtn.disabled = true;
                    spinner.classList.remove('d-none');
                    submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Creating Account...';

                    // Simulate API call
                    setTimeout(() => {
                        // Hide form and show success message
                        form.style.display = 'none';
                        successMessage.style.display = 'block';
                        
                        // Reset button state
                        submitBtn.disabled = false;
                        spinner.classList.add('d-none');
                        submitBtn.innerHTML = 'Create Account';
                        
                        // Log form data (in real app, this would be sent to server)
                        const formData = new FormData(form);
                        console.log('Form submitted with data:', Object.fromEntries(formData));
                    }, 2000);
                } else {
                    // Show validation feedback
                    form.classList.add('was-validated');
                }
            });

            // Real-time validation for all inputs
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.addEventListener('blur', function () {
                    if (this.checkValidity()) {
                        this.classList.add('is-valid');
                        this.classList.remove('is-invalid');
                    } else {
                        this.classList.add('is-invalid');
                        this.classList.remove('is-valid');
                    }
                });

                input.addEventListener('input', function () {
                    if (this.classList.contains('is-invalid') && this.checkValidity()) {
                        this.classList.remove('is-invalid');
                        this.classList.add('is-valid');
                    }
                });
            });
        });
