# Formstrap

[![npm version](https://badge.fury.io/js/formstrap.svg)](https://badge.fury.io/js/formstrap)

Let your reactstrap input component integrate seamlessly using formik

[**Demo**](http://pedox.github.com/formstrap/)

Installation

```
npm install formstrap
```

Or

```
yarn add formstrap
```

_make sure both Formik, reactstrap and bootstrap installed_

## Basic usage

Just replace any Input / CustomInput from `reactstrap` to `formstrap` and you're done!

```jsx
import Ract from 'react';
import { Formik, Form } from 'formik';
import { Input, Submit } from 'formstrap';
import { FormGroup } from 'reactstrap';

const App = () => {
  const initialValues = {
    fname: 'laws',
  };

  const onSubmit = async (values, { setSubmitting }) => {
    console.log(values);
    // some await function ...
    setSubmitting(false);
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <FormGroup>
          <Label>Name</Label>
          <Input type="text" name="fname" />
        </FormGroup>
        <Submit withSpinner>Save</Submit>
      </Form>
    </Formik>
  );
};
```

## Additional Props

All props is extends from default Reactstrap Input props here's the thing that we added.

### `<Input />` and `<CustomInput />`

- **withLoading?**: _boolean_ - Input is disabled when submit / isSubmitting occur
- **withFeedback?**: _boolean_ - Throw feedback when validation has error

### `<Submit />`

- **withLoading?**: _boolean_ - Button is disabled when submit / isSubmitting occur
- **withSpinner?**: _boolean_ - Show spinner icon when submit / isSubmitting occur

## @todo feature

- [x] Input
  - [x] Input field (text, password, textarea, etc...)
  - [x] Select
  - [x] props
    - [x] withLoading
    - [x] withFeedback
- [x] CustomInput
  - [x] Input field (text, password, textarea, etc...)
  - [x] Select
  - [x] Checkbox
  - [x] Radio
  - [x] File Uploads
  - [x] props
    - [x] withLoading
    - [x] withFeedback
- [x] Submit
  - [x] withLoading
  - [x] withSpinner
- [ ] FormBlocker _block form when loading (prevent input change from user)_
