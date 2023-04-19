import { Form, Button } from "antd"

import { PlusSquareFilled } from "@ant-design/icons"

import { FormProvider, useFieldArray, useForm } from "react-hook-form"
import CustomField from "./CustomField"
import type { BaseSchema, FormProps, Schema } from "./types"

export default function CustomForm({ data }: FormProps) {
  const methods = useForm({ defaultValues: { data } })
  const { getValues, control } = methods
  const { fields, append, remove } = useFieldArray({ control, name: "data" })

  const handleAppendField = () => {
    append({ name: "addField", type: "string", required: false })
  }

  const handleSave = () => {
    let valuesFromForm = getValues()

    // This function deletes the property `nestedFields` when
    // type of schema obejct isn't "object"
    type TempType = BaseSchema & { nestedFields?: TempType[] }
    const deleteNestedFields = (schema: TempType) => {
      if (schema.type != "object") {
        delete schema.nestedFields
      }
      if (schema.nestedFields) {
        for (const i in schema.nestedFields) {
          deleteNestedFields(schema.nestedFields[i])
        }
      }
    }

    valuesFromForm.data.forEach((d) => deleteNestedFields(d))
    console.log(valuesFromForm.data)
  }

  return (
    <FormProvider {...methods}>
      <div className="p-4 w-[50rem] border-2 m-5 rounded-lg flex flex-col gap-3">
        <div className="flex justify-between items-center mb-2">
          <p className="font-bold">Field, name and type</p>
          <PlusSquareFilled
            className="text-2xl text-gray-200 cursor-pointer hover:text-gray-700 font-bold"
            onClick={handleAppendField}
          />
        </div>
        <Form className="">
          {fields.map((field, idx) => (
            <div
              className="flex items-start gap-2 text-slate-400"
              key={field.id}
            >
              <p className="px-1">{idx + ". "}</p>
              <CustomField
                schema={field}
                prefix={`data.[${idx}]`}
                index={idx}
                remove={remove}
              />
            </div>
          ))}
        </Form>
        <Button onClick={handleSave} className="w-max self-end">
          Save
        </Button>
      </div>
    </FormProvider>
  )
}
