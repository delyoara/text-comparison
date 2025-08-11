import os
from django.http import JsonResponse
from sentence_transformers import util
from compare.utils.chunking import chunk_article
from compare.utils.embedding import encode_chunks


def compare_texts(request):
    # Récupère les textes depuis l'URL si disponibles
    text1 = request.GET.get("text1", "")
    text2 = request.GET.get("text1_tradus", "")

    print(f"Text1: {text1[:100]}...")
    print(f"Text2: {text2[:100]}...")

    # Si les textes ne sont pas fournis, les lire depuis les fichiers
    if not text1:
        try:
            with open(os.path.join("data", "text1.txt"), "r", encoding="UTF-8") as f:
                text1 = f.read()
        except FileNotFoundError:
            return JsonResponse({"error": "Fichier text1.txt introuvable."}, status=400)

    if not text2:
        try:
            with open(os.path.join("data", "text1_tradus.txt"), "r", encoding="UTF-8") as f:
                text2 = f.read()
        except FileNotFoundError:
            return JsonResponse({"error": "Fichier text2.txt introuvable."}, status=400)

    # Traitement des textes
    chunks1 = chunk_article(text1)
    chunks2 = chunk_article(text2)

    emb1 = encode_chunks(chunks1)
    emb2 = encode_chunks(chunks2)

    score = util.cos_sim(emb1, emb2)
    return JsonResponse({"similarity": round(score.item(), 4)})
