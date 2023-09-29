import { pool } from "./db.js";
import bcrypt from 'bcrypt';

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
        const { usuario, contraseña, confirmar_contraseña } = req.body;

        const [existingRows] = await pool.query('SELECT * FROM formulario WHERE usuario = ?', [usuario]);

        if (existingRows.length > 0) {
        return res.status(409).json({ error: 'El usuario ya está registrado.' });
        }

    
        const saltRounds = 10; 
        const hashedPassword = await bcrypt.hash(contraseña, saltRounds);
        const hashedConfirmPassword = await bcrypt.hash(confirmar_contraseña, saltRounds);

    
        const [rows] = await pool.query('INSERT INTO formulario (usuario, contraseña, confirmar_contraseña) VALUES (?, ?, ?)', [usuario, hashedPassword, hashedConfirmPassword]);

        res.send({
            id_ingreso: rows.insertId,
            usuario,
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



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