import { getMyMemes } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

//слагаме секцията catalog от index.html
//поставяема тернарен оператор за проверка дали има memeCard
const profileTemplate = (memes, user) => html`
<section id="user-profile-page" class="user-profile">
<article class="user-info">
    <img id="user-avatar-url" alt="user-profile" src="/images/${user.gender}.png">
    <div class="user-content">
        <p>Username: ${user.username}</p>
        <p>Email: ${user.email}</p>
        <p>My memes count: ${memes.length}</p>
    </div>
</article>
<h1 id="user-listings-title">User Memes</h1>
<div class="user-meme-listings">
    ${memes.length == 0 ? html`<p class="no-memes">No memes in database.</p>`
        : memes.map(memeCard)}

    <!-- Display : If user doesn't have own memes  --> 
</div>
</section>`;

/* 
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${memes.length == 0 ? html`<p class="no-memes">No memes in database.</p>`
        : memes.map(memeCard)}
    </div>
</section>
*/
//генериране на всяко отделно блокче от сървъра
const memeCard = (meme) => html`    
<div class="user-meme">
<p class="user-meme-title">${meme.title}</p>
<img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
<a class="button" href="/details/${meme._id}">Details</a>
</div>`; 

export async function profilePage(ctx) {
    //взимаме данните на потребителя
    const userData = getUserData();

    const memes = await getMyMemes(userData.id);
    ctx.render(profileTemplate(memes, userData)); 
}