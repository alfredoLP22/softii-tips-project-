# **💸 Backend: Gestión de Propinas (Simulación)**

Este es el backend simulado para la aplicación de gestión de pago de propinas, desarrollado con **Node.js** y **Express.js**.

**Nota:** Este backend simula la lógica de negocio y la persistencia de datos (usando un almacenamiento en memoria), tal como se requeriría en un entorno de producción, pero sin una base de datos real.

## **🌟 Tecnologías Utilizadas**

- **Node.js**: Entorno de ejecución.
- **Express.js**: Framework para el servidor web.
- **TypeScript**: Para código tipado y escalable.

## **📁 Estructura del Proyecto**

/backend
├── node_modules/
├── src/
│   ├── routes/          # Define las rutas de la API (e.g., /api/tips)
│   ├── services/        # Contiene la lógica de negocio (e.g., tip.service.ts)
│   ├── models/          # Define la estructura de datos (e.g., Tip.model.ts)
│   ├── app.ts           # Configuración y arranque de Express
│   └── index.ts         # Punto de entrada de la aplicación (Inicia el servidor)
├── package.json
├── package-lock.json
└── README.md

## **🚀 Instalación y Ejecución**

Sigue estos pasos para levantar el servidor backend localmente:

### **Prerrequisitos**

Asegúrate de tener instalado [Node.js](https://nodejs.org/) (versión 18+) y npm.

### **Pasos de Configuración**

1.  **Clonar el repositorio:**git clone \[[URL-DEL-REPOSITORIO](https://github.com/alfredoLP22/softii-tips-project-.git)\]cd backend
2.  **Instalar dependencias:**npm install
3.  Compilar y ejecutar (en modo desarrollo):Usualmente, usarías ts-node o nodemon para desarrollo.npm run dev# O para producción:# npm run build && npm start

El servidor debería iniciarse en http://localhost:3000.

## **⚙️ Rutas de la API (Endpoints)**

**Método**

**Ruta**

**Descripción**

POST

/api/tips/start

Inicia un nuevo proceso de propinas, retorna el objeto Tip inicial.

GET

/api/tips/:tipId

Obtiene el estado actual de un proceso de propinas específico.

POST

/api/tips/:tipId/pay

Registra un pago parcial o total para la propina.

POST

/api/tips/:tipId/split

Actualiza la división (split) de la propina entre un número de personas.

POST

/api/tips/:tipId/reset

Reinicia el proceso de propinas.

### **Ejemplo: Registrar un Pago**

Endpoint: POST /api/tips/tip-session-1/pay

Cuerpo (Body):

{    "amount": 300.00,    "method": "Efectivo"}

**Respuesta Exitosa (200 OK):** Retorna el objeto Tip actualizado.

{    "id": "tip-session-1",    "totalAmount": 1500,    "splitCount": 5,    "amountPerPerson": 300,    "payments": \[        { "id": "16789...", "amount": 300, "method": "Efectivo", "date": "..." }    \],    "remainingAmount": 1200}
