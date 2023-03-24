import { io } from 'socket.io-client';
import { parse } from 'cookie';

export const socket = io('ws://localhost:7777', { withCredentials: true });

// socket.io.on('open', () => {
//   console.log('IM')
//   socket.io.engine.transport.on('pollComplete', () => {
//     const request = socket.io.engine.transport?.pollXhr.xhr;
//     const cookieHeader = request.getResponseHeader('set-cookie');
//     if (!cookieHeader) {
//       return;
//     }
//     cookieHeader.forEach((cookieString) => {
//       if (cookieString.includes(`${COOKIE_NAME}=`)) {
//         const cookie = parse(cookieString);
//         socket.io.opts.extraHeaders = {
//           cookie: `${COOKIE_NAME}=${cookie[COOKIE_NAME]}`,
//         };
//       }
//     });
//   });
// });
