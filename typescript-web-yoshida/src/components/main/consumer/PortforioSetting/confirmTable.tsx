import { NormalTableBody, NormalTableHead, NormalTableTd, NormalTableTh, NormalTableTr, Table } from '../../../parts';

export function ConfirmTable(props: any) {
  const datas = props.data;
  return (
    <Table width='full'>
      <NormalTableHead bgColor='blue'>
        <NormalTableTr>
          <NormalTableTh value='通貨名' width={60} />
          <NormalTableTh value='保有枚数' width={40} />
        </NormalTableTr>
      </NormalTableHead>
      {datas.map((data: any, index: number) => {
        return (
          <NormalTableBody key={index}>
            <NormalTableTr key={index}>
              <NormalTableTd value={data.currencyName} key={index} />
              <NormalTableTd value={data.quantity + ' ' + data.currencyName} align='right' />
            </NormalTableTr>
          </NormalTableBody>
        );
      })}
    </Table>
  );
}
