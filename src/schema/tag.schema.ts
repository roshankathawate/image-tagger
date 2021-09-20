import { object, string, number, array } from "yup";

const payload = {
  body: object({
    tag: string().required("tag is required"),
    body: string()
      .required("Body is required")
  }),
};

const params = {
  params: object({
    tagId: string().required("tagId is required"),
  }),
};

export const createTagSchema = object({
  ...payload,
});

export const updateTagSchema = object({
  ...params,
  ...payload,
});

export const deleteTagSchema = object({
  ...params,
});