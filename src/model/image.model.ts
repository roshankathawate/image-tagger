import mongoose, { Model, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface ImageDocument extends mongoose.Document{
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

imageSchema.plugin(mongoosePaginate);
interface Image<T extends mongoose.Document> extends PaginateModel<T> {};

const Image = mongoose.model("Image", imageSchema);
export default Image;
