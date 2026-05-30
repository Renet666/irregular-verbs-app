from django.db import models

# Create your models here.

class Verbs(models.Model):
    infinitive = models.CharField(max_length=30, unique=True)
    past_simple = models.CharField(max_length=30, unique=True)
    past_participle = models.CharField(max_length=30, unique=True)
    definition= models.CharField(max_length=366, blank=True)
    translation = models.CharField(max_length=30, blank=True)
    level = models.CharField(max_length=2, default='C2')


    def __str__(self):
        return f'{self.infinitive}, {self.past_simple}, {self.past_participle}'
