import { query, Request, Response } from "express";
import { get } from "lodash";

import Tag from "../model/tag.model";
import { difference } from "../util/util";

import { createImage, deleteImage, findAllImages, findImage, findAndUpdate } from "../service/image.service";
import moment from "moment";


export async function createImageHandler(req: Request, res: Response) {
    const image = req.body;
    const newImage = await createImage({ ...image });
    await Tag.updateMany({ '_id': newImage.tags }, { $push: { images: newImage._id } });
    return res.send(newImage);
}

export async function getImageHandler(req: Request, res: Response) {
    const imageId = get(req, "params.imageId");
    const imageData = await findImage({ imageId });

    if (!imageData) {
        return res.sendStatus(404);
    }

    return res.send(imageData);
}

export async function getImageTagsHandler(req: Request, res: Response) {
    const imageId = get(req, "params.imageId");
    const imageData = await findImage({ imageId });

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
    const oldTags = oldImage.tags;
    const updateImage = await findAndUpdate({ imageId }, update, { new: true });
    const newTags = updateImage.tags;
    // take difference of tags from old image and updated image,
    // it will provide tags that are added or removed from an image.
    const added = difference(newTags, oldTags);
    const removed = difference(oldTags, newTags);
    await Tag.updateMany({ '_id': added }, { $addToSet: { images: updateImage._id } });
    await Tag.updateMany({ '_id': removed }, { $pull: { images: updateImage._id } });

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
    await Tag.updateMany({ '_id': tags }, { $pull: { images: image._id } });
    return res.sendStatus(200);

}



