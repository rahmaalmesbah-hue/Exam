// LogiX User Module & LocalStorage Controller

// 1. Sign Up Function
function registerUser(name, email, phone, password) {
    let users = JSON.parse(localStorage.getItem('logix_users')) || [];

    // Check if user already exists
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        alert("This email is already registered! Please login.");
        window.location.href = "login.html";
        return;
    }

    // New user object
    const newUser = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        grades: [] 
    };
    
    // Save to users list
    users.push(newUser);
    localStorage.setItem('logix_users', JSON.stringify(users));

    // Set current logged in user
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    alert("Registration Successful!");
    window.location.href = "profile.html";
}

// 2. Login Function
function loginUser(email, password) {
    let users = JSON.parse(localStorage.getItem('logix_users')) || [];

    // Search for user
    const user = users.find(u => u.email === email && u.password === password);
    const errorDiv = document.getElementById('loginError');

    if (user) {
        // If user exists, hide error message (if displayed) and log in
        if (errorDiv) errorDiv.classList.add('d-none');
        
        localStorage.setItem('currentUser', JSON.stringify(user));
        window.location.href = "profile.html";
    } else {
        // If user does not exist, display error message on the page
        if (errorDiv) {
            errorDiv.innerText = "Invalid Email or Password. Please try again or Sign up.";
            errorDiv.classList.remove('d-none'); // Show the error div
        } else {
            // Fallback if the error div does not exist in HTML
            alert("Invalid Email or Password. Please try again or Sign up.");
        }
    }
}

// 3. Load Profile Data
function loadUserProfile() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // If no user is logged in, redirect to login page immediately
    if (!currentUser) {
        alert("Please login first to view your profile.");
        window.location.href = "login.html";
        return;
    }

    // If user exists, display their real data
    document.getElementById('userName').innerText = currentUser.name;
    document.getElementById('userPhone').innerText = currentUser.phone;
    document.getElementById('userEmail').innerText = currentUser.email;

    // Display user grades if available
    const gradesContainer = document.getElementById('gradesContainer');
    if (gradesContainer) {
        gradesContainer.innerHTML = ''; // Clear previous grade cards
        
        if (currentUser.grades && currentUser.grades.length > 0) {
            currentUser.grades.forEach(g => {
                const gradeCard = document.createElement('div');
                gradeCard.className = 'grade-card';
                gradeCard.innerText = `${g.examName} Grade: ${g.score}`;
                gradesContainer.appendChild(gradeCard);
            });
        } else {
            gradesContainer.innerHTML = '<p style="color:#2c255b; font-weight:bold;">No exams taken yet.</p>';
        }
    }
}

// 4. Logout Function
function logoutUser() {
    localStorage.removeItem('currentUser');
}