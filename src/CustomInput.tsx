import { getIn, useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import {
  CustomInput as BsCustomInput,
  CustomInputProps as BsCustomInputProps,
  FormFeedback,
} from 'reactstrap';

export interface CustomInputProps extends BsCustomInputProps {
  withLoading?: boolean;
  withFeedback?: boolean;
}

export const CustomInput: React.FC<CustomInputProps> = props => {
  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleChange,
    setFieldValue,
    handleBlur,
  } = useFormikContext();
  const { name, withLoading, withFeedback, type } = props;
  const error = getIn(errors, name as string);
  const value = getIn(values, name as string);
  const touch = getIn(touched, name as string);

  let disabled = withLoading ? isSubmitting : false;

  if (props.disabled) {
    disabled = true;
  }

  const additionalProps = () => {
    const addProps: any = {};
    switch (props.type) {
      case 'checkbox':
        addProps.checked =
          value === '1' || value === 1 || value === true ? true : false;
        break;
      case 'switch':
        addProps.checked =
          value === '1' || value === 1 || value === true ? true : false;
        break;
      case 'radio':
        addProps.checked = props.value === value;
        break;
    }

    if (!props.id) {
      addProps.id = props.type + '_' + name;
    }

    return addProps;
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (props.type) {
      case 'checkbox':
        setFieldValue(name as never, e.target.checked ? 1 : 0);
        break;
      case 'switch':
        setFieldValue(name as never, e.target.checked ? 1 : 0);
        break;
      default:
        handleChange(e);
        break;
    }
  };

  const feedback = () => (
    <Fragment>
      {withFeedback && touch && error ? (
        <FormFeedback>{error}</FormFeedback>
      ) : (
        ''
      )}
    </Fragment>
  );

  const feedBackInsideChild = () => {
    if (type === 'checkbox' || type === 'switch' || type === 'file') {
      return true; // feedback()
    } else {
      return false; //props.children;
    }
  };

  return (
    <Fragment>
      <BsCustomInput
        {...props}
        {...additionalProps()}
        name={name}
        disabled={disabled}
        onChange={onChange}
        onBlur={handleBlur}
        invalid={touch && error}
      >
        {feedBackInsideChild() ? feedback() : props.children}
      </BsCustomInput>
      {!feedBackInsideChild() && feedback()}
    </Fragment>
  );
};
CustomInput.defaultProps = {
  withLoading: true,
  withFeedback: true,
};
