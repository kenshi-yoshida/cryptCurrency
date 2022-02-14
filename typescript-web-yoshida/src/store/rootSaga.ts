import { takeEvery } from '@redux-saga/core/effects';
import { portforioDetailInit } from '../components/main/consumer/common/utility/utility.saga';
import { PORTFORIO_DETAIL_INIT } from '../components/main/consumer/PortforioDetail/action';

export function* rootSaga() {
  yield takeEvery(PORTFORIO_DETAIL_INIT, portforioDetailInit);
}
