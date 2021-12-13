import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import Product, { ProductDocument } from "../models/product.models";

export const createProduct = async (
  input:
    | DocumentDefinition<Omit<ProductDocument, "createdAt" | "updatedAt">>
    | any
) => Product.create(input);

export const findProduct = async (
  query: FilterQuery<ProductDocument>,
  options: QueryOptions = { lean: true }
) => Product.findOne(query, {}, options);

export const getAllProduct = async (query: FilterQuery<ProductDocument>) =>
  Product.find(query).lean();

export const findAndUpdateProduct = async (
  query: FilterQuery<ProductDocument>,
  update: UpdateQuery<ProductDocument>,
  options: QueryOptions
) => Product.findOneAndUpdate(query, update, options);

export const deleteProduct = async (query: FilterQuery<ProductDocument>) =>
  Product.deleteOne(query);
