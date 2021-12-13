import { object, number, string, TypeOf } from "zod";

const payload = {
  body: object({
    title: string({
      required_error: "title is required",
    }),
    price: number({
      required_error: "price is required",
    }),
    description: string({
      required_error: "description is required",
    }).min(120, "description should be at last 10 characters long"),
    image: string({
      required_error: "image is required",
    }),
  }),
};

const params = {
  params: object({
    productId: string({
      required_error: "product id is required",
    }),
  }),
};

export const createProductSchema = object({
  ...payload,
  ...params,
});

export const deleteProductSchema = object({
  ...params,
});

export const updateProductSchema = object({
  ...params,
});

export const getProductSchema = object({
  ...params,
});

export type createProductInput = TypeOf<typeof createProductSchema>;
export type deleteProductSchema = TypeOf<typeof deleteProductSchema>;
export type updateProductSchema = TypeOf<typeof updateProductSchema>;
export type getProductSchema = TypeOf<typeof getProductSchema>;
