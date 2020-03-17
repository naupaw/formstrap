import { mount } from 'enzyme';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { Input, Submit } from '../src';
import waitFrame from './utils';

describe('Submit', () => {
  it('Render without crash', () => {
    const wrapper = mount(
      <Formik initialValues={{}} onSubmit={() => {}}>
        <Form>
          <Submit>Submit !</Submit>
        </Form>
      </Formik>
    );

    expect(wrapper.find('button').at(0)).toHaveLength(1);
  });

  it('Submit form without crash', () => {
    const wrapper = mount(
      <Formik initialValues={{ name: 'name' }} onSubmit={() => {}}>
        <Form>
          <Input type="text" name="name" />
          <Submit>Submit !</Submit>
        </Form>
      </Formik>
    );

    wrapper
      .find('form')
      .at(0)
      .simulate('submit');

    waitFrame(wrapper);

    expect(
      wrapper
        .find(Submit)
        .childAt(0)
        .prop('disabled')
    ).toEqual(true);
  });

  it('Submit form with spinner', () => {
    const waitFrame = async (wrapper: any) => {
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
        wrapper.update();
      });
    };

    const wrapper = mount(
      <Formik initialValues={{ name: 'name' }} onSubmit={() => {}}>
        <Form>
          <Input type="text" name="name" />
          <Submit withSpinner={true}>Submit !</Submit>
        </Form>
      </Formik>
    );

    wrapper
      .find('form')
      .at(0)
      .simulate('submit');

    waitFrame(wrapper);

    expect(wrapper.find('.spinner-border')).toHaveLength(1);
  });
});
