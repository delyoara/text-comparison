export default function TextSimilarity({
  text1,
  text2,
  similarity,
  error,
  loading,
}: {
  text1: string;
  text2: string;
  similarity: string;
  error: string;
  loading: boolean;
}) {
  return (
    <div className="mt-4 text-center">
      {loading && <p>Comparaison en cours...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {similarity && <p className="text-green-600">Similarité : {similarity}</p>}
    </div>
  );
}
