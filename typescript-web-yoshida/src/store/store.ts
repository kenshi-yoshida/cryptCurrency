import { createStore as reduxCreateStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './rootSaga';
import { portforioDetailReducer } from '../components/main/consumer/PortforioDetail/reducer';
import { registrationReducer } from '../components/main/consumer/Registration/reducer';
import { portforioSettingReducer } from '../components/main/consumer/PortforioSetting/reducer';

export function createStore() {
  const sagaMiddleware = createSagaMiddleware();
  const store = reduxCreateStore(
    combineReducers({
      holdCurrency: portforioSettingReducer,
      holdDetailCurrency: portforioDetailReducer,
      registration: registrationReducer,
      //例　users:usersReducer
    }),
    applyMiddleware(sagaMiddleware)
  );
  sagaMiddleware.run(rootSaga);
  return store;
}
