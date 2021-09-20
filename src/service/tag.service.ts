import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";
  
  import Tag, { TagDocument } from "../model/tag.model";
  import Image, { ImageDocument } from "../model/image.model";
  
  export function createTag(input: DocumentDefinition<TagDocument>) {
    return Tag.create(input);
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
  
  export function deleteTag(query: FilterQuery<TagDocument>) {
    return Tag.deleteOne(query);
  }

  export function addImageToTag(tagId: string, image: ImageDocument){
    return Tag.findByIdAndUpdate(
        tagId, 
        {$push: {images: image._id}}
        )
  }