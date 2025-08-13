export default function TextInput({
  text1,
  text2,
  fileName1,
  fileName2,
  onFileRemove,
  onTextChange,
  onFileDrop,
}: {
  text1: string;
  text2: string;
  fileName1?: string;
  fileName2?: string;
  onFileRemove?: (target: "text1" | "text2") => void;
  onTextChange: (text1: string, text2: string) => void;
  onFileDrop?: (file: File, target: "text1" | "text2") => void;
}) {
  const handleFirstTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onTextChange(e.target.value, text2);
  };

  const handleSecondTextChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    onTextChange(text1, e.target.value);
  };

const handleDropText1 = (e: React.DragEvent<HTMLTextAreaElement>) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && onFileDrop) {
    onFileDrop(file, "text1");
  }
};

const handleDropText2 = (e: React.DragEvent<HTMLTextAreaElement>) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && onFileDrop) {
    onFileDrop(file, "text2");
  }
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
            onDrop={handleDropText1}
            onDragOver={(e) => e.preventDefault()}
            className="w-full min-h-[12rem] max-h-[24rem] overflow-auto p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 resize-y focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Écris ou colle ton texte ici..."
          />
   {fileName1 && (
  <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
    <span>Fichier déposé : {fileName1}</span>
    {onFileRemove && (
      <button
        onClick={() => onFileRemove("text1")}
        className="text-red-500 hover:underline"
      >
        Supprimer
      </button>
    )}
  </div>
)}

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
            onDrop={handleDropText2}
            onDragOver={(e) => e.preventDefault()}
            className="w-full min-h-[12rem] max-h-[24rem] overflow-auto p-3 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 resize-y focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            placeholder="Écris ou colle ton texte ici..."
          />
          {fileName2 && (
  <div className="mt-2 text-xs text-gray-500 flex items-center gap-2">
    <span>Fichier déposé : {fileName2}</span>
    {onFileRemove && (
      <button
        onClick={() => onFileRemove("text2")}
        className="text-red-500 hover:underline"
      >
        Supprimer
      </button>
    )}
  </div>
)}
        </div>
      </section>
    </div>
  );
}
