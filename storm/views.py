from django.shortcuts import render


# Create your views here.
def index(request):
    print("函数执行了")
    return render(request, 'index.html')
