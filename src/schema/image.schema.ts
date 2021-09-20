import { object, string, number, array } from "yup";

const payload = {
  body: object({
    url: string().required("Image url is required"),
    tag: array().of(string()).required("Image tag is required"),
    description: string().min(10),
    height: number().positive().integer(),
    width: number().positive().integer(),
    type: string(),
    body: string()
      .required("Body is required")
  }),
};

const params = {
  params: object({
    imageId: string().required("imageId is required"),
  }),
};

export const createImageTagSchema = object({
  ...payload,
});

export const updateImageSchema = object({
  ...params,
  ...payload,
});

export const deleteImageSchema = object({
  ...params,
});