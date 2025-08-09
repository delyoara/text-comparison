
from chonkie import RecursiveChunker

chunker = RecursiveChunker()

def chunk_article(text):
    """
    Découpage du texte en chunks adaptés au modèle.
    """
    chunks = chunker(text)
    return [chunk.text for chunk in chunks]