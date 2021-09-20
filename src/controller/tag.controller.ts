import { Request, Response } from "express";

import { addImageToTag, createTag, findTag} from "../service/tag.service";
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

export async function addImageToTagHandler(req: Request, res: Response){
    const tagId = get(req, "params.tagId");
    const image = req.body;
    const updatedTage = await addImageToTag(tagId, {...image});
    return res.send(updatedTage);
}

export async function deleteTagsHandler(req: Request, res:Response){}

// export async function getTagHandler(req: Request, res:Response){}