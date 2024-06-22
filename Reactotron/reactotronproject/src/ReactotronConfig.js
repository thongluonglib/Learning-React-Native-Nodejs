// ReactotronConfig.js
import Reactotron, { networking } from 'reactotron-react-native';
import { reactotronRedux } from 'reactotron-redux';

Reactotron
  .configure({ name: 'React Native Demo' }) // Application name
  .useReactNative({
    storybook: true,
  }) // Adds all built-in React Native plugins
  .use(networking())
  .use(reactotronRedux()) // Redux plugin
  .connect(); // Connect to Reactotron

// Export the configured Reactotron
export default Reactotron;