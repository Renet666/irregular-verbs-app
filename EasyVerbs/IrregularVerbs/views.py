from django.shortcuts import render
import os
from .models import Verbs
from django.http import JsonResponse
from django.db.models import Q



def index(request):
    return render(request, 'IrregularVerbs/index.html')

def all_verbs(request):
    verbs = Verbs.objects.all().order_by('infinitive')
    return render(request, 'IrregularVerbs/irregular_verbs.html', {'verbs': verbs, 'header':'All Verbs'})


def beginner(request):
    verbs = Verbs.objects.all().filter(Q(level='A1') | Q(level='A2'))
    return render(request, 'IrregularVerbs/irregular_verbs.html', {'verbs': verbs, 'header':'Beginner Verbs'})

def intermediate(request):
    verbs = Verbs.objects.all().filter(Q(level='B1') | Q(level='B2'))
    return render(request, 'IrregularVerbs/irregular_verbs.html', {'verbs': verbs, 'header':'Intermediate Verbs'})

def advanced(request):
    verbs = Verbs.objects.all().filter(Q(level='C1') | Q(level='C2'))
    return render(request, 'IrregularVerbs/irregular_verbs.html', {'verbs': verbs, 'header':'Advanced Verbs'})