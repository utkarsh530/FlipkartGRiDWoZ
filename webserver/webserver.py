from http.server import HTTPServer, BaseHTTPRequestHandler



class requestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('content-type','text/html')
        self.end_headers()
        self.wfile.write("Hello from python server".encode())


def main():
    PORT = 8000
    server_address = ('localhost', PORT)
    server = HTTPServer(server_address, requestHandler)
    print('Server running on port %s' % PORT)
    server.serve_forever()




if __name__ == '__main__':
    main()