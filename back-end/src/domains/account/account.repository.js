import prisma from "../../utils/prisma.js";

/**
 * Repository untuk mengelola data akun.
 */
export default class AccountRepository {

    /**
     * Menampilkan detail akun berdasarkan ID.
     * @param {number} id           - ID dari akun yang ingin ditampilkan.
     * @returns {Promise<Object>}   - Objek yang berisi detail akun.
     */
    static async show(id){
        return await prisma.user.findUnique({
            where: { id: Number(id) },  // Mencari akun berdasarkan ID
            select: {
                id: true,               // Memilih ID akun
                fullname: true,         // Memilih nama lengkap akun
                email: true,            // Memilih email akun
                password: true,         // Memilih password akun
                role: true,             // Memilih peran akun
                exp: true,              // Memilih pengalaman akun
                point: true,            // Memilih poin akun
                updatedAt: true         // Memilih tanggal pembaruan akun
            }
        });
    }

    /**
     * Memperbarui data akun berdasarkan ID.
     * @param {number} id           - ID dari akun yang ingin diperbarui.
     * @param {Object} data         - Data baru untuk memperbarui akun.
     * @returns {Promise<Object>}   - Objek yang berisi detail akun yang diperbarui.
     */
    static async update(id, data) {
        return await prisma.user.update({
            where: { id: Number(id) },  // Mencari akun berdasarkan ID
            data: data,                 // Memperbarui data akun
            select: {
                id: true,               // Memilih ID akun
                fullname: true,         // Memilih nama lengkap akun
                email: true,            // Memilih email akun
                password: true,         // Memilih password akun
                role: true,             // Memilih peran akun
                exp: true,              // Memilih pengalaman akun
                point: true,            // Memilih poin akun
                updatedAt: true         // Memilih tanggal pembaruan akun
            }
        });
    }

    static async delete(id) {
        return await prisma.user.delete({
            where: { id: Number(id) },  // Mencari akun berdasarkan ID
        });
    }

}