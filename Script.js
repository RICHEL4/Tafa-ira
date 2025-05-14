// Gérer la soumission du formulaire d'inscription
document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Réinitialiser les erreurs
    document.querySelectorAll('.error').forEach(error => error.style.display = 'none');
    
    // Récupérer les valeurs
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;
    
    let isValid = true;
    
    // Validation
    if (!username) {
        document.getElementById('usernameError').style.display = 'block';
        isValid = false;
    }
    
    if (!email || !email.includes('@')) {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    }
    
    if (password.length < 6) {
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }
    
    if (isValid) {
        // Sauvegarder les données dans localStorage
        const userData = {
            username: username,
            email: email,
            password: password
        };
        localStorage.setItem('user_' + username, JSON.stringify(userData));
        
        // Cacher le formulaire d'inscription et afficher la section post-inscription
        document.getElementById('signupSection').style.display = 'none';
        document.getElementById('postSignupSection').style.display = 'block';
        document.getElementById('welcomeMessage').textContent = `Misaotra anao noho ny fisoratanao, ${username}!`;
    }
});

// Gérer l'aperçu de la photo
document.getElementById('photo').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('photoPreview');
            preview.src = e.target.result;
            preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }
});

// Gérer la soumission du formulaire professionnel
document.getElementById('professionalForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Réinitialiser les erreurs
    document.querySelectorAll('.error').forEach(error => error.style.display = 'none');

    // Récupérer les valeurs
    const fullName = document.getElementById('fullName').value.trim();
    const cin = document.getElementById('cin').value.trim();
    const photo = document.getElementById('photo').files[0];

    let isValid = true;

    // Validation
    if (!fullName) {
        document.getElementById('fullNameError').style.display = 'block';
        isValid = false;
    }

    if (!cin || !/^\d{12}$/.test(cin)) {
        document.getElementById('cinError').style.display = 'block';
        isValid = false;
    }

    if (!photo) {
        document.getElementById('photoError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        // Sauvegarder les données dans localStorage
        const username = Object.keys(localStorage).filter(key => key.startsWith('user_'))
            .map(key => JSON.parse(localStorage.getItem(key)).username)[0];
        const professionalData = {
            fullName: fullName,
            cin: cin,
            photo: URL.createObjectURL(photo)
        };
        localStorage.setItem('professional_' + username, JSON.stringify(professionalData));

        // Cacher le formulaire professionnel et afficher la section de confirmation
        document.getElementById('professionalFormSection').style.display = 'none';
        const confirmationSection = document.getElementById('confirmationSection');
        confirmationSection.style.display = 'block';

        // Afficher les informations
        document.getElementById('confirmedPhoto').src = professionalData.photo;
        document.getElementById('confirmedFullName').textContent = fullName;
        document.getElementById('confirmedCIN').textContent = cin;

        alert('Vita ny fampidirana ny fampahalalana matihanina!');
    }
});
