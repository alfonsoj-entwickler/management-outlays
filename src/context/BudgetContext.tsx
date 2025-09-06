import {
  useReducer,
  createContext,
  type Dispatch,
  type ReactNode,
} from "react";
import {
  budgetReducer,
  initialState,
  type BudgetActions,
  type BudgetState,
} from "../reducers/budget-reducers";

type BudgetContextProps = {
  state: BudgetState;
  dispatch: Dispatch<BudgetActions>;
};

export const BudgetContext = createContext<BudgetContextProps>(null!);

type BudgetProviderProps = {
  children: ReactNode;
};

export const BudgetProvider = ({ children }: BudgetProviderProps) => {
  const [state, dispatch] = useReducer(budgetReducer, initialState);

  return (
    <BudgetContext.Provider value={{ state, dispatch }}>
      {children}
    </BudgetContext.Provider>
  );
};
