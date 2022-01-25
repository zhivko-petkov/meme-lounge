import { deleteById, getMemeById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

//слагаме секцията home от index.html
const detailsTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
            <h1>Meme Title: ${meme.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src="${meme.imageUrl}">
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                       ${meme.description}
                    </p> 
                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
                    
                    ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>`: null}
                    
                    
                </div>
            </div>
        </section>`;

export async function detailsPage(ctx) {
    const meme = await getMemeById(ctx.params.id); 
    //Как да проверим дали текущия потребител е автор на meme?
    //1. Get current user id
    const userData = getUserData();
    //2. Check author on meme is current user data ( meme._ownerId)
    const isOwner = userData && meme._ownerId == userData.id; 
   
    ctx.render(detailsTemplate(meme, isOwner, onDelete)); 

    async function onDelete(){
        const choice = confirm('Are you sure you want to delete this meme forever?');

        if(choice){
            await deleteById(ctx.params.id);
            ctx.page.redirect('/memes');
        }
    }
    
}