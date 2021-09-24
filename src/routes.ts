import { Express, Request, Response } from "express";

import { deleteImageHandler, createImageHandler, updateImageHandler, getImageHandler, getAllImagesHandler, getImageTagsHandler } from "./controller/image.controller";
import { deleteTagHandler, getAllTagsHandler, getTagHandler, createTagHandler } from "./controller/tag.controller";
import { validateRequest } from "./middleware";
import checkJwt from "./middleware/checkJwt";
import { createImageSchema, updateImageSchema, deleteImageSchema } from "./schema/image.schema";
import { createTagSchema, deleteTagSchema } from "./schema/tag.schema";

export default function (app: Express) {

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

    // delete image
    app.delete(
        "/api/v1/images/:imageId",
        [validateRequest(deleteImageSchema)],
        deleteImageHandler
    )

    // create tag
    app.post(
        "/api/v1/tags",
        [validateRequest(createTagSchema)],
        createTagHandler
    )

    // get all tags
    app.get(
        "/api/v1/tags",
        getAllTagsHandler
    )

    // get a tag by ID
    app.get(
        "/api/v1/tags/:tagId",
        getTagHandler
    )

    // delete a tag by ID
    app.delete(
        "/api/v1/tags/:tagId",
        [validateRequest(deleteTagSchema)],
        deleteTagHandler
    )

}