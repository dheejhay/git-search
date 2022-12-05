const apiUrl = 'https://api.github.com/users';

// "https://api.github.com/users/username/repos"

const main = document.querySelector("#container");
const search = document.querySelector("#search");
const form = document.querySelector("form");



// fetchData('dheejhay')

// function fetchData(username) {
//     axios.get(apiUrl + '/'+ username).then(response => {
//         console.log(response)
//     }).then(err =>{
//         if(err) throw err
//     })
// }

fetchRepos("isaackumi")

async function fetchRepos (username) {
    try{
        const response = await axios.get("https://api.github.com/users/" + username + "/repos")
        console.log(response.data)   
        displayRepos(response.data)
    } catch (error) {
        console.log(error)
        // if(error.response.status === 404){
            // createErrorCard('The Repo Doesnt Exist')
        // }
        
    }
}    

async function fetchData(user) {
    try {
        const response = await axios.get(apiUrl + "/" + user)
        createCard(response.data)
    } catch (error) {
        if(error.response.status === 404){
            createErrorCard('The Username Doesnt Exist')
        }
    }
  
}

function displayRepos(userRepo) {
    const reposElement = document.querySelector('.links');

    userRepo.forEach(repo => {
        const repoTag = document.createElement('a')
        repoTag.href = repo.url;
        repoTag.target = '_blank'
        repoTag.innerText = repo.name;
        reposElement.appendChild(repoTag);
    })

    }




const createErrorCard = (message) => {

    const errorCard = `
    <div class ="profile-card">
        ${message}
    </div>
    `
    main.innerHTML = errorCard;
}

const createCard = (user) => {

    const userCard = `
    <div id="card">
    <div class="profile">
        <img src=${user.avatar_url} />
    </div>
    <div class="card">
        <div class="details">
            <h1>${user.login}</h1>
            <p>${user.bio}</p>
        </div>
        <div class="follower">
            <p>${user.followers} followers</p>
            <p>${user.following} followiing</p>
            <p>${user.public_repos} repos</p>
        </div>
        <div class="links">
            <li><a href="#">BlockChain</a></li>
            <li><a href="#">Twitter</a></li>
            <li><a href="#">YouTube</a></li>
            <li><a href="#">faceBook</a></li>
            <li><a href="#">Instagram</a></li>
        </div>
    </div>
</div>
    `;
    main.innerHTML = userCard;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const user = search.value;

    if (user) {
        fetchData(user);
    }
});
