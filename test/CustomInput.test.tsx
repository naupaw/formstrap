import { mount, shallow } from 'enzyme';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { CustomInput } from '../src';

describe('CustomInput', () => {
  it('Render CustomInput checkbox without crash', () => {
    const wrapper = shallow(
      <Formik initialValues={{ checked: true }} onSubmit={() => {}}>
        <CustomInput type="checkbox" name="checked" />
      </Formik>
    );

    expect(wrapper.find(CustomInput).prop('type')).toEqual('checkbox');
  });

  it('Render Input error message', () => {
    const waitFrame = async (wrapper: any) => {
      await act(async () => {
        await new Promise(resolve => setTimeout(resolve, 0));
        wrapper.update();
      });
    };

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

    wrapper
      .find('form')
      .at(0)
      .simulate('submit');

    waitFrame(wrapper);

    expect(wrapper.find('.invalid-feedback').text()).toEqual(
      'is required checked'
    );
  });
});
