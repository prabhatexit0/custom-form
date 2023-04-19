import { Input, Select, Switch } from "antd"
import { PlusSquareFilled, DeleteFilled } from "@ant-design/icons"

import { Controller, useFieldArray, useFormContext } from "react-hook-form"
import NestedFields from "./NestedFields"

import type {
  FieldProps,
  RFHArrayWithId,
  RFHUseFieldArrayAppend,
} from "./types"

const options = [
  {
    label: "String",
    value: "string",
  },
  {
    label: "Number",
    value: "number",
  },
  {
    label: "Boolean",
    value: "boolean",
  },
  {
    label: "Object",
    value: "object",
  },
]

export default function CustomField({
  schema,
  prefix,
  index,
  remove,
}: FieldProps) {
  const { control, watch } = useFormContext()
  // I had to typecast it as it wasn't picking up types, I'll definitely look into
  // how useFieldArray infers types later
  const arrayMethods = useFieldArray({
    control,
    name: `${prefix}.nestedFields`,
  })
  const {
    fields,
    append: nestedFieldsAppend,
    remove: nestedFieldsRemove,
  } = arrayMethods
  const nestedFields: RFHArrayWithId = fields as any

  const handleNestedAppend = () => {
    const append = nestedFieldsAppend as RFHUseFieldArrayAppend
    append({ name: "addName", type: "string", required: false })
  }

  const showSchemaType = watch(`${prefix}.type`)

  return (
    <div className="w-full bg-slate-100">
      <div className="flex p-1 justify-between items-center border-b-2">
        <div className="flex gap-2 items-center">
          <Controller
            name={`${prefix}.name`}
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          <Controller
            name={`${prefix}.type`}
            control={control}
            render={({ field }) => (
              <Select {...field} defaultValue={schema.type}>
                {options.map((o, idx) => (
                  <Select.Option value={o.value} key={idx}>
                    {o.label}
                  </Select.Option>
                ))}
              </Select>
            )}
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <p>Required</p>
            <Controller
              name={`${prefix}.required`}
              control={control}
              render={({ field }) => (
                <Switch
                  onChange={field.onChange}
                  defaultChecked={field.value}
                  className="bg-zinc-200"
                />
              )}
            />
          </div>
          {showSchemaType == "object" && (
            <PlusSquareFilled
              className="text-2xl text-gray-200 cursor-pointer hover:text-gray-700 font-bold"
              onClick={handleNestedAppend}
            />
          )}
          <DeleteFilled
            className="text-2xl text-red-200 cursor-pointer hover:text-red-500"
            onClick={() => remove(index)}
          />
        </div>
      </div>
      {showSchemaType == "object" && (
        <NestedFields
          fields={nestedFields}
          prefix={`${prefix}.nestedFields`}
          remove={nestedFieldsRemove}
        />
      )}
    </div>
  )
}
