import { type ReactNode } from "react";

type ErrorMessageProps = {
  children: ReactNode;
};

export default function ErrorMessage({ children }: ErrorMessageProps) {
  return (
    <p className="p-2 text-sm text-center font-bold text-white bg-red-600">
      {children}
    </p>
  );
}
