import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";

import Image, { ImageDocument } from "../model/image.model";
import Tag from "../model/tag.model";

export async function createImage(input: DocumentDefinition<ImageDocument>) {
  const newImage = await Image.create(input);
  await Tag.updateMany({ '_id': newImage.tags }, { $push: { images: newImage._id } });
  return newImage;
}

export async function findImage(
  query: FilterQuery<ImageDocument>,
  options: QueryOptions = { lean: true }
) {
  return Image.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<ImageDocument>,
  update: UpdateQuery<ImageDocument>,
  options: QueryOptions
) {
  return Image.findOneAndUpdate(query, update, options);
}

export async function findAllImages(query: FilterQuery<ImageDocument>) {
  const options = {
    sort: { date: 1 },
    lean: true

  };

  const response = await Image.paginate(query, options);
  return {
    images: response.docs, hasNextPage: response.hasNextPage, hasPrevPage: response.hasPrevPage, meta: response.meta,
    nextPage: response.nextPage, prevPage: response.prevPage, pageCounter: response.pagingCounter,
    totalImages: response.totalDocs, totalPages: response.totalPages, currentPage: response.page
  }
}

export async function deleteImage(query: FilterQuery<ImageDocument>) {
  return await Image.deleteOne(query);
}