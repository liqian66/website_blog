from django.db import models
from django.conf import settings
from django.shortcuts import reverse

import markdown
import re

"""由于 Article 表包含外键与多对多关系，因此首先应当建立另外两个表：

分类（Category）表的创建：

由于 Category 分类表包含外键，因此首先需要创建导航菜单表 Bigcategory"""

"""
# 网站导航栏菜单分类表

class BigCategory(models.Model):
    # 导航名称
    name = models.CharField('文章大分类', max_length=20)
    # 用作文章的访问路径，每篇文章有独一无二的标识，下同
    slug = models.SlugField(unique=True)

    # 分类页描述
   # description = models.TextField('描述', max_length=240, default=settings.SITE_DESCRIPTION,
     #                              help_text='用来作为SEO中description,长度参考SEO标准')

    # 分类页关键字(keywords)
    keywords = models.TextField('关键字', max_length=240, default=settings.SITE_KEYWORDS,
                                help_text='用来作为SEO中keywords,长度参考SEO标准')

    class Meta:
        verbose_name = '大分类'
        verbose_name_plural = verbose_name

    def __str__(self):
        return self.name

# 导航栏，分类下的下拉菜单分类
    class Category(models.Model):

        # 分类名字
        name = models.CharField('文章分类', max_length=20)
        # slug 用作分类路径，对一无二
        slug = models.SlugField(unique=True)
        # 分类栏目页描述
       # description = models.TextField('描述', max_length=240, default=settings.SITE_DESCRIPTION,
        #                             help_text='用来作为SEO中description,长度参考SEO标准')

        对应导航菜单外键
       
        bigcategory = models.ForeignKey(BigCategory, verbose_name='大分类')
        
        class Meta:
            verbose_name = '分类'
            verbose_name_plural = verbose_name
            ordering = ['name']

        def __str__(self):
            return self.name

        def get_absolute_url(self):
            return reverse('blog:category', kwargs={'slug': self.slug, 'bigslug': self.bigcategory.slug})

        def get_article_list(self):
            return Article.objects.filter(category=self)

"""