from django.urls import path, include
from storm import views
import xadmin
app_name = 'index1'
urlpatterns = [
    #path('xadmin/', xadmin.site.urls),
    path('', views.index),

]
