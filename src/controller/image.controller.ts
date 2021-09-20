import { Request, Response } from "express";
import {get} from "lodash";
import logger from "../logger";
import Tag from "../model/tag.model";

import { addTagToImage, createImage, deleteImage, findImage } from "../service/image.service";

export async function createImageHandler(req: Request, res:Response){
    const image  = req.body;
    const newImage = await createImage({...image});
    return res.send(newImage);
}

export async function getImageHandler(req: Request, res:Response){
    const imageId = get(req, "params.imageId");
    const imageData = await findImage({ imageId });

    if (!imageData) {
        return res.sendStatus(404);
    }

    return res.send(imageData);
}

export async function addTagsToImageHandler(req: Request, res: Response){
    const imageId = get(req, "params.imageId");
    const tag = req.body;
    logger.info(tag);
    const updatedImage = await addTagToImage(imageId, tag);
    return res.send(updatedImage);
}

export async function getImageTagsHandler(req: Request, res:Response){
    const imageId = get(req, "params.imageId");
    const imageData = await findImage({ imageId });

    if (!imageData) {
        return res.sendStatus(404);
    }
    return res.send(imageData.tags);
}

export async function getAllImagesHandler(req: Request, res:Response){
     // const imageData = await findAllImage({ imageId });

    // if (!imageData) {
    //     return res.sendStatus(404);
    // }

    return res.send("getAllImagesHandler");

}

export async function updateImageHandler(req: Request, res:Response){}

export async function deleteImageHandler(req: Request, res:Response){
    const imageId = get(req, "params.imageId");
    const image = await findImage({ imageId });

    if (!image) {
        return res.sendStatus(404);
    }
    await deleteImage(image);
    return res.sendStatus(200);
    
}



