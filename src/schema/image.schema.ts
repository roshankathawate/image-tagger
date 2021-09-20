import { object, string, number, array } from "yup";

const payload = {
  body: object({
    url: string().required("Image url is required"),
    tags: array().of(string().min(1)).required("Tags are required"),
    description: string().min(10),
    height: number().positive().integer(),
    width: number().positive().integer(),
    type: string(),
  }),
};

const addTagsPayload = {
    body: object({
        tags: array().of(string()).required("Image tags are required"),
      }),
};

const params = {
  params: object({
    imageId: string().required("imageId is required"),
  }),
};

export const createImageSchema = object({
  ...payload,
});

export const updateImageSchema = object({
  ...params,
  ...payload,
});

export const deleteImageSchema = object({
  ...params,
});

export const addTagsToImageSchema = object({
    ...params,
    ...addTagsPayload,
  });