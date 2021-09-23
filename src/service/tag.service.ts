import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
} from "mongoose";

import Tag, { TagDocument } from "../model/tag.model";
import Image from "../model/image.model";

export async function createTag(input: DocumentDefinition<TagDocument>) {
  const newTag = await Tag.create(input);
  await Image.updateMany({ '_id': newTag.images }, { $push: { tags: newTag._id } });
  return newTag;
}

export function findTag(
  query: FilterQuery<TagDocument>,
  options: QueryOptions = { lean: true }
) {
  return Tag.findOne(query, {}, options);
}

export function findAndUpdate(
  query: FilterQuery<TagDocument>,
  update: UpdateQuery<TagDocument>,
  options: QueryOptions
) {
  return Tag.findOneAndUpdate(query, update, options);
}

export async function findAllTags(query: FilterQuery<TagDocument>) {
  const options = {
    sort: { date: 1 },
    lean: true
  };
  const response = await Tag.paginate(query, options);
  return {
    tags: response.docs, hasNextPage: response.hasNextPage, hasPrevPage: response.hasPrevPage, meta: response.meta,
    nextPage: response.nextPage, prevPage: response.prevPage, pageCounter: response.pagingCounter,
    totalTags: response.totalDocs, totalPages: response.totalPages, currentPage: response.page
  }
}

export async function deleteTag(query: FilterQuery<TagDocument>) {
  return await Tag.deleteOne(query);
}
