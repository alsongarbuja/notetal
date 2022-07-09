import mongoose from "mongoose";

const SubTopicSchema = new mongoose.Schema({
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
    topicId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Topic',
        required: true,
    },
    createdBy: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true,
    }
}, { timestamps: true })

SubTopicSchema.pre('save', async function (next) {
    const subtopic = this;
    subtopic.slug = subtopic.name.toLowerCase().split(" ").join("-")
    next();
});

export default mongoose.models.SubTopic || mongoose.model('SubTopic', SubTopicSchema)