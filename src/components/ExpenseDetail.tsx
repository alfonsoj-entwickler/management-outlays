import { useMemo } from "react";
import {
  LeadingActions,
  SwipeableList,
  SwipeableListItem,
  SwipeAction,
  TrailingActions,
} from "react-swipeable-list";
import { formatDate } from "../herlpers";
import type { Expense } from "../types";
import AmountDisplay from "./AmountDisplay";
import { categories } from "../data/categories";

import "react-swipeable-list/dist/styles.css";
import { useBudget } from "../hooks/useBudget";

type ExpenseDetailProps = {
  expense: Expense;
};
export default function ExpenseDetail({ expense }: ExpenseDetailProps) {
  const categoryInfo = useMemo(
    () => categories.filter((cat) => cat.id === expense.category)[0],
    [expense]
  );

  const { dispatch } = useBudget();

  const leadingActions = () => {
    return (
      <LeadingActions>
        <SwipeAction
          onClick={() =>
            dispatch({ type: "get-expense-by-id", payload: { id: expense.id } })
          }
        >
          Update
        </SwipeAction>
      </LeadingActions>
    );
  };

  const trailingActions = () => {
    return (
      <TrailingActions>
        <SwipeAction
          onClick={() =>
            dispatch({ type: "remove-expense", payload: { id: expense.id } })
          }
          destructive={true}
        >
          Delete
        </SwipeAction>
      </TrailingActions>
    );
  };

  return (
    <SwipeableList>
      <SwipeableListItem
        leadingActions={leadingActions()}
        trailingActions={trailingActions()}
      >
        <div className="flex gap-5 justify-between items-center bg-white shadow-lg p-10 w-full border-b border-gray-200">
          <div>
            <img
              src={`icons/icons_${categoryInfo.icon}.svg`}
              alt={`icon of ${categoryInfo.name}`}
              className="size-20"
            />
          </div>
          <div className="flex-1 space-y-2">
            <p className="text-sm font-bold uppercase text-slate-500">
              {categoryInfo.name}
            </p>
            <p>{expense.expenseName}</p>
            <p className="text-slate-600 text-sm">
              {formatDate(expense.date!.toString())}
            </p>
          </div>
          <AmountDisplay amount={expense.amount} />
        </div>
      </SwipeableListItem>
    </SwipeableList>
  );
}
