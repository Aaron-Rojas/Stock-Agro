# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

# Agro Kiosko - Sistema de Accesibilidad Agrícola

Este proyecto es un kiosk digital inteligente enfocado en la accesibilidad para usuarios rurales o adultos mayores en el sector agrícola.

## 🚀 Funcionalidad: Modal Gigante de Confirmación y Retroalimentación por Voz

### Propósito
Facilitar el uso del kiosko digital por parte de adultos mayores y personas con dificultades de visión a través de dos mecanismos de accesibilidad simultáneos al presionar cualquier tecla numérica:
1. **Confirmación Visual (Modal Gigante con Escalado Dinámico):** Se despliega un modal superpuesto de pantalla completa que indica con tipografía gigante (cuyo tamaño de letra se escala dinámicamente según la preferencia del usuario en Normal, Grande o Extra Grande) el número presionado y el destino correspondiente utilizando expresiones muy amigables y cercanas (lenguaje común).
2. **Confirmación Auditiva (Síntesis de Voz):** El altavoz pronuncia inmediatamente el dígito presionado ("Cero", "Uno", "Dos", etc.).

### 🚨 Botón de Pánico (Tecla 0)
La tecla `0` funciona como el **Botón de Pánico / Retorno Seguro**. Al ser presionada, el modal de accesibilidad adopta una estética especial de máxima prioridad visual:
- Fondo de color rojo vibrante y bordes gruesos de advertencia.
- Animación de parpadeo continuo para captar la atención.
- Íconos gigantes de alerta (`🚨`) y mensaje descriptivo especial en lenguaje común: *"¡AYUDA! Presionaste regresar (Número 0). No te preocupes, te estamos llevando de vuelta al inicio de forma segura. ¡Espera un momento!"*.

### Implementación y Retraso Técnico
Para permitir que el usuario lea pausadamente el modal gigante en lenguaje común y que la API de síntesis de voz (`SpeechSynthesis`) enuncie el dígito completo antes de que la nueva página limpie el búfer de audio, se ha implementado un retraso técnico de **3 segundos (3000ms)** tras presionar cualquier tecla numérica.

### Comandos de Ejecución

Para iniciar el entorno de desarrollo:
```bash
npm install
npm start
```

---

## 🛠️ Buenas Prácticas de Escalabilidad

Para llevar este módulo de accesibilidad al siguiente nivel en futuras fases del proyecto:

1. **Detección de Foco en Inputs:**
   Actualmente, el listener de teclado captura las entradas numéricas globales. Es crucial refactorizar el código para desactivar el cambio de pantallas o el anuncio oral cuando un elemento de texto o entrada de datos (como el input de hectáreas en `Calculadora.jsx`) esté activamente enfocado, evitando interferencias en la experiencia de usuario.

2. **Mecanismo de Colas (Queue) en `SpeechSynthesis`:**
   Implementar una cola secuencial robusta para evitar el uso excesivo de `.cancel()`. De esta manera, los anuncios del número presionado y los mensajes de bienvenida de la nueva página se reproducirán de forma armoniosa y ordenada.


