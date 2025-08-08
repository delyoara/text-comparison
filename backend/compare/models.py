from django.db import models

# Create your models here.
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("paraphrase-multilingual-MiniLM-L12-v2")

emb1 = model.encode("Bonjour tout le monde", convert_to_tensor=True)
emb2 = model.encode("Hello world", convert_to_tensor=True)

score = util.cos_sim(emb1, emb2)
print("Similarité :", score.item())
