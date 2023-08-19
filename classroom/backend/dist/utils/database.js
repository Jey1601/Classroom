"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Database = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
//Conectarse a atlas
class Database {
    constructor() {
        this.MONGO_URL = 'mongodb+srv://Jey:1234@classroom.ifroyjc.mongodb.net/classroom?retryWrites=true&w=majority';
        mongoose_1.default.Promise = Promise;
        mongoose_1.default.connect(this.MONGO_URL);
        mongoose_1.default.connection.on('error', (error) => console.log(error));
        console.log("Conectado a mongo");
    }
}
exports.Database = Database;
