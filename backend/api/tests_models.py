from django.test import TestCase
from api.models import Baby


class BabyTestCase(TestCase):
    def setUp(self):
        Baby.objects.create(name="Simon", born='2020-12-12')
        Baby.objects.create(name="Vera", born='2020-01-01')

    def test_baby_prints_name(self):
        """Babies print name when cast to string"""
        simon = Baby.objects.get(name="Simon")
        vera = Baby.objects.get(name="Vera")
        self.assertEqual(f"{simon}", 'Simon')
        self.assertEqual(f"{vera}", 'Vera')
