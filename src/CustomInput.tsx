import { getIn, useFormikContext } from 'formik';
import React, { Fragment, useMemo } from 'react';
import {
  CustomInput as BsCustomInput,
  CustomInputProps,
  FormFeedback,
} from 'reactstrap';

/** @ts-ignore */
export interface FSCustomInputProps extends CustomInputProps {
  id?: string | number;
  withLoading?: boolean;
  withFeedback?: boolean;
}

export const CustomInput: React.FC<FSCustomInputProps> = ({
  name,
  withLoading,
  withFeedback,
  type,
  value: propsValue,
  ...props
}) => {
  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
  } = useFormikContext();
  const error = getIn(errors, name as string);
  const value = getIn(values, name as string);
  const touch = getIn(touched, name as string);

  let disabled = withLoading ? isSubmitting : false;

  if (props.disabled) {
    disabled = true;
  }

  const additionalProps = useMemo(() => {
    const addProps: any = {};
    let usingCustomValue = false;
    switch (type) {
      case 'checkbox':
        addProps.checked =
          value === '1' || value === 1 || value === true ? true : false;
        usingCustomValue = true;
        break;
      case 'switch':
        addProps.checked =
          value === '1' || value === 1 || value === true ? true : false;
        usingCustomValue = true;
        break;
      case 'radio':
        addProps.checked = propsValue === value;
        usingCustomValue = true;
        break;
      case 'file':
        addProps.multiple = false;
        usingCustomValue = true;
        break;
    }

    if (!usingCustomValue) {
      addProps.value = value;
    }

    if (!props.id) {
      addProps.id = type + '_' + name;
    }

    return addProps;
  }, [props, value, propsValue, name, type]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (type) {
      case 'checkbox':
        if (typeof value === 'number') {
          setFieldValue(name as string, e.target.checked ? 1 : 0);
        } else if (typeof value === 'boolean') {
          setFieldValue(name as string, e.target.checked ? true : false);
        } else {
          setFieldValue(name as string, e.target.checked ? '1' : '0');
        }
        break;
      case 'switch':
        if (typeof value === 'number') {
          setFieldValue(name as string, e.target.checked ? 1 : 0);
        } else if (typeof value === 'boolean') {
          setFieldValue(name as string, e.target.checked ? true : false);
        } else {
          setFieldValue(name as string, e.target.checked ? '1' : '0');
        }
        break;
      /**
       * for now it's only single file upload
       *
       * @todo multiple file upload?
       */
      case 'file':
        const file = e.target.files ? e.target.files[0] : null;
        setFieldValue(name as string, file);
        break;
      case 'radio':
        setFieldValue(name as string, propsValue);
        break;
      default:
        handleChange(e);
        break;
    }
  };

  const feedback = useMemo(
    () => (
      <Fragment>
        {withFeedback && touch && error ? (
          <FormFeedback>{error}</FormFeedback>
        ) : (
          ''
        )}
      </Fragment>
    ),
    [withFeedback, touch, error]
  );

  const feedBackInsideChild = useMemo(() => {
    if (type === 'checkbox' || type === 'switch' || type === 'file') {
      return true;
    } else {
      return false;
    }
  }, [type]);

  return (
    <Fragment>
      <BsCustomInput
        {...props}
        {...additionalProps}
        name={name}
        type={type}
        disabled={disabled}
        onChange={onChange}
        onBlur={handleBlur}
        invalid={touch && error ? true : false}
      >
        {feedBackInsideChild ? feedback : props.children}
      </BsCustomInput>
      {!feedBackInsideChild && feedback}
    </Fragment>
  );
};
CustomInput.defaultProps = {
  withLoading: true,
  withFeedback: true,
};
