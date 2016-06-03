window.onload = function () {
    var socket = io.connect();
    socket.on('connect', function () {
        /*通过join事件发送消息*/
        /*如果用户单击提示框的取消按钮，则返回 null。如果用户单击确认按钮，则返回输入字段当前显示的文本。
        在用户点击确定按钮或取消按钮把对话框关闭之前，它将阻止用户对浏览器的所有输入。在调用 prompt() 时，
        将暂停对 JavaScript 代码的执行，在用户作出响应之前，不会执行下一条语句。
        */
        socket.emit('join', prompt('What\'s your name?'));
        /*显示聊天窗口*/
        document.getElementById('chat').style.display = 'block';
    });

    socket.on('announcement', function (msg) {
        var li = document.createElement('li');
        li.className = 'announcement';
        li.innerHTML = msg;
        document.getElementById('messages').appendChild(li);
    });

    /*确保服务器端参数传递正确*/
    socket.on('text', addMessage);

    document.getElementById('submit').onclick = function(){
        var input = document.getElementById('input');
        if(input.value == '' || input.value == undefined){
            return;
        }
        addMessage('me', input.value);
        socket.emit('text', input.value);
        input.value = '';
        input.focus();
    };

    function addMessage(from, text){
        var li = document.createElement('li');
        li.className = 'message';
        li.innerHTML = '<b>' + from + '</b>:' + text;
        document.getElementById('messages').appendChild(li);
    }
}