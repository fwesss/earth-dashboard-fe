// import React from 'react';
// import { useFormik } from 'formik';

// export default function QuizForm() {
//     const formik = useFormik({
//         initialValues: {
//             answer: '',
//         },
//         ValSchema = Yup.object().shape({
//             firstName: Yup.string()
//                 .required('Required'),
//         }),
//         onSubmit(values) {
//             console.log(values);
//         },
//     });
//     return (
//         <form onSubmit={formik.handleSubmit}>
//             {/* <label htmlFor="firstName">First Name</label> */}
//             <input
//                 id="answer"
//                 name="answer"
//                 type="text"
//                 onChange={formik.handleChange}
//                 value={formik.values.answer}
//             />
//             <button type="submit">Submit</button>
//         </form>
//     );
// };
