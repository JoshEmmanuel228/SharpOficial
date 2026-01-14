import json

# Leer el archivo actual
with open(r'c:\Users\joshy\OneDrive\Sharp official\sharp-oficial\server\src\data\products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Buscar el producto "Cinturón Dr. Martens Doble Hebilla Industrial" (ID 20)
for product in products:
    if product['id'] == 20 and "Doble Hebilla Industrial" in product['name']:
        # Agregar el modelUrl
        product['modelUrl'] = '/models/cinturondosollos.glb'
        print(f"Modelo 3D agregado al producto: {product['name']}")
        break

# Guardar el archivo
with open(r'c:\Users\joshy\OneDrive\Sharp official\sharp-oficial\server\src\data\products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print("Archivo actualizado exitosamente")
