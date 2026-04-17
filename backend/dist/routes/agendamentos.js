"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_1 = __importDefault(require("../database"));
const router = (0, express_1.Router)();
router.get('/', async (req, res) => {
    try {
        const [rows] = await database_1.default.execute(`
      SELECT a.*, 
        u.nome as cliente_nome,
        p.nome as profissional_nome,
        s.nome as servico_nome,
        s.preco as servico_preco
      FROM agendamentos a
      JOIN usuarios u ON a.cliente_id = u.id
      JOIN profissionais p ON a.profissional_id = p.id
      JOIN servicos s ON a.servico_id = s.id
      ORDER BY a.data, a.horario
    `);
        return res.json(rows);
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.post('/', async (req, res) => {
    const { cliente_id, profissional_id, servico_id, data, horario } = req.body;
    try {
        const [result] = await database_1.default.execute('INSERT INTO agendamentos (cliente_id, profissional_id, servico_id, data, horario) VALUES (?, ?, ?, ?, ?)', [cliente_id, profissional_id, servico_id, data, horario]);
        return res.json({ message: 'Agendamento criado com sucesso!', id: result.insertId });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
router.patch('/:id/status', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        await database_1.default.execute('UPDATE agendamentos SET status = ? WHERE id = ?', [status, id]);
        return res.json({ message: 'Status atualizado!' });
    }
    catch (error) {
        return res.status(500).json({ message: 'Erro interno do servidor' });
    }
});
exports.default = router;
