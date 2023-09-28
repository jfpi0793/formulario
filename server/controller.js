import { pool } from "./db.js";

export const get = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM formulario')
        res.json(rows)
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const get1 = async (req, res) => {
    try {
        const { id } = req.params
        const [rows] = await pool.query('SELECT * FROM formulario WHERE id_ingreso = ?', [id])
        if (rows.length <= 0) {
            return res.status(404).json({
                message: 'No encontrado'
            });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const create = async (req, res) => {
    try {
        const {usuario, contraseña, confirmar_contraseña} = req.body
        const [rows] = await pool.query('INSERT INTO formulario (usuario, contraseña, confirmar_contraseña) VALUES (?, ?, ?)', [usuario, contraseña, confirmar_contraseña])
        res.send({
            id_ingreso: rows.insertId,
            usuario,
            contraseña,
            confirmar_contraseña,
        })
    } catch (error) {
        res.status(500).json({ error: error.message }); 
    }
}

export const update = async (req, res) => {
    try {
        const { id } = req.params;
        const {usuario, contraseña, confirmar_contraseña} = req.body;
        const [result] = await pool.query('UPDATE formulario SET usuario = IFNULL(?, usuario), contraseña = IFNULL(?, contraseña), confirmar_contraseña = IFNULL(?, confirmar_contraseña) WHERE id_ingreso = ?', [usuario, contraseña, confirmar_contraseña, id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: 'No encontrado'
            });
        }
        const [rows] = await pool.query('SELECT * FROM formulario WHERE id_ingreso = ?', [id])
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const del = async (req, res) => {
    try {
        const [result] = await pool.query('DELETE FROM formulario WHERE id_ingreso = ?', [req.params.id]);
        if (result.affectedRows <= 0) {
            return res.status(404).json({
            message: 'No encontrado'
            });
        }
        res.sendStatus(204);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}