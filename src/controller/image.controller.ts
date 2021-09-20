import { Request, Response } from "express";
import {get} from "lodash";

export async function creareImageTagHandler(req: Request, res:Response){
    const {image } = req.body;
    const newImage = await createImage({...image});

    return res.send(newImage);
}

export async function createTagHandler(req: Request, res: Response){
    const { tag } = req.body;
    const newTag = await createTag({...tag});

    return res.send(newTag);

}

export async function getImageHandler(req: Request, res:Response){
    // const imageId = get(req, "params.imageId");
    // const imageData = await findImage({ imageId });

    // if (!imageData) {
    //     return res.sendStatus(404);
    // }

    return res.send("getImageHandler");
}

export async function getAllImagesHandler(req: Request, res:Response){
     // const imageData = await findAllImage({ imageId });

    // if (!imageData) {
    //     return res.sendStatus(404);
    // }

    return res.send("getAllImagesHandler");

}

export async function updateImageHandler(req: Request, res:Response){}

export async function deleteImageHandler(req: Request, res:Response){}

export async function deleteTagsHandler(req: Request, res:Response){}

export async function getTagHandler(req: Request, res:Response){}

