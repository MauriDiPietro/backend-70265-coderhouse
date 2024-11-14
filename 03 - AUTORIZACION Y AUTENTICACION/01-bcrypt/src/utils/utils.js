import { hashSync, genSaltSync, compareSync } from 'bcrypt';

/**
 * Metodo que realiza el hasheo de contraseña a traves de bcrypt
 * @param {String} password 
 * @returns password hasheada
 */
export const createHash = (password) => hashSync(password, genSaltSync(10))

/**
 * Compara la password en texto plano con la hasheada.
 * @param {String} password 
 * @param {*} user Usuario registrado
 * @returns {Boolean}
 */
export const isValidPassword = (password, user) => compareSync(password, user.password);
