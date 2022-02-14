//追加モーダルを表示する
import { ButtonValue } from '../../../common/enumType';
import { DefaultButton, OneBlock, TitleText } from '../../../parts';

type PropsType = {
  value: string;
  noHover: 'primary' | 'attention' | 'danger';
  onNoClick: () => void;
};
export const AddMordal: React.FC<PropsType> = ({ children, value, noHover, onNoClick }) => {
  return (
    <>
      <TitleText value={value} align='center' />
      {children}
      <OneBlock display='flex' justify='center'>
        <DefaultButton
          value={ButtonValue.CLOSE}
          hover={noHover}
          onClick={() => {
            onNoClick();
          }}
        />
      </OneBlock>
    </>
  );
};
