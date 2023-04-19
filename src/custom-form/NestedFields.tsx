import CustomField from "./CustomField"
import type { NestedFieldsProps } from "./types"

export default function NestedFields({
  fields,
  prefix,
  remove,
}: NestedFieldsProps) {
  return (
    <div className="flex">
      <div className="bg-slate-200 w-10" />
      <div className="w-full">
        {fields.map((field, idx) => (
          <CustomField
            schema={field}
            prefix={`${prefix}[${idx}]`}
            key={field.id}
            index={idx}
            remove={remove}
          />
        ))}
      </div>
    </div>
  )
}
