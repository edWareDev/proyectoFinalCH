const serverSocket = io()
const formLogin = document.querySelector('#formLogin')

formLogin.addEventListener('submit', (e) => {
    e.preventDefault()
    document.querySelector('.loginContainer').classList.add('invisible');
    serverSocket.emit('nuevoIngreso')
})

const plantillaMensajes = `
<div class="chat">
    <div class="chat-body">
        {{#if hayChats}}
            {{#each chats}}
            <div class="message">
                <div class="message-text">
                    <a class="messageEmail" href="#">{{this.user}}:</a>
                    <p>{{this.message}}</p>
                </div>
                <div class="message-time">
                <p class="messageDate">{{this.date}}</p>
                </div>
            </div>
            {{/each}}
        {{/if}}
    </div>
        <div class="chat-footer">
            <input type="text" autocomplete="nope" id="inputMensaje" placeholder="Escribe un mensaje...">
            <button id="btnEnviar">Enviar</button>
        </div>
</div>
<div class="activeUsersContainer">
    <h2>Participantes</h2>
    <ul>
        {{#if hayParticipantes}}
            {{#each participantes}}
            <li><a class="activeUserMail" href="#">{{this}}</a></li>
            {{/each}}
        {{/if}}
    </ul>
</div>
`
const armarHtmlMensajes = Handlebars.compile(plantillaMensajes)

serverSocket.on('actualizarMensajes', chats => {
    const participantes = Object.keys(chats.reduce((acc, item) => {
        acc[item.user] = true;
        return acc;
    }, {}));

    const divMensajes = document.querySelector('.chatContainer')
    if (divMensajes) {
        // divMensajes.innerHTML = JSON.stringify(mensajes)
        divMensajes.innerHTML = armarHtmlMensajes({ chats, hayChats: chats.length > 0, participantes, hayParticipantes: participantes.length > 0 })
        // mostrarFechas
        const messagesTime = document.querySelectorAll('.messageDate')
        messagesTime.forEach((message) => {
            message.innerHTML = timestampToLocalString(message.innerText)
        })

        // Detectar mensajes Propios
        const messageText = document.querySelectorAll('.message-text')
        messageText.forEach((text) => {
            if (text.innerText.search(document.querySelector('#userEmail').value) >= 0) {
                // text.innerText
                text.parentElement.classList.add('sent')
                text.childNodes[1].innerText = ''
            }
        })

        const scroll = document.querySelector('.chat-body')
        scroll.scrollTop = scroll.scrollHeight;
    }


    const inputAutor = document.querySelector('#userEmail')
    const btnEnviar = document.querySelector('#btnEnviar')

    if (btnEnviar) {
        btnEnviar.addEventListener('click', evento => {
            const inputMensaje = document.querySelector('#inputMensaje')
            const user = inputAutor.value
            const mensaje = inputMensaje.value
            if (!user || !mensaje) return
            serverSocket.emit('nuevoMensaje', { user, message: mensaje })
        })
    }

    const inputElement = document.querySelector('#inputMensaje');
    inputElement.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            btnEnviar.click();
        }
    });
})

function timestampToLocalString(timestamp) {
    const options = {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        hour12: true,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };
    return new Date(Number(timestamp)).toLocaleString('en-US', options);
}