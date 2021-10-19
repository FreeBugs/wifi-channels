#!/usr/bin/env python

import sys
from io import open

import jsonpickle

from dbparse import DBParser

if len(sys.argv) < 3:
    print('Usage: %s output-file input-file [key-file]' % sys.argv[0])
    sys.exit(2)


p = DBParser()
countries_in = p.parse(open(sys.argv[2], 'r', encoding='utf-8'))
countries = {c.decode(): countries_in[c] for c in countries_in.keys()}

jsonpickle.set_encoder_options('simplejson', sort_keys=True, indent=4)
json = jsonpickle.encode(countries, unpicklable=False)
output = open(sys.argv[1], mode='w', encoding='utf-8')
output.write(json)
output.close()
