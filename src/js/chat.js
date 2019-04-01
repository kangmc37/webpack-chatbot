import {
    getData
} from '../api/api';

const input = document.getElementById('message'),
    sendBtn = document.getElementById('send-btn'),
    chatRecords = document.getElementsByClassName('records')[0],
    chatWindow = document.getElementsByClassName('chat-window')[0];

let scroll2Bottom = (el) => {
    el.scrollTop = el.scrollHeight;
}

let eventHandle = event => {
    let msg = input.value.trim();
    if (!msg) {
        input.placeholder = '内容不能为空哦!';
        input.value = '';
        return;
    }

    input.placeholder = '说点什么吧';
    // 将发送的消息显示在窗口上
    let sendRecord = document.createElement('li'),
        sendMsg = document.createElement('span');
    sendMsg.innerHTML = msg;
    sendRecord.className = 'me';
    sendRecord.appendChild(sendMsg);
    chatRecords.appendChild(sendRecord);
    scroll2Bottom(chatWindow); // 自动滚动到底部

    getData(msg).then(data => {
        let resRecord = document.createElement('li'),
            resMsg = document.createElement('span');
        resMsg.innerHTML = data.content.replace(/{br}/g, '\r\n');
        resRecord.className = 'bot';
        resRecord.appendChild(resMsg);
        chatRecords.appendChild(resRecord);
        scroll2Bottom(chatWindow);
    });
    input.value = '';
}

sendBtn.addEventListener('click', eventHandle);
// 回车键发送消息
input.addEventListener('keyup', event => {
    if (event.keyCode === 13) {
        eventHandle();
        return false;
    }
})