import 'bootstrap/dist/css/bootstrap.css';
import { Form, Formik } from 'formik';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { CustomInput, Input, Submit } from '../.';
import './app.css';

const App = () => {
  const [data, setData] = React.useState({
    username: '',
    email: '',
    gender: 'l',
    switcher: 1,
    type: 'untyped',
    accepted: false,
  });
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setData(values);
      setSubmitting(false);
    }, 1000);
  };

  const onValidate = values => {
    const errors = {};
    if (!values.username) {
      errors.username = 'Pleae fill username';
    }
    if (!values.accepted && values.accepted !== 1) {
      errors.accepted = 'Pleae accept this';
    }
    if (!values.type || values.type === 'untyped') {
      errors.type = 'Please choose anything than untyped';
    }
    return errors;
  };

  return (
    <div className="app">
      <h1>formstrap</h1>
      <p>
        Let your reactstrap input component integrate seamlessly using formik
      </p>
      <p>Installation</p>
      <pre>npm install formstrap</pre>
      <p>OR</p>
      <pre>yarn add formstrap</pre>
      <hr />
      <h2>Form Example</h2>
      <Row>
        <Col sm={6}>
          <Formik
            initialValues={data}
            validate={onValidate}
            onSubmit={onSubmit}
          >
            <Form>
              <FormGroup>
                <Label>Username</Label>
                <Input name="username" type="text" placeholder="username" />
              </FormGroup>
              <FormGroup>
                <Label>Email</Label>
                <Input
                  name="email"
                  type="email"
                  placeholder="user@example.com"
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type="checkbox"
                  name="accepted"
                  label="Can You Accept this ?"
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type="switch"
                  name="switcher"
                  label="Switch this"
                />
              </FormGroup>
              <FormGroup>
                <Label>Type</Label>
                <CustomInput type="select" name="type">
                  <option value="untyped">Untyped</option>
                  <option value="read">Read</option>
                  <option value="unread">Unread</option>
                </CustomInput>
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type="radio"
                  name="gender"
                  id="gender-f"
                  value="p"
                  label="Perempuan"
                />
                <CustomInput
                  type="radio"
                  name="gender"
                  id="gender-m"
                  value="l"
                  label="Laki-Laki"
                />
              </FormGroup>
              <FormGroup>
                <CustomInput type="file" name="file" label="Choose" />
              </FormGroup>
              <FormGroup>
                <Submit withSpinner>Save</Submit>
              </FormGroup>
            </Form>
          </Formik>
        </Col>
        <Col sm={6}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Col>
      </Row>
      Documentation and more{' '}
      <a href="http://github.com/pedox/formstrap">Gihub links</a>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
