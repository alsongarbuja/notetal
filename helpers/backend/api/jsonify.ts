
/**
 * 
 * @param {object} payload 
 * @returns {object}
 */
export const jsonify = (payload: object, status: boolean=true): object => {
    return {
        success: status,
        data: payload,
    }
}