# Guía para exponer tu servidor y cliente con Ngrok

Para que tus clientes o personas externas puedan probar tu aplicación, necesitas exponer tanto el **Servidor** (API) como el **Cliente** (React) a internet usando Ngrok.

Sigue estos pasos cuidadosamente:

## 1. Instalar Ngrok
Si no lo tienes, descárgalo en [ngrok.com](https://ngrok.com/download) e instálalo.

## 2. Exponer el Servidor (API)
1. Abre una nueva terminal.
2. Ejecuta el siguiente comando para exponer el puerto 5000:
   ```powershell
   ngrok http 5000
   ```
3. Ngrok te mostrará una URL pública, por ejemplo: `https://abcd-123-456.ngrok-free.app`.
   **Copia esta URL.** (Esta es tu URL del servidor).

## 3. Configurar y Arrancar el Cliente
El cliente necesita saber cuál es la URL pública de tu servidor para poder conectarse.

1. Ve a la carpeta `client`:
   ```powershell
   cd client
   ```
2. Crea (o edita) un archivo llamado `.env.local` en la carpeta `client`.
3. Agrega la siguiente línea, pegando la URL que copiaste en el paso anterior:
   ```env
   REACT_APP_API_URL=https://abcd-123-456.ngrok-free.app
   ```
   *(Asegúrate de no poner espacios extra).*

4. Inicia el cliente:
   ```powershell
   npm start
   ```

## 4. Exponer el Cliente (Para compartir)
Ahora tu cliente está corriendo localmente en el puerto 3000 y apuntando al servidor público. Para que otros lo vean:

1. Abre **otra** terminal nueva.
2. Ejecuta:
   ```powershell
   ngrok http 3000
   ```
3. Copia la URL que te da Ngrok (ej. `https://client-xyz.ngrok-free.app`).
4. **¡Comparte esta URL con tus clientes!**

---

### Resumen
- Terminal 1: `ngrok http 5000` (Servidor) -> Copiar URL a `.env.local` del cliente.
- Terminal 2: `npm start:server` (Tu servidor local debe estar corriendo).
- Terminal 3: `npm start` (Cliente configurado con la URL de ngrok).
- Terminal 4: `ngrok http 3000` (Cliente público) -> Enviar URL al cliente.

> **Nota importate**: Cada vez que cierres ngrok, la URL cambiará, así que tendrás que actualizar el archivo `.env.local` del cliente con la nueva URL del servidor.
