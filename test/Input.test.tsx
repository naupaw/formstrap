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

  it('Set number components value with zero 0 number value', () => {
    const wrapper = mount(
      <Formik initialValues={{ numValue: 0 }} onSubmit={() => {}}>
        <Input type="number" name="numValue" />
      </Formik>
    );

    waitFrame(wrapper);

    expect(wrapper.find('input').prop('value')).toEqual(0);
  });

  it('Select with selected value', () => {
    const wrapper = mount(
      <Formik initialValues={{ concert: '2' }} onSubmit={() => {}}>
        <Input type="select" name="concert">
          <option value="1">Metallica</option>
          <option value="2">Dream Theater</option>
          <option value="3">Iron Maiden</option>
        </Input>
      </Formik>
    );

    waitFrame(wrapper);

    expect(wrapper.find('select').props().value).toBe('2');
  });
});
