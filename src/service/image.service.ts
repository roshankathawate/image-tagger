import {
    DocumentDefinition,
    FilterQuery,
    UpdateQuery,
    QueryOptions,
  } from "mongoose";

  import moment from "moment";
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

  export async function findAllImages(query:FilterQuery<ImageDocument>){
       const options = {
      sort: { date: 1 },
      lean: true
      
    };
    if(query.createdAt){
      query.createdAt = new Date(query.createdAt);
    }
    const response =  await Image.paginate(query, options);
    return {images: response.docs, hasNextPage: response.hasNextPage, hasPrevPage:response.hasPrevPage, meta:response.meta, 
      nextPage: response.nextPage, prevPage: response.prevPage, pageCounter: response.pagingCounter,
      totalImages: response.totalDocs, totalPages: response.totalPages, currentPage: response.page}
  }

  export async function deleteImage(image: ImageDocument) {
    await image.remove();
    await Tag.updateMany({ '_id': image.tags }, { $pull: { images: image._id } });
  }