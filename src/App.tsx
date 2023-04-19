import { CustomForm, data } from "./custom-form"

function App() {
  // TODO: create a component using which we could
  // give prettified JSON as input data and also do type
  // validation using something like `zod`
  // using `src/custom-form/mockData.ts` for now.

  return (
    <div>
      <CustomForm data={data} />
    </div>
  )
}

export default App
