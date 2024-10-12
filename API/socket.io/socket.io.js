// Một hàm để tạo một kết nối mới với máy chủ
function connectToServer() {
    var socket = io(); // Tạo một kết nối mới
    socket.on('connect', function() {
        console.log('Connected to server');
    });

    // Xử lý sự kiện từ máy chủ
    socket.on('message', function(data) {
        console.log('Received message from server:', data);
    });

    // Gửi dữ liệu lên máy chủ
    socket.emit('message', 'Hello from client');
}
