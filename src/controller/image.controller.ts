import { Request, Response } from "express";
import { get } from "lodash";

import { createImage, deleteImage, findAllImages, findImage, findAndUpdate } from "../service/image.service";
import moment from "moment";


export async function createImageHandler(req: Request, res: Response){
    const image = req.body;
    const newImage = await createImage({ ...image });
    return res.send(newImage);
}

export async function getImageHandler(req: Request, res: Response) {
    const imageId = get(req, "params.imageId");
    const imageData = await findImage({ id: imageId });
    
    if (!imageData) {
        return res.sendStatus(404);
    }

    return res.send(imageData);
}

export async function getImageTagsHandler(req: Request, res: Response) {
    const imageId = get(req, "params.imageId");
    const imageData = await findImage({ id: imageId });

    if (!imageData) {
        return res.sendStatus(404);
    }
    return res.send(imageData.tags);
}

export async function getAllImagesHandler(req: Request, res: Response) {
    let imageData;
    const startDate = get(req, "query.date");
    const endDate = moment(startDate, "YYYY-MM-DD").add(1, "d").toDate();
    // find images created or updated between startDate and endDate
    if (moment(startDate, "YYYY-MM-DD", true).isValid()) {
        imageData = await findAllImages({
            $or: [
                {
                    updatedAt: {
                        "$gte": startDate,
                        "$lt": endDate
                    },
                    createdAt: {
                        "$gte": startDate,
                        "$lt": endDate
                    }
                }
            ]

        });
    } else {
        imageData = await findAllImages(req.query);
    }

    if (!imageData) {
        return res.sendStatus(404);
    }

    return res.send(imageData);

}

export async function updateImageHandler(req: Request, res: Response) {
    const imageId = get(req, "params.imageId");
    const update = req.body;

    const oldImage = await findImage({ imageId });
    if (!oldImage) {
        return res.sendStatus(404);
    }
    const updateImage = await findAndUpdate({ imageId }, update, { new: true });
    
    return res.send(updateImage);

}

export async function deleteImageHandler(req: Request, res: Response) {
    const imageId = get(req, "params.imageId");
    const image = await findImage({ imageId });

    if (!image) {
        return res.sendStatus(404);
    }
    const tags = image.tags;
    await deleteImage({ imageId });
    return res.sendStatus(200);
}



