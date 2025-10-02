import * as Yup from "yup";

const subjectSchema = Yup.object({
  name: Yup.string().required(),
  image: Yup.object().nullable(),
}).required();

export default subjectSchema;
