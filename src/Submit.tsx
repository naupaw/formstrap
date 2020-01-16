import { useFormikContext } from 'formik';
import React, { Fragment } from 'react';
import { Button, ButtonProps as BsButtonProps, Spinner } from 'reactstrap';

export interface SubmitProps extends BsButtonProps {
  withLoading?: boolean;
  withSpinner?: boolean;
}

export const Submit: React.FC<SubmitProps> = ({
  withLoading,
  withSpinner,
  ...props
}) => {
  const { isSubmitting } = useFormikContext();

  let disabled = withLoading ? isSubmitting : false;

  if (props.disabled) {
    disabled = true;
  }

  if (props.disabled) {
    disabled = true;
  }

  const Submitting = () => {
    if (withSpinner && isSubmitting) {
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
Submit.defaultProps = {
  color: 'primary',
  withLoading: true,
};
