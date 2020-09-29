from PIL import Image
from pathlib import Path as p
import numpy as np
from cv2 import cv2

def dummy_image():
  """Load test image into memory"""
  file_name = p("test_image.jpg")
  script_dir = p(__file__).resolve().parent
  file_path = script_dir / file_name
  image = open(str(file_path), 'rb')
  return image

def dummy_user_input():
  """Make user input dict representative of json request"""
  user_input = {'limits': {'min': 0, 'max': 255},
                'sliders': [
                  {'id': 0, 'lowVal': 0, 'highVal': 50, 'enabled': True, 'colour': '#2B0D01'},
                  {'id': 1, 'lowVal': 50, 'highVal': 100, 'enabled': True, 'colour': '#612B09'},
                  {'id': 2, 'lowVal': 100, 'highVal': 200, 'enabled': True, 'colour': '#8C3D0E'},
                  {'id': 3, 'lowVal': 200, 'highVal': 255, 'enabled': True, 'colour': '#C76B0F'}],
                'minGap': 10,
                'data': {'width': 3000, 'time': 30, 'coinSize': 20.3},
                'errors': {},
                'backgroundColour': '#000000'}
  return user_input

def dummy_request():
  """Return a standard image and user input typical of a request from front-end"""
  user_input = dummy_user_input()
  image = dummy_image()
  
  return (image, user_input)

