
from sentence_transformers import SentenceTransformer

# Chargement du modèle
model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

# docstring
def encode_chunks(chunks):
    """
    Encode une liste de textes (chunks) et retourne l'embedding moyen.
    """
    embeddings = model.encode(chunks, convert_to_tensor=True)
    return embeddings.mean(dim=0)
