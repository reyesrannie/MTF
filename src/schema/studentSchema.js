import * as Yup from "yup";

const studentSchema = Yup.object({
  accessCode: Yup.string().required("Code is required"),
}).required();

export default studentSchema;
