import { legacy_createStore as CreateStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'

import { composeWithDevTools } from 'redux-devtools-extension'

const store = CreateStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

const DataProvider = ({ children }) => {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  )
}

export default DataProvider;