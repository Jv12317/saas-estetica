"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const database_1 = __importDefault(require("./database"));
async function hashSenhas() {
    const senhaPlana = '123';
    const hash = await bcrypt_1.default.hash(senhaPlana, 10);
    await database_1.default.execute('UPDATE usuarios SET senha = ? WHERE id = 1', [hash]);
    await database_1.default.execute('UPDATE usuarios SET senha = ? WHERE id = 2', [hash]);
    await database_1.default.execute('UPDATE usuarios SET senha = ? WHERE id = 3', [hash]);
    console.log('Senhas atualizadas com sucesso!');
    process.exit(0);
}
hashSenhas();
