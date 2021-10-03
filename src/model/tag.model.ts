import mongoose, { PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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

tagSchema.plugin(mongoosePaginate);
type Tag<T extends mongoose.Document> = PaginateModel<T>;

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;