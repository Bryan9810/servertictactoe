import { Server, Socket } from 'socket.io';
import { ConnectedSocket, MessageBody, OnMessage, SocketController, SocketIO } from "socket-controllers";

@SocketController()
export class RoomController {

    // acceder a las salas del juego
    @OnMessage("join_game")
    public async joinGame(
        @SocketIO() io: Server,
        @ConnectedSocket() socket: Socket,
        @MessageBody() message: any
    ) {

        console.log("Nuevo Usuario a Accedido a la Sala", message);

        const connectedSocket = io.sockets.adapter.rooms.get(message.roomId);
        const socketRooms = Array.from(socket.rooms.values()).filter((r) => r !== socket.id);

        // Establecer solo 2 jugadores a la sala
        if (socketRooms.length > 0 || connectedSocket && connectedSocket.size === 2) {
            socket.emit('room_join_error', {
                error: 'Sala llena por favor ingrese a otra sala para jugar!'
            })
        } else {

            await socket.join(message.roomId);
            socket.emit("room_join");
        }

    }

}
