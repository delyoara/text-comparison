"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import Button from "./components/Button";
import TextInput from "./components/TextInput";
import TextSimilarity from "./components/TextSimilarity";

export default function Home() {
  const router = useRouter();

  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [fileName1, setFileName1] = useState<string | undefined>();
  const [fileName2, setFileName2] = useState<string | undefined>();

  const [similarity, setSimilarity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const isValidTextFile = (file: File): boolean => {
  const acceptedTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ];

  const acceptedExtensions = [".pdf", ".doc", ".docx"];

  const typeIsValid = acceptedTypes.includes(file.type);
  const extensionIsValid = acceptedExtensions.some(ext =>
    file.name.toLowerCase().endsWith(ext)
  );

  return typeIsValid || extensionIsValid;
};

  // Mise à jour des textes depuis TextInput
  const handleTextChange = (newText1: string, newText2: string) => {
    setText1(newText1);
    setText2(newText2);
  };
  
  const buildFormData = (file: File, target: "text1" | "text2"): FormData => {
  const formData = new FormData();
  //pt a aduga file-ul
  formData.append("file", file);
  //pt a adauga textele
  formData.append("target", target);
  return formData;
}
const handleFileRemove = (target: "text1" | "text2") => {
  if (target === "text1") {
    setFileName1(undefined);
    setText1(""); // facultatif : vide aussi le champ
  } else {
    setFileName2(undefined);
    setText2(""); // facultatif
  }
};
const handleFileDrop = async (file: File, target: "text1" | "text2") => {
  if (!isValidTextFile(file)) {
  setError("Only PDF and Word documents are allowed.");
  return;
}
  const formData = buildFormData(file, target);
  const response = await fetch("/api/compare-file", {
    method: "POST",
    body: formData,
  }
);
if (target === "text1") {
    setFileName1(file.name);
  } else {
    setFileName2(file.name);
  }
  const data = await response.json();
  setSimilarity(data.similarity);
};

  // Comparaison des textes via l'API
  const handleCompare = async () => {
    setLoading(true);
    setError("");
    setSimilarity("");

    try {
      const response = await fetch("/api/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text1, text2 }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la comparaison");
      }

      const data = await response.json();
      setSimilarity(data.similarity);
    } catch (err: any) {
      setError(err.message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[8px_2fr_8px] items-center justify-items-center max-h-screen p-8 gap-16 sm:p-8">
      <main className="flex flex-col gap-[24px] row-start-2 items-center w-full max-w-screen-lg">
        {/* Champs de texte */}
        <TextInput
          text1={text1}
          text2={text2}
            fileName1={fileName1}
            fileName2={fileName2}
            onTextChange={handleTextChange}
            onFileDrop={handleFileDrop}
            onFileRemove={handleFileRemove}
        />

        {/* Bouton pour lancer la comparaison */}
        <Button
          onClick={handleCompare}
          label={loading ? "Comparaison en cours..." : "Comparer les deux textes"}
          disabled={loading}
        />

        {/* Résultat de la comparaison */}
        <TextSimilarity
          text1={text1}
          text2={text2}
          similarity={similarity}
          error={error}
          loading={loading}
        />

        {/* Navigation vers une autre page */}
        <Button
          onClick={() => router.push("/external-comparison")}
          label="Comparer avec sources externes"
        />
      </main>
    </div>
  );
}
