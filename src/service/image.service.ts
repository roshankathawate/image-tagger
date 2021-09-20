import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";
  import Image, { ImageDocument } from "../model/image.model";
  import Tag, {TagDocument} from "../model/tag.model";
  
  export async function createImage(input: DocumentDefinition<ImageDocument>) {
    const newImage = await Image.create(input);
    await Tag.updateMany({ '_id': newImage.tags }, { $push: { images: newImage._id } });
    return newImage;
  }

  export async function addTagToImage(imageId: string, tags: string[]){
    // const newImage = await Image.create(input);
    // await Tag.updateMany({'_id': newImage.tags}, {$push:{images: newImage._id}});
  }      
  
  export function findImage(
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
  
  export async function deleteImage(image: ImageDocument) {
    await image.remove();
    await Tag.updateMany({ '_id': image.tags }, { $pull: { images: image._id } });
  }