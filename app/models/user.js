/**
 * Created by s3lab. on 1/13/2017.
 */
// third party components
const Mongoose = require('mongoose');

// our components
const Constant = require('../configs/constant');
const PagedFind = require('./plugins/pagedFind');

let Schema = Mongoose.Schema;

// We have 2 default user in this system: sadmin:sadmin, anonymous:anonymous
let UserSchema = new Schema({
    loginName: {
        field: "loginName",
        type: String,
        minlength: 4,
        maxlength: 64,
        required: true,
        unique: true
    },
    displayName: {
        type: String,
        minlength: 4,
        maxlength: 64,
        default: 'NONE'
    },
    password: {
        field: "password",
        type: String,
        minlength: 4,
        maxlength: 64,
        required: true
    },
    email: {
        field: "email",
        type: String,
        unique: true,
        required: true
    },
    userRight: {
        field: "userRight",
        type: String,
        default: Constant.USER_RIGHT_ENUM[1],
        required: true,
        enum: Constant.USER_RIGHT_ENUM
    },
    eCoinX:{
        type: Number,
        default: 0,
        min: 0
    },
    eCoinF:{
        type: Number,
        default: 0,
        min: 0
    },
    status: {
        field: "status",
        type: String,
        required: true,
        default:Constant.STATUS_ENUM[3],
        enum: Constant.STATUS_ENUM
    },
    isEmailVerify: {
        field: "isEmailVerify",
        type: Boolean,
        required: true,
        default:false
    },
    isAlive: {
        field: "isAlive",
        type: Boolean,
        required: true,
        default:false
    },
    socialNetwork: {
        facebookId: String,
        facebookName: String,
        facebookAvatarUrl: String,
        facebookProfileUrl: String,

        googleId: String,
        googleName: String,
        googleAvatarUrl: String,
        googleEmail: String,

        twitterId: String,
        twitterName: String,
        twitterAvatarUrl: String,
        twitterProfileUrl: String
    },
    grade:{
        type: Number,
        default: 0,
        min: 0
    },
    avatarUrl:{
        type: String,
    },
    loginToken:{
        type: String,
        default:''
    },
    resetPasswordToken:{
        type: String,
        default:''
    },
    emailVerifyToken:{
        type: String,
        default:''
    },
    profile:{
        socialId: {
            type: String
        },
        givenName: {
            type: String,
            maxlength: 128
        },
        lastName: {
            type: String,
            maxlength: 64
        },
        nationality: {
            type: String,
            maxlength: 64
        },
        address: {
            type: String,
            maxlength: 128
        },
        birthday: Date,
        website: {
            type: String,
            maxlength: 128
        },
        language: {
            type: String,
            maxlength: 2
        }
    },
    associatedWith: [{
        user: {
            type: Schema.Types.ObjectId,
            ref:'User'
        },
        relation: {
            type: String,
            enum: Constant.RELATION_ENUM
        },
        relationStatus: {
            type: String,
            enum: Constant.RELATION_STATUS_ENUM,
            default: Constant.RELATION_STATUS_ENUM[3]
        }
    }],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    updatedBy: {
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

// let UserSchema = new Schema({
//     loginName: {
//         field: "loginName",
//         type: String,
//         minlength: 4,
//         maxlength: 64,
//         required: true,
//         unique: true
//     },
//     displayName: {
//         type: String,
//         minlength: 4,
//         maxlength: 64,
//         default: 'NONE'
//     },
//     password: {
//         field: "password",
//         type: String,
//         minlength: 4,
//         maxlength: 64,
//         required: true
//     },
//     email: {
//         field: "email",
//         type: String,
//         unique: true,
//         required: true
//     },
//     userRight: {
//         field: "userRight",
//         type: String,
//         default: Constant.USER_RIGHT_ENUM[1],
//         required: true,
//         enum: Constant.USER_RIGHT_ENUM
//     },
//     status: {
//         field: "status",
//         type: String,
//         required: true,
//         default:Constant.STATUS_ENUM[3],
//         enum: Constant.STATUS_ENUM
//     },
//     isEmailVerify: {
//         field: "isEmailVerify",
//         type: Boolean,
//         required: true,
//         default:false
//     },
//     isAlive: {
//         field: "isAlive",
//         type: Boolean,
//         required: true,
//         default:false
//     }
// });
UserSchema.index({username: 'text', displayName: 'text'});

UserSchema.virtual('id')
    .get(function(){ return this.get('_id');})
    .set(function(value){return this.set('_id',value);});

UserSchema.set('toJSON', {
    transform: function (doc, ret, options) {
        ret.id = ret._id;
        delete ret.__v;
    }
});

UserSchema.pre('save', function (next) {
    let currentDate = new Date();
    this.updatedAt = currentDate;

    if (!this.createdAt)
        this.createdAt = currentDate;

    next();
});

UserSchema.plugin(PagedFind);

module.exports = Mongoose.model('user', UserSchema);
