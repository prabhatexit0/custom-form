import { Schema } from "./types"
export const data: Schema[] = [
  {
    name: "firstName",
    type: "string",
    required: true,
  },
  {
    name: "vehice",
    type: "object",
    required: true,
    nestedFields: [
      {
        name: "registrationNumber",
        type: "number",
        required: true,
      },
      {
        name: "isStolen",
        type: "boolean",
        required: false,
      },
    ],
  },
  {
    name: "age",
    type: "number",
    required: true,
  },
]
