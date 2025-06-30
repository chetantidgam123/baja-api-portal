import * as yup from 'yup'

export const signupFormSchema = yup.object().shape({
    fullName: yup.string().required('mandatory field*'),
    emailId: yup.string().email('Invalid email format').required('mandatory field*'),
    mobileNo: yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('mandatory field*'),
    userPassword: yup.string().min(6, 'Password must be at least 6 characters long').required('mandatory field*'),
    // confirmPassword: yup.string()
    //     .oneOf([yup.ref('userPassword'), null], 'Passwords must match')
    //     .required('mandatory field*'),
    terms: yup.boolean().oneOf([true], 'You must agree to the terms and conditions')
});
export const loginFormSchema = yup.object().shape({
    emailId: yup.string().email('Invalid email format').required('mandatory field*'),
    userPassword: yup.string().min(6, 'Password must be at least 6 characters long').required('mandatory field*'),
});
export const resetPassSchema = yup.object().shape({
    password: yup.string().min(6, 'Password must be at least 6 characters long').required('mandatory field*'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('mandatory field*'),
});
export const forgotPassSchema = yup.object().shape({
    emailId: yup.string().email('Invalid email format').required('mandatory field*'),
});
export const createUserSchema = yup.object().shape({
    fullName: yup.string().required('mandatory field*'),
    emailId: yup.string().email('Invalid email format').required('mandatory field*'),
    mobileNo: yup.string().matches(/^\d{10}$/, 'Phone number must be exactly 10 digits').required('mandatory field*'),
    userPassword: yup.string().min(6, 'Password must be at least 6 characters long').required('mandatory field*'),
    confirmPassword: yup.string()
        .oneOf([yup.ref('userPassword'), null], 'Passwords must match')
        .required('mandatory field*d')
});
export const createApiSchema = yup.object().shape({
    apiName: yup.string().required('mandatory field*'),
    categoryId: yup.string().required('mandatory field*'),
    subCategoryId: yup.string(),
    isActive: yup.boolean(),
    apiDescription: yup.string(),
    apiMethod: yup.string().required('mandatory field*'),
    apiDomain: yup.string().required('mandatory field*'),
    apiBasePath: yup.string(),
    apiVersion: yup.string(),
    apiEndpoint: yup.string().required('mandatory field*'),
    apiHeaders: yup.object(),
    apiQueryParams: yup.object(),
    apiUriParams: yup.object(),
    apiRequestBodyExample: yup.object(),
    apiRequestSchema: yup.object(),
    apiRequestBodyType: yup.string(),
});
export const categoryFormSchema = yup.object().shape({
    categoryName: yup.string().required('category name is required')
});
export const subCategoryFormSchema = yup.object().shape({
    subcategoryName: yup.string().required('sub category is required'),
    categoryId: yup.string().required('category is required'),
});


