import { useEffect, useState, type ChangeEvent } from "react";
import { categories } from "../data/categories";
import DatePicker from "react-date-picker";
import type { Value, DraftExpense } from "../types";

import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";

export default function ExpenseForm() {
  const [expense, setExpense] = useState<DraftExpense>({
    amount: 0,
    expenseName: "",
    category: "",
    date: new Date(),
  });
  const [error, setError] = useState("");
  const { state, dispatch } = useBudget();

  useEffect(() => {
    if (state.editingId) {
      const editiingExpense = state.expenses.filter(
        (item) => item.id === state.editingId
      )[0];
      setExpense(editiingExpense);
    }
  }, [state.editingId]);

  const handleChangeDate = (e: Value) => {
    setExpense({
      ...expense,
      date: e,
    });
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isAmountField = ["amount"].includes(name);

    setExpense({
      ...expense,
      [name]: isAmountField ? +value : value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (Object.values(expense).includes("")) {
      setError("All input are mandatory!");
      return;
    }

    if (state.editingId) {
      dispatch({
        type: "update-expense",
        payload: {
          expense: {
            id: state.editingId,
            ...expense,
          },
        },
      });
    } else {
      dispatch({ type: "add-expense", payload: { expense } });
    }

    setExpense({
      amount: 0,
      expenseName: "",
      category: "",
      date: new Date(),
    });
    setError("");
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <legend className="uppercase text-center text-2xl font-black border-b-4 border-green-500 py-2">
        {state.editingId ? "Editing outlay" : "New outlay"}
      </legend>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <div className="flex flex-col gap-2">
        <label htmlFor="expenseName" className="text-xl">
          Name of outlay:
        </label>
        <input
          type="text"
          id="expenseName"
          placeholder="Add the name of outlay"
          className="bg-slate-100 p-2"
          name="expenseName"
          value={expense.expenseName}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          placeholder="Add the name of outlay"
          className="bg-slate-100 p-2"
          name="amount"
          value={expense.amount}
          onChange={handleChange}
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="category" className="text-xl">
          Categories:
        </label>
        <select
          id="category"
          className="bg-slate-100 p-2"
          name="category"
          value={expense.category}
          onChange={handleChange}
        >
          <option value="">-- Select ---</option>
          {categories.map((categorie) => (
            <option key={`categorie-${categorie.id}`} value={categorie.id}>
              {categorie.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="amount" className="text-xl">
          Date:
        </label>
        <DatePicker
          onChange={handleChangeDate}
          value={expense.date}
          className="p-2 bg-slate-100 border-0 outline-none"
        />
      </div>
      <input
        type="submit"
        className="bg-green-600 cursor-pointer w-full p-2 text-white uppercase font-bold rounded-lg"
        value={`${state.editingId ? "Update outlay" : "Register outlay"}`}
      />
    </form>
  );
}
