import React from 'react';
import useCachedResources from './hooks/useCachedResources';

//Redux
import { store } from './store/store'
import { Provider } from 'react-redux'
//Navigation
import Navigation from './navigation';
import {StatusBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  const isLoadingComplete = useCachedResources();
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <NavigationContainer>
            <Navigation />
            <StatusBar />
        </NavigationContainer>
      </Provider>
    );
  }
}
