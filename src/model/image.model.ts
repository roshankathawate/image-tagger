import mongoose from "mongoose";

export interface ImageDocument extends mongoose.Document {
    url: string;
    description: string,
    height: number,
    width: number,
    type: string,
    tags:[]
    createdAt: Date;
    updatedAt: Date;
}

const imageSchema = new mongoose.Schema(
    {
        url:            { type: String, required: true},
        description:    { type: String},
        height:         { type: Number},
        width:          { type: Number},
        type:           {type: String},
        tags:           [{ type: mongoose.Types.ObjectId, ref: 'Tag' }],
    },
    { timestamps: true }
);

const Image = mongoose.model<ImageDocument>("Image", imageSchema);

export default Image;