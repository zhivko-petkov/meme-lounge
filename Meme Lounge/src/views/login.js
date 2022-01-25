import { html } from "../lib.js";
import { login } from "../api/data.js";
import { notify } from "../notify.js";

//слагаме секцията home от index.html
//за да работи формата закачаме submit event
const loginTemplate = (onSubmit) => html`
<section id="login">
<form @submit=${onSubmit} id="login-form">
    <div class="container">
        <h1>Login</h1>
        <label for="email">Email</label>
        <input id="email" placeholder="Enter Email" name="email" type="text">
        <label for="password">Password</label>
        <input id="password" type="password" placeholder="Enter Password" name="password">
        <input type="submit" class="registerbtn button" value="Login">
        <div class="container signin">
            <p>Dont have an account?<a href="/register">Sign up</a>.</p>
        </div>
    </div>
</form>
</section>`;


export function loginPage(ctx) {
    ctx.render(loginTemplate(onSubmit));
    
    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target); 

        const email = formData.get('email').trim(); 
        const password = formData.get('password').trim(); 

        if(email == '' || password == ''){
            return notify('All fields are required!');
        }

        await login(email, password); 
        //преди да пренасочим потребителя, ще се актуализира навигацията
        ctx.updateUserNav(); 
        //зареждане на определна страница след логването
        ctx.page.redirect('/memes'); 
    }
}