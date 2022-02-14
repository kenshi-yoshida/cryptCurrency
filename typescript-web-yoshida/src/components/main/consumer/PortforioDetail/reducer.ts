import { initialstate } from '../common/utility/initalState';
import { PORTFORIO_DETAIL_INIT_STORE } from './action';
export function portforioDetailReducer(state: {} = initialstate.holdCurrency, action: { type: string; payload: {} }) {
  switch (action.type) {
    case PORTFORIO_DETAIL_INIT_STORE:
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
