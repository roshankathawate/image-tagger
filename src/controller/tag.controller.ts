import { Request, Response } from "express";

import { createTag, findTag} from "../service/tag.service";
import {get} from "lodash";

export async function createTagHandler(req: Request, res: Response){
    const tag  = req.body;
    const newTag = await createTag({...tag});
    return res.send(newTag);
}


export async function getTagHandler(req: Request, res:Response){
    const tagId = get(req, "params.tagId");
    const tagData = await findTag({ tagId });

    if (!tagData) {
        return res.sendStatus(404);
    }

    return res.send(tagData);
}



export async function deleteTagsHandler(req: Request, res:Response){}

// export async function updateTagHandler(req: Request, res:Response){
//     const imageId = get(req, "params.imageId");
//     const { image } = req.body;
//     const newTags = image.tags || [];
//     const oldImage = await findImage({ imageId });
//     if(!oldImage){
//         return res.sendStatus(404);
//     }
//     const oldTags = oldImage.tags;

//     Object.assign(oldTags, image);
//     const newImage = await oldImage.save();

//     const added = difference(newTags, oldTags);
//     const removed = difference(oldTags, newTags);
//     await Tag.updateMany({ '_id': added }, { $addToSet: { products: oldImage._id } });
//     await Tag.updateMany({ '_id': removed }, { $pull: { products: oldImage._id } });

//     return res.send(newImage);

// }

// export async function getTagHandler(req: Request, res:Response){}