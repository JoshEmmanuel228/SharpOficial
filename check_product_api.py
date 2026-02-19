import requests
import json

try:
    response = requests.get('http://localhost:5000/api/products/20')
    if response.status_code == 200:
        data = response.json()
        print("Image URLs served by API:")
        print(json.dumps(data.get('imageUrls'), indent=2))
    else:
        print(f"Error: {response.status_code}")
except Exception as e:
    print(f"Failed to connect: {e}")
