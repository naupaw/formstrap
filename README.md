# Formstrap

The fusion of Formik + Reacstrap

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
        <Submit>Save</Submit>
      </Form>
    </Formik>
  );
};
```

## @todo feature

- [ ] Input
  - [x] Input field (text, password, textarea, etc...)
  - [x] Select
  - [ ] props
    - [ ] withLoading
    - [ ] withFeedback
- [ ] CustomInput
  - [x] Input field (text, password, textarea, etc...)
  - [x] Select
  - [x] Checkbox
  - [x] Radio
  - [ ] File Uploads
  - [ ] props
    - [ ] withLoading
    - [ ] withFeedback
- [x] Submit
  - [ ] withSpinner
- [ ] FormBlocker _block form when loading (prevent input change from user)_
