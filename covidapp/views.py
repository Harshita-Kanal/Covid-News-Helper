from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.


def home(request):
    return render(request,'covidapp/home.html')

def precaution_view(request):
    return render(request,'covidapp/precautions.html')

def symptom_view(request):
    return render(request, 'covidapp/symptoms.html')

def map_view(request):
    return render(request, 'covidapp/index.html')

def feed_view(request):
    return render(request, 'covidapp/feeds.html')

def news_view(request):
    return render(request, 'covidapp/news.html')