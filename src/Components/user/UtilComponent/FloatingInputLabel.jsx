import { ErrorMessage } from "formik"
import { Form } from "react-bootstrap"
import PropTypes from 'prop-types';
import { isError } from "../../../Utils";
function FloatingInputLabel({ fieldName, formikFrom, labelText, fieldType = 'text' }) {
    return (
        <Form.Floating className="mb-3">
            <Form.Control id={fieldName} type={fieldType} name={fieldName} placeholder="" maxLength={fieldName == 'mobileNo' ? "10" : ""} autoComplete="off" className={isError(formikFrom, fieldName) ? 'is-invalid py-1' : 'py-1'}
                value={formikFrom.values[fieldName]} onChange={formikFrom.handleChange} onBlur={formikFrom.handleBlur}
            />
            <label htmlFor={fieldName} className="pb-0">{labelText}</label>
            <ErrorMessage name={fieldName} component="small" className='text-danger' />
        </Form.Floating>
    )
}
FloatingInputLabel.propTypes = {
    fieldName: PropTypes.string,
    formikFrom: PropTypes.any,
    labelText: PropTypes.string,
    fieldType: PropTypes.string,
}
export default FloatingInputLabel
