import { Request, Response } from "express";

import { createTag, findAllTags, findTag, deleteTag} from "../service/tag.service";
import {get} from "lodash";
import Tag from "../model/tag.model";

export async function createTagHandler(req: Request, res: Response){
    const tag  = req.body;
    const newTag = await createTag({...tag});
    return res.send(newTag);
}

export async function getAllTagsHandler(req: Request, res:Response){
    const tagData = await findAllTags(req.query);
    
    if (!tagData || tagData == null) {
        return res.sendStatus(404);
    }
    
    return res.send(tagData);

}

export async function getTagHandler(req: Request, res:Response){
    const tagId = get(req, "params.tagId");
    console.log(`Tagdata: 123`);
    const tagData =  await findTag({ id: tagId });
    
    console.log(`Tagdata: ${tagData}`);
    
    if (!tagData || tagData == null) {
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
    await deleteTag({id:tagId, images: images});
    return res.sendStatus(200);
    
}