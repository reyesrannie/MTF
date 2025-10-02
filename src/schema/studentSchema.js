import * as Yup from "yup";

const studentSchema = Yup.object({
  lesson_password: Yup.string().required("Code is required"),
}).required();

export default studentSchema;
