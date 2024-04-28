import { MongooseQueryParser } from "mongoose-query-parser"
import Category from "../models/categoryModel"
import connectToMongodb from "../mongodb"
import { TCategorySchema } from "@/ZSchemas"
import CategoryOption from "../models/categoryOptionModel"

export const getAllCategory = async (req: any) => {
  connectToMongodb()
  try {
    // let categories: TCategorySchema[] = []
    // const url = new URL(req.url).search.split('?')[1]
    // if (url) {
    const parser = new MongooseQueryParser()
    const parsed = parser.parse(req)
    const c = await CategoryOption.findOne({})
    const d = await Category.findOne({})
    console.log('parsed', req);
    const categories = await Category
      .find(parsed.filter)
      .sort(parsed.sort)
      .limit(parsed.limit || 10)
      .populate(parsed.populate)
      .select(parsed.select)
      .exec()
    // } else {
    //   categories = await Category.find()
    // }
    const updateCId = categories.map(category => ({

      // ...category._doc, _id: category._doc._id.toString(), parent: category._doc.parent?.toString(), propertys: category._doc.propertys?.toString()
      // ...category._doc, _id: category._doc._id.toString()

    }))
    // console.log(updateCId);
    return categories
    // return updateCId
  } catch (err) {
    return err
  }
}

export const getCategory = async (_id: string) => {

  try {
    connectToMongodb()
    const category = await Category.findById({ _id })
    const updateCId = {
      ...category._doc, _id: category._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  }
}


export const getCategoryBySlug = async (slug: string) => {

  try {
    connectToMongodb()
    const category = await Category.findOne({ slug })
    const updateCId = {
      ...category._doc, _id: category._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  }
}

export const createCategory = async (params: TCategorySchema) => {
  try {
    connectToMongodb()
    const category = await Category.create({ ...params })
    const updateCId = {
      ...category._doc, _id: category._doc._id.toString()
    }
    return updateCId
  } catch (err) {
    return err
  }
}

export const updateCategory = async (_id: string, params: any) => {
  try {
    connectToMongodb()
    const { data } = params
    const category = await Category.updateOne({ _id }, { ...data })
    return category
  } catch (err) {
    return err
  }
}

export const deleteCategory = async (_id: string) => {

  try {
    connectToMongodb()

    await Category.deleteOne({ _id })

    return true

  } catch (err) {
    return err
  }
}
