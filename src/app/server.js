import express from "express";
import { PORT } from "../config/server.config.js";
import { engine } from "express-handlebars";
import { routerApi } from "../routers/api.router.js";
import { routerVistas } from "../routers/views.router.js";
import { conectar } from "../database/mongoose.js";
import { Server as SocketIOServer } from 'socket.io'
import { chatsManager } from "../dao/mongoose.chats.manager.js";

const app = express();

app.engine('handlebars', engine())
app.set('views', './views')
app.set('view engine', 'handlebars')

app.use(express.static('./public'))
app.use(express.json())

app.use('/api', routerApi)
app.use('/', routerVistas)

await conectar()

const httpServer = app.listen(PORT, () => { console.log(`Conectado al servidor mediante el puerto: ${PORT}`); });

const io = new SocketIOServer(httpServer)

io.on('connection', async clientSocket => {
    console.log(`nuevo cliente conectado! socket id #${clientSocket.id}`)

    clientSocket.on('nuevoMensaje', async mensaje => {
        await chatsManager.addChat({ ...mensaje, date: Date.now() })
        const mensajes = await chatsManager.getChats()
        io.sockets.emit('actualizarMensajes', mensajes)
    })

    clientSocket.on('nuevoIngreso', async () => {
        const mensajes = await chatsManager.getChats()
        io.sockets.emit('actualizarMensajes', mensajes)
    })
    // const mensajes = await chatsManager.getChats()

    // io.sockets.emit('actualizarMensajes', mensajes)
})

// const timestamp = m.date;
// const date = new Date(timestamp); // crear objeto Date a partir del timestamp
// const timezoneOffset = date.getTimezoneOffset() - 360; // diferencia horaria GMT-5 en minutos
// const localDate = new Date(date.getTime() + timezoneOffset * 60); // sumar la diferencia horaria en milisegundos
// const localTimeString = localDate.toLocaleTimeString(); // obtener la cadena de texto que representa la hora local en GMT-5
// console.log(`timestamp: ${timestamp}, date: ${date}, timezoneOffset: ${timezoneOffset}, localDate: ${localDate}, localTimeString: ${localTimeString}`);