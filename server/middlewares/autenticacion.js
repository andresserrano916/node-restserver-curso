const jwt = require('jsonwebtoken');
// ============================
// Verificar Token
// ============================

let verificaToken = (req, res, next) => {
    let token = req.get('token');

    console.log(token);

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    });
};

// ============================
// Verificar AdminRole
// ============================
let verificaAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario && usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            err: {
                message: 'El usuario no es administrador'
            }
        });
    }
    next();
}


module.exports = {
    verificaToken,
    verificaAdmin_Role
}