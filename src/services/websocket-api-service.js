import config from '../config';

const WebSocketApiService = {
    handleOpen(routeParamsId) {
        const ws = new WebSocket(`${config.WEBSOCKET_BASE_URL}/bill/${routeParamsId}`);
        return ws;
    },
    handleJoin(ws, profile) {
        ws.send(profile);
    },
    handleExit(ws, userExit) {
        ws.send(userExit);
    },
    handleClose(ws) {
        ws.close(1000);
    },
    str2ab(str) {
        var buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
        var bufView = new Uint8Array(buf);
        for (var i=0, strLen=str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
    }
}

export default WebSocketApiService;