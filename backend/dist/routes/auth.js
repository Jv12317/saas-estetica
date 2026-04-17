"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const router = (0, express_1.Router)();
router.post('/login', async (req, res) => {
    const { email, senha } = req.body;
    try {
        const [rows] = await database_1.default.execute('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (rows.length === 0) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }
        const usuario = rows[0];
        const senhaCorreta = await bcrypt_1.default.compare(senha, usuario.senha);
        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Email ou senha incorretos' });
        }
        const token = jsonwebtoken_1.default.sign({ id: usuario.id, email: usuario.email, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '8h' });
        return res.json({
            token,
            usuario: {
                id: usuario.id,
                nome: usuario.nome,
                email: usuario.email,
                tipo: usuario.tipo
            }
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.post('/registro', async (req, res) => {
    const { nome, email, senha } = req.body;
    try {
        const [existe] = await database_1.default.execute('SELECT id FROM usuarios WHERE email = ?', [email]);
        if (existe.length > 0) {
            return res.status(409).json({ message: 'Email já cadastrado' });
        }
        const hash = await bcrypt_1.default.hash(senha, 10);
        await database_1.default.execute('INSERT INTO usuarios (nome, email, senha, tipo) VALUES (?, ?, ?, ?)', [nome, email, hash, 'cliente']);
        return res.status(201).json({ message: 'Cadastro realizado com sucesso!' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
exports.default = router;
