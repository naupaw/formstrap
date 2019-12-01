import 'bootstrap/dist/css/bootstrap.css';
import { Form, Formik } from 'formik';
import * as React from 'react';
import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import { Col, FormGroup, Label, Row } from 'reactstrap';
import { CustomInput, Input, Submit } from '../.';
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
            initialValues={{
              username: '',
              email: '',
              gender: 'l',
              lights_1: 1,
            }}
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
                <CustomInput type="checkbox" name="accepted" label="Checked" />
              </FormGroup>
              <FormGroup>
                <CustomInput type="switch" name="lights_1" label="Lampu 1" />
                <CustomInput type="switch" name="lights_2" label="Lampu 2" />
                <CustomInput type="switch" name="lights_3" label="Lampu 3" />
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
