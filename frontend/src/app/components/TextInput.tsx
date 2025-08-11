"use client";

import { useState } from "react";

export default function TextInput({
  onTextChange,
}: {
  onTextChange: (text1: string, text2: string) => void;
}) {
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");

  const handleFirstTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText1(e.target.value);
    onTextChange(e.target.value, text2);
  };

  const handleSecondTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setText2(e.target.value);
    onTextChange(text1, e.target.value);
  };

  return (
    <div className="w-full flex flex-col items-center px-4 py-8">
      <h1 className="text-center mb-8 text-2xl font-semibold">
        Comparaison de textes
      </h1>

      <section className="flex flex-col sm:flex-row gap-8 w-full max-w-screen-lg">
        <div className="flex flex-col w-full">
          <label
            htmlFor="text1"
            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Premier texte
          </label>
          <textarea
            id="text1"
            value={text1}
            onChange={handleFirstTextChange}
            className="w-full min-h-[12rem] max-h-[24rem] overflow-auto p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 resize-y focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Écris ou colle ton texte ici..."
          />
        </div>

        <div className="flex flex-col w-full">
          <label
            htmlFor="text2"
            className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Deuxième texte
          </label>
          <textarea
            id="text2"
            value={text2}
            onChange={handleSecondTextChange}
            className="w-full min-h-[12rem] max-h-[24rem] overflow-auto p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 resize-y focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Écris ou colle ton texte ici..."
          />
        </div>
      </section>
    </div>
  );
}
