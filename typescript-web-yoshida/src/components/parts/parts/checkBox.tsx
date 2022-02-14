type PropsType = {
  value: boolean;
  onChange: () => void;
};

/**
 * チェックボックスを表示する
 * @param value チェック判定
 * @param onChange チェック時の処理
 */
export function CheckBox(props: PropsType) {
  return <input type='checkbox' onChange={() => props.onChange()} checked={props.value} />;
}
