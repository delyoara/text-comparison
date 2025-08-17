from django.db import models

# Create your models here
#
class Paragraph(models.Model):
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.content[:70] + "..."

    class Meta:
        db_table = 'paragraph'


class Article(models.Model):
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=150, blank=True, null=True)
    source = models.CharField(max_length=150, default='local')
    content = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    class Meta:
        db_table = 'article'


class Similarity(models.Model):
    article = models.ForeignKey(
        Article,
        on_delete=models.CASCADE,
        related_name="similarities"
    )
    paragraph = models.ForeignKey(
        Paragraph,
        on_delete=models.CASCADE,
        related_name="similarities"
    )
    score = models.FloatField()
    compared_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Similarité {self.score:.4f} entre '{self.article.title}' et paragraphe #{self.paragraph.id}"

    class Meta:
        db_table = 'similarity'
