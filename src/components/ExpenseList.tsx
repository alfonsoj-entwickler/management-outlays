import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
import ExpenseDetail from "./ExpenseDetail";

export default function ExpenseList() {
  const { state } = useBudget();

  const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses]);

  return (
    <div className="mt-10">
      {isEmpty ? (
        <p className="text-gray-600 text-2xl font-bold">
          There not any elements
        </p>
      ) : (
        <>
          <p className="text-gray-700 text-2xl font-bold my-5">List</p>
          {state.expenses.map((item) => (
            <ExpenseDetail key={item.id} expense={item} />
          ))}
        </>
      )}
    </div>
  );
}
