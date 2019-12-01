import 'bootstrap/dist/css/bootstrap.css';
import { Form, Formik } from 'formik';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { Col, CustomInput, FormGroup, Label, Row } from 'reactstrap';
import { Input, Submit } from '../.';
import './app.css';

const App = () => {
  const [data, setData] = React.useState({});
  const onSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      setData(values);
      setSubmitting(false);
    }, 1000);
  };
  return (
    <div className="app">
      <h1>@pedox/formik-reactstrap</h1>
      <Row>
        <Col sm={6}>
          <Formik
            initialValues={{ username: '', email: '' }}
            onSubmit={onSubmit}
          >
            <Form>
              <FormGroup>
                <Label>Username</Label>
                <Input name="text" type="text" placeholder="username" />
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
                  label="Remember me"
                  id="remember-me"
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type="radio"
                  label="Male"
                  id="gender-m"
                  name="gender"
                />
                <CustomInput
                  type="radio"
                  label="Female"
                  id="gender-f"
                  name="gender"
                />
              </FormGroup>
              <FormGroup>
                <CustomInput
                  type="switch"
                  name="switched"
                  label="turn this on"
                  id="turn-this-on"
                />
              </FormGroup>
              <FormGroup>
                <CustomInput type="select">
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </CustomInput>
              </FormGroup>
              <FormGroup>
                <CustomInput type="file" label="Select file" />
              </FormGroup>
              <FormGroup>
                <Submit color="primary">Simpan</Submit>
              </FormGroup>
            </Form>
          </Formik>
        </Col>
        <Col sm={6}>
          <pre>{JSON.stringify(data, null, 2)}</pre>
        </Col>
      </Row>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
