import mongoose from "mongoose";

const LevelSchema = new mongoose.Schema({
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
    levelHeight: {
        type: Number,
        enum: [2, 3],
        required: true,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

LevelSchema.pre('save', async function (next) {
    const level = this;
    level.slug = level.name.toLowerCase().split(" ").join("-")
    next();
});

export default mongoose.models.Level || mongoose.model('Level', LevelSchema)