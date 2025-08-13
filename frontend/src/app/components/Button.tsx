
import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label?: string;
   disabled?: boolean;
}

const Button = ({ onClick, label = "Comparer" }: ButtonProps) => {
  return (
    <div className="flex space-x-4 space-y-4 justify-center items-baseline">
      <div className="p-2 flex flex-row items-center gap-6">
        <button
          onClick={onClick}
          className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
        >
          {label}
        </button>
      </div>
    </div>
  );
};

export default Button;

   {/* <button className="rounded-lg px-4 py-2 bg-green-700 text-green-100 opacity-50 cursor-not-allowed didsabled:cursor-not-allowed disabled:opacity-50" disabled>Supprimer</button> */}