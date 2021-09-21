import {Express, Request, Response} from "express";

import { deleteImageHandler, createImageHandler, updateImageHandler, getImageHandler, getAllImagesHandler,getImageTagsHandler } from "./controller/image.controller";
import { deleteTagsHandler, getTagHandler, createTagHandler } from "./controller/tag.controller";
import {validateRequest} from "./middleware";
import { addTagsToImageSchema, createImageSchema, updateImageSchema, deleteImageSchema } from "./schema/image.schema";
import {createTagSchema} from "./schema/tag.schema";

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
    // app.patch(
    //     "/api/v1/images/:imageId/tags",
    //     [validateRequest(addTagsToImageSchema)],
    //     addTagsToImageHandler
    // )

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
    
    // get a tag by ID
    app.get(
        "/api/v1/tags/:tagId",
        getTagHandler
    )

}