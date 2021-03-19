const URL_API = 'https://picsum.photos/v2/list?page=1&limit=30';
const botao_carregar = document.querySelector('.js-carregar');
botao_carregar.addEventListener('click', criaCard);

class Button {
    constructor(classe, textContent, funcao) {
        this.tag = "button";
        this.classe = classe;
        this.textContent = textContent;
        this.funcao = funcao;
    }

    toString() {
        return `<${this.tag} class="${this.classe}" onclick="${this.funcao}">${this.textContent}</${this.tag}>`;
    }
}

class Imagem {
    constructor(classe, src) {
        this.tag = "img";
        this.classe = classe;
        this.src = src;
        this.favorita = false;
    }

    toString() {
        return `<${this.tag} class="${this.classe}" src="${this.src}">`;
    }

    statusfavorita() {
        if (this.favorita === true) {
            return `${this.classe} js-favorita`;
        }
    }
}

class TextArea {
    constructor(classe, placeholder) {
        this.tag = "textarea";
        this.classe = classe;
        this.placeholder = placeholder;
    }

    toString() {
        return `<${this.tag} class="${this.classe}" placeholder="${this.placeholder}"></${this.tag}>`;
    }

}

class Paragrafo {
    constructor(classe, textContent) {
        this.tag = "p";
        this.classe = classe;
        this.textContent = textContent;
    }

    toString() {
        return `<${this.tag} class="${this.classe}">${this.textContent}</${this.tag}>`;
    }
}

const addFavoritar = (element) => {
    const img = element.parentNode.querySelector('img');
    if (!img.classList.contains('js-favorita')) {
        img.classList.add('js-favorita');
        element.textContent = "Desfavoritar";
    } else {
        img.classList.remove('js-favorita');
        element.textContent = "Favoritar";
    }
}

const addRemover = (element) => {
    const card = element.parentNode;
    card.remove();
}

const addEditar = (element) => {
    const p = element.parentNode.querySelector('p');
    const textarea = element.parentNode.querySelector('textarea');
    if (textarea.classList.contains('js-escondido')) {
        textarea.classList.remove('js-escondido');
        p.classList.add('js-escondido');
    } else {
        p.innerHTML = textarea.value;
        textarea.classList.add('js-escondido');
        p.classList.remove('js-escondido');
    }
}

const buttonFavoritar = new Button('card-button js-button-favoritar', 'Favoritar', "addFavoritar(this)");
const buttonEditar = new Button('card-button js-button-anotar', 'Anotar', "addEditar(this)");
const buttonRemover = new Button('card-button js-button-remover', 'Remover', "addRemover(this)");
const textarea = new TextArea('card-comment js-textarea-comment js-escondido', 'Adicione um comentário...');
const paragrafo = new Paragrafo('js-paragrafo js-escondido', "");

async function recuperarDadosApi() {
    try {
        const promise = await fetch(URL_API);
        const jsonPromise = await promise.json();
        return jsonPromise;
    } catch (error) {
        alert("Não foi possível carregar as imagens");
    }
}

async function criaCard() {
    const resultado = await recuperarDadosApi();
    const container = document.querySelector('.js-container');
    resultado.forEach(imagem => {
        const card = document.createElement('div');
        card.setAttribute('class', 'card-foto js-card');
        const img = new Imagem("card-img js-card-img", imagem.download_url);
        card.innerHTML = `  ${img.toString()}
                            ${buttonFavoritar.toString()}
                            ${buttonEditar.toString()}
                            ${buttonRemover.toString()}
                            ${textarea.toString()}
                            ${paragrafo.toString()}`
        container.append(card);
    });
    botao_carregar.setAttribute('disabled', 'true');
    return true;
}