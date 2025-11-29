# 💻 Frontend: Interfaz POS de Pago de Propinas

Esta es la interfaz de usuario desarrollada con **Vue.js 3** y **TypeScript** para gestionar el proceso de pago y división de propinas.

El objetivo de esta interfaz es simular la experiencia de un Punto de Venta (POS), permitiendo al usuario ingresar montos, seleccionar el método de pago y dividir las propinas entre el personal.

**Nota:** Este frotn end usa directamente la url de conexion del api en codigo por simple praticicad lo mejor seria el uso de un .emv donde se declare la url y se acceda mediante codigo.

## 🌟 Tecnologías Utilizadas

- **Vue.js 3**: Framework principal para la interfaz de usuario (Composition API).
- **TypeScript**: Para tipado estricto en el desarrollo de componentes.
- **Tailwind CSS**: Utilizado para el diseño rápido y responsivo (clases utilitarias).
- **Vite**: Usado para la herramienta de construcción y el servidor de desarrollo local.

## 📁 Estructura del Proyecto

/frontend
├── node_modules/
├── src/
│   ├── components/         # Componentes reutilizables (Keypad, PaymentMethodSelector)
│   ├── views/              # Vistas principales (TipPaymentView.vue)
│   ├── services/           # Lógica de comunicación con el Backend (tip.service.ts)
│   ├── types/              # Definiciones de tipos (Tip.type.ts)
│   ├── App.vue             # Componente raíz
│   └── main.ts             # Inicialización de la aplicación Vue
├── package.json
└── README.md


## 🚀 Instalación y Ejecución

Para correr la aplicación de frontend, sigue estos pasos:

### Prerrequisitos

Asegúrate de que el [Backend](https://www.google.com/search?q=#-backend-gestión-de-propinas-simulación) esté corriendo en http://localhost:3000.

### Pasos de Configuración

1.  cd frontend
2.  npm install
3.  npm run dev

El frontend se iniciará en http://localhost:5173 (o un puerto similar, revisa la consola).

## 💡 Componentes Clave

1.  **TipPaymentView.vue (Vista Principal):**

    - Contiene toda la lógica del flujo de pago (manejo de estado, pagos, división).
    - Utiliza la **Composition API** (setup()) para la gestión de estados (ref, computed).
    - Gestiona la entrada del teclado numérico y valida que el monto a pagar no exceda el monto restante.
    - Simula las interacciones con el backend a través de tip.service.ts.

2.  **Keypad.vue (Componente):**

    - Teclado numérico reusable para ingresar la cantidad de pago.
    - Emite un evento (update:value) por cada tecla presionada.

3.  **PaymentMethodSelector.vue (Componente):**

    - Permite seleccionar el método de pago (Efectivo, Tarjeta, etc.).
    - Utiliza v-model para la selección reactiva del método.
