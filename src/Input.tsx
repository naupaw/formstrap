import { getIn, useFormikContext } from 'formik';
import React, { Fragment, useMemo } from 'react';
import { FormFeedback, Input as BsInput, InputProps } from 'reactstrap';

export interface FSInputProps extends InputProps {
  withLoading?: boolean;
  withFeedback?: boolean;
}

export const Input: React.FC<FSInputProps> = ({
  name,
  withFeedback,
  withLoading,
  ...props
}) => {
  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleChange,
    handleBlur,
  } = useFormikContext();

  const error = getIn(errors, name as string);
  const value = getIn(values, name as string);
  const touch = getIn(touched, name as string);

  let disabled = withLoading ? isSubmitting : false;

  if (props.disabled) {
    disabled = true;
  }

  const returnedValue = useMemo(() => {
    if (props.type === 'number') {
      return value || 0;
    }
    return value || '';
  }, [value, props.type]);

  return (
    <Fragment>
      <BsInput
        {...props}
        disabled={disabled}
        value={returnedValue}
        onChange={handleChange}
        onBlur={handleBlur}
        name={name}
        invalid={touch && error ? true : false}
      />
      {withFeedback && touch && error ? (
        <FormFeedback>{error}</FormFeedback>
      ) : (
        ''
      )}
    </Fragment>
  );
};
Input.defaultProps = {
  withLoading: true,
  withFeedback: true,
};
