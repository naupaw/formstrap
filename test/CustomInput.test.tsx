import { mount, shallow } from 'enzyme';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { CustomInput } from '../src';
import waitFrame from './utils';

describe('CustomInput', () => {
  it('Render checkbox component without crash', () => {
    const wrapper = shallow(
      <Formik initialValues={{ checked: true }} onSubmit={() => {}}>
        <CustomInput type="checkbox" name="checked" />
      </Formik>
    );

    expect(wrapper.find(CustomInput).prop('type')).toEqual('checkbox');
  });

  it('Set component value', () => {
    const wrapper = mount(
      <Formik initialValues={{ checked: false }} onSubmit={() => {}}>
        <CustomInput type="checkbox" name="checked" />
      </Formik>
    );

    wrapper.find('input').simulate('change', {
      target: { name: 'checked', checked: true },
    });

    waitFrame(wrapper);

    expect(wrapper.find('input').prop('checked')).toEqual(true);
  });

  it('Render error message', () => {
    const wrapper = mount(
      <Formik
        initialValues={{ checked: 'name' }}
        onSubmit={() => {}}
        initialErrors={{
          checked: 'is required checked',
        }}
      >
        <Form>
          <CustomInput type="checkbox" name="checked" withFeedback={true} />
        </Form>
      </Formik>
    );

    wrapper.find('form').simulate('submit');

    waitFrame(wrapper);

    expect(wrapper.find('.invalid-feedback').text()).toEqual(
      'is required checked'
    );
  });

  it('Render component with undefined value', () => {
    const wrapper = shallow(
      <Formik initialValues={{ otherCheckbox: true }} onSubmit={() => {}}>
        <CustomInput type="checkbox" name="checked" />
      </Formik>
    );

    expect(wrapper.find(CustomInput).prop('type')).toEqual('checkbox');
  });

  it('Set value with initial undefined value', () => {
    const wrapper = mount(
      <Formik initialValues={{ otherCheckbox: true }} onSubmit={() => {}}>
        <Form>
          <CustomInput type="checkbox" name="checked" />
        </Form>
      </Formik>
    );

    wrapper.find('input').simulate('change', {
      target: { name: 'checked', checked: true },
    });

    waitFrame(wrapper);

    expect(wrapper.find('input').prop('checked')).toEqual(true);
  });

  it('Custom Select with selected value', () => {
    const wrapper = mount(
      <Formik initialValues={{ option: '2' }} onSubmit={() => {}}>
        <Form>
          <CustomInput type="select" name="option">
            <option value="1">Metallica</option>
            <option value="2">Dream Theater</option>
            <option value="3">Iron Maiden</option>
          </CustomInput>
        </Form>
      </Formik>
    );

    waitFrame(wrapper);

    expect(wrapper.find('select').props().value).toBe('2');
  });
});
