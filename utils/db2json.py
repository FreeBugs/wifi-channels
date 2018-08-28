#!/usr/bin/env python

from io import BytesIO, open
import struct
import hashlib
from dbparse import DBParser
import sys
import jsonpickle

if len(sys.argv) < 3:
    print('Usage: %s output-file input-file [key-file]' % sys.argv[0])
    sys.exit(2)

def create_rules(countries):
    result = {}
    for c in countries.values():
        for rule in c.permissions:
            result[rule] = 1
    return list(result)

def create_collections(countries):
    result = {}
    for c in countries.values():
        result[c.permissions] = 1
    return list(result)

p = DBParser()
countries = p.parse(open(sys.argv[2], 'r', encoding='utf-8'))

countrynames = list(countries)
countrynames.sort()

power = []
bands = []
rules = create_rules(countries)
rules.sort()
collections = create_collections(countries)
collections.sort()

jsonpickle.set_encoder_options('simplejson', sort_keys=True, indent=4)
json = jsonpickle.encode(countries, unpicklable=False)
output = open(sys.argv[1], mode='w', encoding='utf-8')
output.write(json)
output.close()
