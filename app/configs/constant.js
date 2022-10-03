/**
 * Created by bioz on 1/17/2017.
 */

module.exports = {
    STATUS_ENUM: ['ACTIVATED', 'DEACTIVATED', 'DELETED', 'WAITING_APPROVE'],
    RELATION_STATUS_ENUM: ['BLOCK', 'BROKEN', 'BAD', 'NORMAL', 'GOOD', 'SWEET', 'EXTREMELY', 'NONE'],
    RELATION_ENUM: ['SUBSCRIBER', 'OWNER', 'AGENT', 'ADVISER', 'SUPERVISOR', 'BROTHER', 'SISTER', 'FATHER', 'SON', 'DAUGHTER', 'MANAGER', 'HOST', 'RENTER', 'NONE'],
    USER_RIGHT_ENUM:['ANONYMOUS', 'END_USER', 'ADMIN', 'SUPER_ADMIN'],
    USER_RIGHT_MANAGER_ENUM: ['ADMIN','SUPER_ADMIN'],
    DEFAULT_PAGING_SIZE: 100
};