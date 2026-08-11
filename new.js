const APIURL = "https://api.github.com/users/";

const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-btn");
const mainCard = document.getElementById("main-card");

// Master Function (Async/Await)
async function getUser(username) {
    try {
        const response = await fetch(APIURL + username);
        
        if (!response.ok) {
            if (response.status === 404) {
                createErrorCard("Bhai, aisi koi profile exist hi nahi karti! ❌");
            } else {
                createErrorCard("Kuch toh server ka lafda hai!");
            }
            return; 
        }

        const data = await response.json();
        createProfileCard(data);
        
    } catch (error) {
        createErrorCard("Internet check kar le bhai! 🌐");
    }
}

// Function: Card Render karna (Ab clean classes ke sath)
function createProfileCard(user) {
    const bioText = user.bio ? user.bio : "Bande ne bio mein kuch nahi likha hai.";

    const cardHTML = `
        <div class="card">
            <div class="card-header">
                <img src="${user.avatar_url}" alt="${user.name}" class="avatar">
                
                <div class="user-info">
                    <h3>${user.name || user.login}</h3>
                    <p>@${user.login}</p>
                </div>
            </div>
            
            <p class="bio-text">${bioText}</p>
            
            <ul class="stats-list">
                <li>${user.followers} <span>Followers</span></li>
                <li>${user.following} <span>Following</span></li>
                <li>${user.public_repos} <span>Repos</span></li>
            </ul>
            
            <a href="${user.html_url}" target="_blank" class="profile-link">Profile Dekho</a>
        </div>
    `;
    
    mainCard.innerHTML = cardHTML;
}

// Function: Error Handle karna
function createErrorCard(msg) {
    const cardHTML = `
        <div class="error-card">
            <h3>${msg}</h3>
        </div>
    `;
    mainCard.innerHTML = cardHTML;
}

// Button Click Event
searchBtn.addEventListener("click", () => {
    const username = searchInput.value.trim();
    if (username) {
        getUser(username);
        searchInput.value = ""; 
    }
});

// Bonus: Enter dabane par bhi search ho jaye
searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
