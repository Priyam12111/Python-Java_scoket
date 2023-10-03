import socket
import threading

HOST = '0.0.0.0'  # Listen on all available interfaces
PORT = 12345  # Replace with the port number you want to use

def handle_client(client_socket, addr):
    print(f"Connected by {addr}")
    while True:
        data = client_socket.recv(1024)
    
        if not data:
            break
        print(f"Received from {addr}: {data.decode()}")
        # Add your processing logic here
        client_socket.send(b"Server received your message")
       

    client_socket.close()

with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as server_socket:
    server_socket.bind((HOST, PORT))
    server_socket.listen()

    print(f"Server is listening on {HOST}:{PORT}")

    while True:
        conn, addr = server_socket.accept()
        client_thread = threading.Thread(target=handle_client, args=(conn, addr))
        client_thread.start()
