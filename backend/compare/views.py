import json
from django.http import JsonResponse
from sentence_transformers import util
from compare.utils.chunking import chunk_article
from compare.utils.embedding import encode_chunks
from compare.models import Article, Paragraph
from django.views.decorators.csrf import csrf_exempt

# Comparaison entre deux textes ou art
@csrf_exempt
def compare_texts(request):
    if request.method != "POST":
        return JsonResponse({"error": "Méthode non autorisée"}, status=405)

    try:
        data = json.loads(request.body)
        text1 = data.get("paragraph1", "")
        text2 = data.get("paragraph2", "")

        if not text1 or not text2:
            return JsonResponse({"error": "Les deux textes sont requis"}, status=400)

        chunks1 = chunk_article(text1)
        chunks2 = chunk_article(text2)

        emb1 = encode_chunks(chunks1)
        emb2 = encode_chunks(chunks2)

        score = util.cos_sim(emb1, emb2)
        pourcentage = round(score.item() * 100, 2)
        return JsonResponse({"similarity": pourcentage})

# return JsonResponse({"similarity": round(score.item(), 4)})


    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)
# Comparaison entre un article et un paragraphe
def compare_article_paragraph(request):
    article_id = request.GET.get("article_id")
    paragraph_id = request.GET.get("paragraph_id")

    try:
        article = Article.objects.get(id=article_id)
        paragraph = Paragraph.objects.get(id=paragraph_id)
    except (Article.DoesNotExist, Paragraph.DoesNotExist):
        return JsonResponse({"error": "Article ou paragraphe introuvable."}, status=404)

    article_chunks = chunk_article(article.content)
    paragraph_chunks = chunk_article(paragraph.content)

    article_emb = encode_chunks(article_chunks)
    paragraph_emb = encode_chunks(paragraph_chunks)

    score = util.cos_sim(article_emb, paragraph_emb)
    return JsonResponse({"similarity": round(score.item(), 4)})
