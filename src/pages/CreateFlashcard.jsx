import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import { addFlashcard } from "../redux/flashcardSlice";
import { FaTrash } from "react-icons/fa";

export default function CreateFlashcard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 py-16 px-6">

      <div className="max-w-3xl mx-auto">

        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Create Flashcard
          </h1>
          <p className="text-gray-600 text-lg">
            Build powerful flashcards and organize your learning effectively.
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-2xl p-10 border border-gray-100">

          <Formik
            initialValues={{
              title: "",
              description: "",
              image: "",
              terms: [{ term: "", definition: "", image: "" }]
            }}
            validate={(values) => {
              const errors = {};

              if (!values.title) {
                errors.title = "Title is required";
              }

              if (!values.description) {
                errors.description = "Description is required";
              }

              if (values.terms.length === 0) {
                errors.terms = "At least one term is required";
              }

              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              const newFlashcard = {
                id: Date.now(),
                ...values
              };

              dispatch(addFlashcard(newFlashcard));
              resetForm();
              navigate("/");
            }}
          >
            {({ values }) => (
              <Form className="space-y-8">

                {/* Flashcard Details Section */}
                <div className="space-y-6">

                  {/* Title */}
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      Title
                    </label>
                    <Field
                      type="text"
                      name="title"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <ErrorMessage
                      name="title"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      Description
                    </label>
                    <Field
                      type="text"
                      name="description"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                    <ErrorMessage
                      name="description"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>

                  {/* Flashcard Image */}
                  <div>
                    <label className="block font-semibold mb-2 text-gray-700">
                      Flashcard Image URL (optional)
                    </label>
                    <Field
                      type="text"
                      name="image"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                    />
                  </div>
                </div>

                {/* Divider */}
                <div className="border-t pt-8">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                    Terms
                  </h3>

                  <FieldArray name="terms">
                    {({ push, remove }) => (
                      <div className="space-y-6">

                        {values.terms.map((_, index) => (
                          <div
                            key={index}
                            className="relative bg-gray-50 p-6 rounded-xl border border-gray-200 shadow-sm"
                          >

                            {/* Trash Icon */}
                            {values.terms.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition"
                              >
                                <FaTrash size={16} />
                              </button>
                            )}

                            {/* Term */}
                            <div className="mb-4">
                              <label className="block font-medium mb-2 text-gray-700">
                                Term
                              </label>
                              <Field
                                name={`terms.${index}.term`}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                              />
                            </div>

                            {/* Definition */}
                            <div className="mb-4">
                              <label className="block font-medium mb-2 text-gray-700">
                                Definition
                              </label>
                              <Field
                                name={`terms.${index}.definition`}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                              />
                            </div>

                            {/* Term Image */}
                            <div>
                              <label className="block font-medium mb-2 text-gray-700">
                                Term Image URL (optional)
                              </label>
                              <Field
                                name={`terms.${index}.image`}
                                type="text"
                                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                              />
                            </div>

                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() =>
                            push({ term: "", definition: "", image: "" })
                          }
                          className="bg-gray-700 text-white px-5 py-2 rounded-lg hover:bg-gray-800 transition shadow-md"
                        >
                          + Add Another Term
                        </button>
                      </div>
                    )}
                  </FieldArray>
                </div>

                {/* Submit */}
                <div className="pt-6">
                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
                  >
                    Create Flashcard
                  </button>
                </div>

              </Form>
            )}
          </Formik>

        </div>
      </div>
    </div>
  );
}