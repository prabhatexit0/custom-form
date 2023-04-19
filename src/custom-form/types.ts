import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
} from "react-hook-form"

type RFHArrayWithId = FieldArrayWithId<
  {
    data: Schema[]
  },
  "data",
  "id"
>[]

type RFHUseFieldArrayAppend = UseFieldArrayAppend<
  {
    data: Schema[]
  },
  "data"
>

interface BaseSchema {
  name: string
  required: boolean
  type: "string" | "number" | "boolean" | "object"
}

interface ObjectSchema extends BaseSchema {
  type: "object"
  nestedFields: Schema[]
}

type Schema = BaseSchema | (ObjectSchema & { nestedFields?: Schema[] })

type FormProps = {
  data: Schema[]
}

type FieldProps = {
  schema: Schema
  prefix: string
  index: number
  remove: UseFieldArrayRemove
}

type NestedFieldsProps = {
  fields: RFHArrayWithId
  prefix: string
  remove: UseFieldArrayRemove
}

export type {
  BaseSchema,
  FieldProps,
  FormProps,
  NestedFieldsProps,
  ObjectSchema,
  RFHArrayWithId,
  RFHUseFieldArrayAppend,
  Schema,
}
