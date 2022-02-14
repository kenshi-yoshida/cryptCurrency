//はい・いいえボタンがあるモーダルを表示する
import { ButtonValue } from '../../../common/enumType';
import { DefaultButton, OneBlock, TitleText } from '../../../parts';

type PropsType = {
  value: string;
  noHover: 'primary' | 'attention' | 'danger';
  yesHover: 'primary' | 'attention' | 'danger';
  onNoClick: () => void;
  onYesClick: () => void;
};
export const BoolMordal: React.FC<PropsType> = ({ children, value, noHover, yesHover, onNoClick, onYesClick }) => {
  return (
    <>
      <TitleText value={value} align='center' />
      {children}
      <OneBlock display='flex' justify='space-around'>
        <DefaultButton
          value={ButtonValue.NO}
          hover={noHover}
          onClick={() => {
            onNoClick();
          }}
        />
        <DefaultButton
          value={ButtonValue.YES}
          hover={yesHover}
          onClick={() => {
            onYesClick();
          }}
        />
      </OneBlock>
    </>
  );
};
