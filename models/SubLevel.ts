import mongoose from "mongoose";

const SubLevelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    slug: {
        type: String,
        unique: true,
    },
    description: {
        type: String,
        trim: true,
    },
    levelId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Level',
        required: true,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

SubLevelSchema.pre('save', async function (next) {
    const level = this;
    level.slug = level.name.toLowerCase().split(" ").join("-")
    next();
});

export default mongoose.models.SubLevel || mongoose.model('SubLevel', SubLevelSchema)