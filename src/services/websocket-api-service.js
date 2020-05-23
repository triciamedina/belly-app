import config from '../config';
// let timerID = 0; 

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
        let buf = new ArrayBuffer(str.length*2); // 2 bytes for each char
        let bufView = new Uint8Array(buf);
        for (let i = 0, strLen = str.length; i < strLen; i++) {
          bufView[i] = str.charCodeAt(i);
        }
        return buf;
    },
}

export default WebSocketApiService;