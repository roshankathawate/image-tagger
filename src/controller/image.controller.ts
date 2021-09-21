import { Request, Response } from "express";
import {get} from "lodash";
import logger from "../logger";
import Tag from "../model/tag.model";

import { createImage, deleteImage, findAllImages, findImage, findAndUpdate } from "../service/image.service";


export async function createImageHandler(req: Request, res:Response){
    const image  = req.body;
    const newImage = await createImage({...image});
    await Tag.updateMany({ '_id': newImage.tags }, { $push: { images: newImage._id } });
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

export async function getImageTagsHandler(req: Request, res:Response){
    const imageId = get(req, "params.imageId");
    const imageData = await findImage({ imageId });

    if (!imageData) {
        return res.sendStatus(404);
    }
    return res.send(imageData.tags);
}

export async function getAllImagesHandler(req: Request, res:Response){
    const imageData = await findAllImages(req.query);
    
    if (!imageData) {
        return res.sendStatus(404);
    }

    return res.send(imageData);

}

export async function updateImageHandler(req: Request, res:Response){
    const imageId = get(req, "params.imageId");
    const update = req.body;
    
    const oldImage = await findImage({ imageId });
    if(!oldImage){
        return res.sendStatus(404);
    }
    const oldTags = oldImage.tags;
    const updateImage = await findAndUpdate({ imageId }, update, {new: true});
    const newTags = updateImage.tags;
    // take difference of tags from old image and updated image
    // It will provide tags that are added or removed from an image.
    const added = difference(newTags, oldTags);
    const removed = difference(oldTags, newTags);
    await Tag.updateMany({ '_id': added }, { $addToSet: { images: updateImage._id } });
    await Tag.updateMany({ '_id': removed }, { $pull: { images: updateImage._id } });

    return res.send(updateImage);

}

export async function deleteImageHandler(req: Request, res:Response){
    const imageId = get(req, "params.imageId");
    const image = await findImage({ imageId });

    if (!image) {
        return res.sendStatus(404);
    }
    await deleteImage(image);
    return res.sendStatus(200);
    
}

function difference(A:any, B:any) {
    const arrA = Array.isArray(A) ? A.map(x => x.toString()) : [A.toString()];
    const arrB = Array.isArray(B) ? B.map(x => x.toString()) : [B.toString()];
  
    const result = [];
    for (const p of arrA) {
      if (arrB.indexOf(p) === -1) {
        result.push(p);
      }
    }
  
    return result;
  }


