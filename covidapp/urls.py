from django.urls import path
from . import views

urlpatterns = [
    path('', views.home,name='home'),
    path('precautions/',views.precaution_view,name='precaution'),
    path('symptoms/',views.symptom_view, name ='Symptom'),
    path('map/',views.map_view, name = 'map'),
    path('feeds/',views.feed_view, name = 'feeds'),
    path('news/',views.news_view, name = 'news')
]
