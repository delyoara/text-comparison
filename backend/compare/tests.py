from django.test import TestCase

# Create your tests here.
import torch
from sentence_transformers import util
from compare.utils.embedding import encode_chunks
from compare.utils.chunking import chunk_article

def test_cos_sim_with_valid_embeddings():
    text1 = "Le chat dort sur le canapé."
    text2 = "Un félin est allongé sur le sofa."

    chunks1 = chunk_article(text1)
    chunks2 = chunk_article(text2)

    emb1 = encode_chunks(chunks1)
    emb2 = encode_chunks(chunks2)

    # Vérifie que les dimensions sont compatibles
    assert emb1.shape[1] == emb2.shape[1], "Dimensions incompatibles pour cos_sim"
    print("emb1 shape:", getattr(emb1, "shape", "No shape"))
    print("emb1:", emb1)
    # Calcul de la similarité
    score = util.cos_sim(emb1.mean(dim=0), emb2.mean(dim=0))

    # Vérifie que le score est dans l'intervalle attendu
    assert 0 <= score.item() <= 1, f"Score hors limites : {score.item()}"
