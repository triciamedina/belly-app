import config from '../config';

const WebSocketApiService = {
    handleOpen() {
        const ws = new WebSocket(`${config.WEBSOCKET_BASE_URL}`);
        return ws;
    },
    handleJoin(ws, profile) {
        ws.send(profile);
    },
    handleExit(ws, userExit) {
        ws.send(userExit);
    },
    handleClose(ws) {
        ws.close(1000, 'close me');
    },
    handleBillUpdate(ws, billUpdate) {
        ws.send(billUpdate);
    }
}

export default WebSocketApiService;