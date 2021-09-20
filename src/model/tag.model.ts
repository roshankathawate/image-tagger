import mongoose from "mongoose";

export interface TagDocument extends mongoose.Document {
    tag: string;
    images:[]
    createdAt: Date;
    updatedAt: Date;
}

const tagSchema = new mongoose.Schema(
    {
        tag:            { type: String, required: true},
        images:         [{ type: mongoose.Types.ObjectId, ref: 'Image' }],
    },
    { timestamps: true }
);

const Tag = mongoose.model<TagDocument>("Tag", tagSchema);

export default Tag;