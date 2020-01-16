import { mount, shallow } from 'enzyme';
import { Form, Formik } from 'formik';
import * as React from 'react';
import { act } from 'react-dom/test-utils';
import { Input } from '../src';

describe('Input', () => {
  it('Render Input without crash', () => {
    const wrapper = shallow(
      <Formik initialValues={{ name: 'name' }} onSubmit={() => {}}>
        <Input type="text" name="name" />
      </Formik>
    );

    expect(wrapper.find(Input).prop('type')).toEqual('text');
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

    wrapper
      .find('form')
      .at(0)
      .simulate('submit');

    waitFrame(wrapper);

    expect(wrapper.find('.invalid-feedback').text()).toEqual(
      'name is required'
    );
  });
});
