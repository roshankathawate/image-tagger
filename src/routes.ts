import { Express } from "express";

import { registerUserHandler, createUserSessionHandler, invalidateUserSessionHandler } from "./controller/user.controller";
import { deleteImageHandler, createImageHandler, updateImageHandler, getImageHandler, getAllImagesHandler, getImageTagsHandler } from "./controller/image.controller";
import { deleteTagHandler, getAllTagsHandler, getTagHandler, createTagHandler } from "./controller/tag.controller";
import { authenticateUser, validateRequest } from "./middleware";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";
import { createImageSchema, updateImageSchema, deleteImageSchema } from "./schema/image.schema";
import { createTagSchema, deleteTagSchema } from "./schema/tag.schema";

export default function (app: Express) {

    // Register user
    app.post("/api/v1/users", validateRequest(createUserSchema), registerUserHandler);

    // Login
    app.post(
        "/api/v1/sessions",
        validateRequest(createUserSessionSchema),
        createUserSessionHandler
    );

    // Logout
    app.delete("/api/v1/sessions", authenticateUser, invalidateUserSessionHandler);

    // save image data
    app.post(
        "/api/v1/images",
        [authenticateUser, validateRequest(createImageSchema)],
        createImageHandler
    )

    // get all images
    app.get(
        "/api/v1/images",
        getAllImagesHandler
    )

    // get image by id
    app.get(
        "/api/v1/images/:imageId",
        getImageHandler
    )

    // get all tags of an image
    app.get(
        "/api/v1/images/:imageId/tags",
        getImageTagsHandler
    )

    // update image
    app.put(
        "/api/v1/images/:imageId",
        [authenticateUser, validateRequest(updateImageSchema)],
        updateImageHandler
    )

    // delete image
    app.delete(
        "/api/v1/images/:imageId",
        [authenticateUser, validateRequest(deleteImageSchema)],
        deleteImageHandler
    )

    // create tag
    app.post(
        "/api/v1/tags",
        [authenticateUser, validateRequest(createTagSchema)],
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
        [authenticateUser, validateRequest(deleteTagSchema)],
        deleteTagHandler
    )

}