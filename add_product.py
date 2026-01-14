import json

# Leer el archivo actual
with open(r'c:\Users\joshy\OneDrive\Sharp official\sharp-oficial\server\src\data\products.json', 'r', encoding='utf-8') as f:
    products = json.load(f)

# Nuevo producto
new_product = {
    "id": 25,
    "name": "Cinturón Dr. Martens Mono Black con Costuras Negras",
    "price": 650,
    "style": "Gothic / Minimalist / All Black",
    "size": "One Size",
    "color": "Black / Black Stitch",
    "brand": "Dr. Martens",
    "imageUrls": [
        "/images/ModeloCinturonNegroCn.jpg"
    ],
    "offers": [],
    "description": "📸 Descripción Profesional Destacada: Cinturón Dr. Martens Mono Black Total (Costuras Negras)\nPresentamos la expresión máxima del minimalismo rebelde. Este cinturón Dr. Martens lleva el concepto \"Mono\" a su forma más pura: un diseño totalmente negro donde incluso la icónica costura amarilla ha sido reemplazada por pespuntes negros, creando una silueta limpia, uniforme y absolutamente discreta.\n\nEste accesorio representa la elegancia de lo oscuro:\n\nEstilo Total Black: A diferencia de todos los modelos clásicos, este cinturón prescinde por completo del contraste de color. Las costuras negras sobre cuero negro crean un acabado monocromático perfecto para quienes buscan un look 100% oscuro.\n\nMaterial Premium: Confeccionado en el legendario cuero Smooth negro de Dr. Martens, conocido por su durabilidad extrema y su capacidad de mejorar con el uso.\n\nConstrucción Robusta: Doble hilera de ojales metálicos reforzados que garantizan resistencia y un ajuste preciso. Hebilla rectangular de metal cromado plateado que ofrece un sutil contraste sin romper la estética oscura.\n\nDetalles de Autenticidad: Logo \"Dr. Martens AirWair\" grabado en relieve en la presilla de cuero, confirmando su origen genuino.\n\nPresentación: Incluye su etiqueta original kraft característica de la marca, lista para regalo o colección.\n\nIdeal para: Outfits completamente negros (All Black), estilo Gótico, Darkwear, Minimalista o para quienes prefieren accesorios que pasen desapercibidos pero con la calidad inconfundible de Dr. Martens.\n\nEstado: Nuevo con etiquetas.",
    "slug": "cinturon-dr-martens-mono-black-costuras-negras"
}

# Agregar el nuevo producto
products.append(new_product)

# Guardar el archivo
with open(r'c:\Users\joshy\OneDrive\Sharp official\sharp-oficial\server\src\data\products.json', 'w', encoding='utf-8') as f:
    json.dump(products, f, indent=2, ensure_ascii=False)

print(f"Producto agregado exitosamente. Total de productos: {len(products)}")
