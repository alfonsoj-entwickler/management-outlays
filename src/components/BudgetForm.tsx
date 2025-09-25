import { useState, useMemo } from "react";
import { useBudget } from "../hooks/useBudget";
export default function BudgetForm() {
  const [budget, setBudget] = useState(0);
  const { dispatch } = useBudget();

  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0;
  }, [budget]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "add-budget", payload: { budget: budget } });
  };

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className="text-4xl text-green-600 font-bold text-center"
        >
          Define Budget
        </label>
        <input
          id="budget"
          type="number"
          name="budget"
          className="w-full bg-white border border-gray-200 p-2"
          value={budget}
          onChange={(e) => setBudget(e.target.valueAsNumber)}
        />
      </div>
      <input
        type="submit"
        value="Define Budget"
        className="w-full p-2 text-white font-black uppercase bg-green-600 transition-color hover:bg-green-700 cursor-pointer disabled:opacity-50"
        disabled={isValid}
      />
    </form>
  );
}
