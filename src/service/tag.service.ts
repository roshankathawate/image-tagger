import {
  DocumentDefinition,
  FilterQuery,
  UpdateQuery,
  QueryOptions,
  Mongoose,
} from "mongoose";

import Tag, { TagDocument } from "../model/tag.model";
import Image from "../model/image.model";

export async function createTag(input: DocumentDefinition<TagDocument>) {
  const newTag = await Tag.create(input);
  return newTag;
}

export  async function findTag(
  query: FilterQuery<TagDocument>,
  options: QueryOptions = { lean: false }
) {
  return await Tag.findById(query.id);
  
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
  const result = await Tag.deleteOne(query.id);
  if(result.deletedCount > 0){
    await Image.updateMany({ '_id': query.images }, { $pull: { tags: query.id } });
  }
  return result;
}
