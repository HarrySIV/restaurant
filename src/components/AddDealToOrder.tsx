import { IDeal } from '../shared/hooks/database/deal-hook';

interface IAddDealToOrderProps {
  deal: IDeal;
  closeHandler: () => void;
}

export const AddDealToOrder = (props: IAddDealToOrderProps) => {
  return <h1>deal</h1>;
};
