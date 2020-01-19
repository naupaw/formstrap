import { mount, shallow } from 'enzyme';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { Input } from '../src';
import waitFrame from './utils';

describe('Input', () => {
  it('Render Input without crash', () => {
    const wrapper = shallow(
      <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
        <Input type="text" name="name" />
      </Formik>
    );

    expect(wrapper.find(Input).prop('type')).toEqual('text');
  });

  it('Set component value', () => {
    const wrapper = mount(
      <Formik initialValues={{ name: '' }} onSubmit={() => {}}>
        <Input type="text" name="name" />
      </Formik>
    );

    wrapper.find('input').simulate('change', {
      target: { name: 'name', value: 'new value' },
    });

    waitFrame(wrapper);

    expect(wrapper.find('input').prop('value')).toEqual('new value');
  });

  it('Render error message', () => {
    const wrapper = mount(
      <Formik
        initialValues={{ name: 'name' }}
        onSubmit={() => {}}
        initialErrors={{
          name: 'name is required',
        }}
      >
        <Form>
          <Input type="text" name="name" withFeedback={true} />
        </Form>
      </Formik>
    );

    wrapper.find('form').simulate('submit');

    waitFrame(wrapper);

    expect(wrapper.find('.invalid-feedback').text()).toEqual(
      'name is required'
    );
  });

  it('Render component with undefined value', () => {
    const wrapper = shallow(
      <Formik initialValues={{ other: 'other value' }} onSubmit={() => {}}>
        <Input type="text" name="name" />
      </Formik>
    );

    expect(wrapper.find(Input).prop('type')).toEqual('text');
  });

  it('Set value with intial undefined value', () => {
    const wrapper = mount(
      <Formik initialValues={{ other: 'other value' }} onSubmit={() => {}}>
        <Input type="text" name="name" />
      </Formik>
    );

    wrapper.find('input').simulate('change', {
      target: { name: 'name', value: 'new value' },
    });

    waitFrame(wrapper);

    expect(wrapper.find('input').prop('value')).toEqual('new value');
  });
});
