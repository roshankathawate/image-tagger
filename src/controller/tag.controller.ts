import { Request, Response } from "express";

import Image from "../model/image.model";
import { createTag, findAllTags, findTag, deleteTag} from "../service/tag.service";
import {get} from "lodash";

export async function createTagHandler(req: Request, res: Response){
    const tag  = req.body;
    const newTag = await createTag({...tag});
    return res.send(newTag);
}

export async function getAllTagsHandler(req: Request, res:Response){
    const tagData = await findAllTags(req.query);
    
    if (!tagData) {
        return res.sendStatus(404);
    }

    return res.send(tagData);

}

export async function getTagHandler(req: Request, res:Response){
    const tagId = get(req, "params.tagId");
    const tagData = await findTag({ tagId });

    if (!tagData) {
        return res.sendStatus(404);
    }

    return res.send(tagData);
}



export async function deleteTagHandler(req: Request, res:Response){
    const tagId = get(req, "params.tagId");
    const tag = await findTag({ tagId });

    if (!tag) {
        return res.sendStatus(404);
    }
    const images = tag.images;
    await deleteTag({tagId});
    await Image.updateMany({ '_id': images }, { $pull: { tags: tag._id } });
    return res.sendStatus(200);
    
}