import json

# Leer el archivo actual
with open(r'c:\Users\joshy\OneDrive\Sharp official\sharp-oficial\server\src\data\products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Buscar el producto "Cartera / Billetera de Cuero con Cadena Dr. Martens" (ID 23)
for product in products:
    if product['id'] == 23 and "Billetera de Cuero con Cadena" in product['name']:
        # Agregar el modelUrl
        product['modelUrl'] = '/models/carterared.glb'
        print(f"Modelo 3D agregado al producto: {product['name']}")
        break

# Guardar el archivo
with open(r'c:\Users\joshy\OneDrive\Sharp official\sharp-oficial\server\src\data\products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Archivo actualizado exitosamente")
