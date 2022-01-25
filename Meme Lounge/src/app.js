import { page, render } from './lib.js';  
import { homePage} from './views/home.js'; 
import { catalogPage } from './views/catalog.js'; 
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './api/api.js';
import { createPage } from './views/create.js';

/*за да може да дебъгваме*/
import * as api from './api/data.js'; 
import { getUserData } from './util.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/profile.js';

window.api = api;

//добавяме home, catalog, login, register страницата
//елемент в който да се изобразява елемента (в случая в main)
const root = document.querySelector('main');

//logoutBTN 
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/memes', catalogPage);
page('/login', loginPage); 
page('/register', registerPage); 
page('/create', createPage);
page('/details/:id', detailsPage); //защото ще се извежда по ID
//винаги при стартиране на приложението ми са активира updateUserNav
page('/edit/:id', editPage);
page('/profile', profilePage);
updateUserNav(); 


page.start();

function decorateContext(ctx, next){
    ctx.render = (content) => render(content, root); 
    
    //трябва да е налична и в контекста за да може модулите да я викат
    ctx.updateUserNav = updateUserNav;
    
    next(); 
}

function onLogout() {
    //важен е редът
    logout(); 
    //преди да пренасочим потребителя, ще се актуализира навигацията
    updateUserNav(); 
    page.redirect('/');
}

//ще вземе данните от UTIL и ще провери дали има UserData, 
//ако има, показва бутоните за User в навигацията и извежда username в NAV
//, в противен случай, други

function updateUserNav() {
    const userData = getUserData();

    if(userData) {
        document.querySelector('.user').style.display = 'block'; 
        document.querySelector('.guest').style.display = 'none';
        document.querySelector('.user span').textContent = `Welcome, ${userData.email}`;  
    } else {
        document.querySelector('.user').style.display = 'none'; 
        document.querySelector('.guest').style.display = 'block'; 
    }
}
