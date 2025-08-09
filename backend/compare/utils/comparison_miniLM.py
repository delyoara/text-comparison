from sentence_transformers import SentenceTransformer, util
from compare.utils.chunking import chunk_article
from compare.utils.embedding import encode_chunks


# Chargement du modèle
model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

# pour lire un texte depuis un fichier
def read_text(path):
    with open(path, "r", encoding="utf-8") as f:
        return f.read()

# Fonction pour comparer deux textes
def compare_texts(path1, path2):
    
    text1 = read_text(path1)
    text2 = read_text(path2)

    chunks1 = chunk_article(text1)
    chunks2 = chunk_article(text2)

    emb1 = encode_chunks(chunks1)
    emb2 = encode_chunks(chunks2)

    score = util.cos_sim(emb1, emb2)
    print(f"Similarité : {score.item():.4f}")


# Fonction alternative pour encoder un article entier par paragraphes
def encode_article(article_text):
    # découpage simple ...
    paragraphs = article_text.split("\n\n") 
    embeddings = model.encode(paragraphs, convert_to_tensor=True)
    doc_embedding = embeddings.mean(dim=0)
    return doc_embedding
