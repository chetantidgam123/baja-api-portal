import { useFormik } from 'formik';
import { createApiSchema } from '../../Schema';

function CreateApi() {

    const apiForm = useFormik({
        initialValues: {
            apiName: "",
            categoryId: "",
            subCategoryId: "",
            isActive: false,
            apiDescription: "",
            apiMethod: "",
            apiDomain: "",
            apiBasePath: "",
            apiVersion: "",
            apiEndpoint: "",
            apiHeaders: "",
            apiQueryParams: "",
            apiUriParams: "",
            apiRequestBodyExample: "",
            apiRequestSchema: "",
            apiRequestBodyType: "",
        },
        validationSchema: createApiSchema,
        onSubmit: (values) => {
            console.log("Form submitted:", values);
            addSubCategory();
        },

    })

    return (
        <div>
            CreateApi
        </div>
    )
}

export default CreateApi
