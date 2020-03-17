import { act } from 'react-dom/test-utils';

const waitFrame = async (wrapper: any) => {
  await act(async () => {
    await new Promise(resolve => setTimeout(resolve, 0));
    wrapper.update();
  });
};

export default waitFrame;
