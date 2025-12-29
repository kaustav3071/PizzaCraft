import http from 'http';
import app from './App.js';

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

export default app;
