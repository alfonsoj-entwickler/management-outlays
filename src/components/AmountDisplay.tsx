import { formarCurrency } from "../herlpers";

type AmountDisplayProps = {
  label?: string;
  amount: number;
};

export default function AmountDisplay({ label, amount }: AmountDisplayProps) {
  return (
    <p className="flex justify-between gap-2 text-2xl text-blue-600 font-bold">
      {label && <span>{label}:&nbsp;</span>}
      <span className="text-black font-black">{formarCurrency(amount)}</span>
    </p>
  );
}
