import json

# Leer el archivo actual
with open(r'c:\Users\joshy\OneDrive\Sharp official\sharp-oficial\server\src\data\products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Nuevo producto
new_product = {
    "id": 26,
    "name": "Cinturón Dr. Martens Red Smooth con Costuras Amarillas",
    "price": 650,
    "style": "Heritage / Bold / Statement",
    "size": "One Size",
    "color": "Red Smooth / Yellow Stitch",
    "brand": "Dr. Martens",
    "imageUrls": [
        "/images/ModeloCinturonRojo.jpg"
    ],
    "offers": [],
    "description": "📸 Descripción Profesional Destacada: Cinturón Dr. Martens Red Smooth (Color Vibrante con Costura Amarilla Icónica)\nPresentamos una pieza audaz y llena de personalidad. Este cinturón Dr. Martens en color rojo vibrante combina el ADN clásico de la marca con un tono llamativo que no pasa desapercibido. Es el accesorio perfecto para quienes buscan hacer una declaración de estilo con cada outfit.\n\nEste cinturón representa la rebeldía cromática:\n\nColor Impactante: Confeccionado en cuero rojo intenso (Red Smooth), un tono vibrante y llamativo que añade un pop de color instantáneo a cualquier look.\n\nCostura Icónica: Presenta el legendario pespunte amarillo perimetral de Dr. Martens, creando un contraste visual espectacular que define el ADN de la marca. Esta costura amarilla resalta dramáticamente sobre el cuero rojo.\n\nMaterial Premium: Fabricado en el renombrado cuero Smooth de Dr. Martens, conocido por su durabilidad extrema, resistencia al desgaste y capacidad de desarrollar una hermosa pátina con el uso.\n\nConstrucción Robusta: Doble hilera de ojales metálicos reforzados que garantizan un ajuste seguro y duradero. Hebilla rectangular de metal cromado plateado que ofrece un acabado pulido y profesional.\n\nDetalles de Autenticidad: Logo \"Dr. Martens AirWair\" grabado en relieve en la presilla de cuero, confirmando su origen genuino y calidad superior.\n\nPresentación: Incluye su etiqueta original kraft característica de la marca, perfecta para regalo o colección.\n\nIdeal para: Outfits que necesitan un toque de color, estilo Rockabilly, looks vintage, punk colorido, o para quienes buscan romper con la monotonía del negro total. Combina perfectamente con jeans claros, pantalones negros o cualquier atuendo que necesite un punto focal vibrante.\n\nEstado: Nuevo con etiquetas. Una pieza statement que define tu personalidad.",
    "slug": "cinturon-dr-martens-red-smooth-costuras-amarillas"
}

# Agregar el nuevo producto
products.append(new_product)

# Guardar el archivo
with open(r'c:\Users\joshy\OneDrive\Sharp official\sharp-oficial\server\src\data\products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Producto agregado exitosamente. Total de productos: {len(products)}")
