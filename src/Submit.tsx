import { useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import { Button, ButtonProps, Spinner } from 'reactstrap';

export const Submit: React.FC<ButtonProps> = props => {
  const { isSubmitting } = useFormikContext();

  let disabled = isSubmitting;

  if (props.disabled) {
    disabled = true;
  }

  const Submitting = () => {
    if (isSubmitting) {
      return (
        <Fragment>
          <Spinner size="sm" />{' '}
        </Fragment>
      );
    }
    return <Fragment></Fragment>;
  };

  return (
    <Fragment>
      <Button type="submit" {...props} disabled={disabled}>
        <Submitting />
        {props.children}
      </Button>
    </Fragment>
  );
};
