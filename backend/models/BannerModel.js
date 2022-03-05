const {Schema, model} = require('mongoose');

const bannerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    buttonOneText: {
        type: String,
        trim: true,
        default: ""
    },
    buttonOneUrl: {
        type: String,
        trim: true,
        default: ""
    },
    buttonTwoText: {
        type: String,
        trim: true,
        default: ""
    },
    buttonTwoUrl: {
        type: String,
        trim: true,
        default: ""
    },
    banner: {
        type: String,
        required: true,
        trim: true
    },
    publish: {
        type: Boolean,
        default: true
    },
}, {
    timestamps: true
})


module.exports = model("Banner", bannerSchema, "banner");