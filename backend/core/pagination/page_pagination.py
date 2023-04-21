import math

from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response


class UserPagePagination(PageNumberPagination):
    page_size = 50
    page_size_query_param = 'size'

    def get_paginated_response(self, data):
        count = self.page.paginator.count
        total_pages = math.ceil(count / self.get_page_size(self.request))
        return Response({
            'total_items': count,
            'total_pages': total_pages,
            'prev_page': self.get_previous_link(),
            'next_page': self.get_next_link(),
            'data': data
        })


class OrderPagePagination(PageNumberPagination):
    page_size = 25
    page_size_query_param = 'size'

    def get_paginated_response(self, data):
        count = self.page.paginator.count
        total_pages = math.ceil(count / self.get_page_size(self.request))
        return Response({
            'total_items': count,
            'total_pages': total_pages,
            'prev_page': self.get_previous_link(),
            'next_page': self.get_next_link(),
            'data': data
        })


class ServicePagePagination(PageNumberPagination):
    page_size = 5
    page_size_query_param = 'size'

    def get_paginated_response(self, data):
        count = self.page.paginator.count
        total_pages = math.ceil(count / self.get_page_size(self.request))
        return Response({
            'total_items': count,
            'total_pages': total_pages,
            'prev_page': self.get_previous_link(),
            'next_page': self.get_next_link(),
            'data': data
        })
