import {Express, Request, Response} from "express";

import { deleteImageHandler, createImageHandler, updateImageHandler, getImageHandler, getAllImagesHandler,getImageTagsHandler, addTagsToImageHandler } from "./controller/image.controller";
import { deleteTagsHandler, getTagHandler, createTagHandler, addImageToTagHandler } from "./controller/tag.controller";
import {validateRequest} from "./middleware";
import { addTagsToImageSchema, createImageSchema, updateImageSchema, deleteImageSchema } from "./schema/image.schema";
import {createTagSchema} from "./schema/tag.schema";
import { addImageToTag } from "./service/tag.service";

export default function (app: Express){

    // save image data
    app.post(
        "/api/v1/images",
        [validateRequest(createImageSchema)],
        createImageHandler
    )

    // get all images
    // TODO: implement pagination
    app.get(
        "/api/v1/images",
        getAllImagesHandler
    )

    // get image by id
    app.get(
        "/api/v1/images/:imageId",
        getImageHandler
    )

    // /images?date=startIndex=0&size=20

    // get all tags of an image
    app.get(
        "/api/v1/images/:imageId/tags",
        getImageTagsHandler
    )

    // update image
    app.put(
        "/api/v1/images/:imageId",
        [validateRequest(updateImageSchema)],
        updateImageHandler
    )
    
    // apply tags to an image
    app.patch(
        "/api/v1/images/:imageId/tags",
        [validateRequest(addTagsToImageSchema)],
        addTagsToImageHandler
    )

    // delete image
    app.delete(
        "/api/v1/images/:imageId",
        [validateRequest(deleteImageSchema)],
        deleteImageHandler
    )

    // delete all tags of an image
    app.delete(
        "/api/v1/images/:imageId/tags",
        [validateRequest(deleteImageSchema)],
        deleteTagsHandler
    )

    // /tags
    app.post(
        "/api/v1/tags",
        [validateRequest(createTagSchema)],
        createTagHandler
    )

    
    // GET: get image by id, by date, tag
    // bulk API. Implement pagination

    // Patch: edit image by id

    // Path: delete image by id

    // POST:tag image: takes image path and tag


    // Delete: delete tag by image id
}