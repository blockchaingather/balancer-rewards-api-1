/**
 * config application const
 */

const constants = {
    // not deleted
    NOT_DELETED: 0,
    // deleted
    DELETED: 1,
    // networks
    NETWORKS: [1, 137, 43113, 43114],
    // jwt secret expiresIn  default one hours
    JWT_TOKEN_EXPIRE: 60 * 60,

    /**
     * page config
     */
    // page size
    PAGE_SIZE: 20,
    // current page
    CURRENT_PAGE: 1
};

export default constants;
