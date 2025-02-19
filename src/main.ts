import './style.css'
import Handlebars from 'handlebars';
import * as Components from './components'
import * as Pages from './pages'

const pages = {
    login: [Pages.LoginPage],
    auth: [Pages.AuthPage],
    messenger: [Pages.MessengerPage],
    nav: [Pages.NavigatePage],
    profile: [Pages.ProfilePage],
    error: [Pages.ServerErrorPage],
    notFound: [Pages.NotFound]
}

Object.entries(Components).forEach(([name, template]) => {
    Handlebars.registerPartial(name, <Handlebars.Template>template);
});

function navigate(page: string) {
    console.log('page', page)
    // @ts-ignore
    const [source, context] = pages[page];
    const container = document.getElementById('app')!;

    const templatingFunction = Handlebars.compile(source);
    console.log('html', templatingFunction(context));
    container.innerHTML = templatingFunction(context);
}

document.addEventListener('DOMContentLoaded', () => navigate('nav'));

document.addEventListener('click', (e) => {
    const link = (e.target as HTMLElement).closest('a'); // Находим ближайшую ссылку
    if (link && link.getAttribute('href')) {
        e.preventDefault();
        e.stopImmediatePropagation();

        const page = link.getAttribute('href')?.substring(1); // Убираем слеш из href
        if (page) {
            navigate(page);
        }
    }
});

// document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
//   <div>
//     <a href="https://vite.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://www.typescriptlang.org/" target="_blank">
//       <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
//     </a>
//     <h1>Vite + TypeScript</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite and TypeScript logos to learn more
//     </p>
//   </div>
// `
//
// setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
