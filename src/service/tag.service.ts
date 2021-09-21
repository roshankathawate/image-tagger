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
  
  export async function deleteTag(tag: TagDocument) {
    await tag.remove();
    await Image.updateMany({ '_id': tag.images }, { $pull: { tags: tag._id } });
  }
  