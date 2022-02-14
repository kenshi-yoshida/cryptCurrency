import { initialstate } from '../common/utility/initalState';
import { ADD_NEW_CURRENCY, DELETE_CURRENCY, PORTFORIO_SETTING_INIT_SETTING } from './action';

type StateType = {
  currencyName: string;
  quantity: string;
  url: string;
  currencyID: number;
  currentPrice: number;
};

export function portforioSettingReducer(
  state: StateType[] = initialstate.holdCurrency,
  action: { type: string; payload: {} }
) {
  switch (action.type) {
    case PORTFORIO_SETTING_INIT_SETTING:
      return { ...state, ...action.payload };
    case ADD_NEW_CURRENCY:
      return {
        ...state,
        ...action.payload,
      };
    case DELETE_CURRENCY:
      return {
        ...initialstate.holdCurrency,
      };
    default:
      return state;
  }
}
