import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";

import Image, { ImageDocument } from "../model/image.model";
import Tag from "../model/tag.model";
import { difference } from "../util/util";

export async function createImage(input: DocumentDefinition<ImageDocument>) {
  const newImage = await Image.create(input);
  await Tag.updateMany({ '_id': newImage.tags }, { $push: { images: newImage._id } });
  return newImage;
}

export function findImage(
  query: FilterQuery<ImageDocument>,
  options: QueryOptions = { lean: false }
) {
  return Image.findById(query.id, {}, options);
}

export async function findAndUpdate(
  query: FilterQuery<ImageDocument>,
  update: UpdateQuery<ImageDocument>,
  options: QueryOptions
) {
  // find old tags associated with the image
  const image = await findImage(query);
  const oldTags = image.tags;

  const updatedImage = await Image.findOneAndUpdate(query.id, update, options);
  const newTags = updatedImage.tags;
  // take difference of tags from old image and updated image,
  // it will provide tags that are added or removed from an image.
  const added = difference(newTags, oldTags);
  const removed = difference(oldTags, newTags);
  await Tag.updateMany({ '_id': added }, { $addToSet: { images: updatedImage._id } });
  await Tag.updateMany({ '_id': removed }, { $pull: { images: updatedImage._id } });
  return updatedImage;
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
  const result = await Image.deleteOne(query);
  if (result.deletedCount > 0) {
    await Tag.updateMany({ '_id': query.tags }, { $pull: { images: query.id } });
  }
  return result;

}