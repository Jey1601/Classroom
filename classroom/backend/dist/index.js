"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = require("./utils/database");
const instructor_router_1 = __importDefault(require("./routers/instructor.router"));
const clase_router_1 = __importDefault(require("./routers/clase.router"));
const participante_router_1 = __importDefault(require("./routers/participante.router"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const db = new database_1.Database();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use('/instructores', instructor_router_1.default);
app.use('/clases', clase_router_1.default);
app.use('/participantes', participante_router_1.default);
app.get('/', (req, res) => {
    res.send('Backend de classroom');
    res.end();
});
app.listen('3000', () => {
    console.log('server is runnign at http://localhost:3000');
});
