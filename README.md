# Backend de ecommerce-VJL

**Instalación y ejecución en local**

- clonar el repo

- npm install

- npm run dev

# Problema encontrado:

- Vienen dos registros con el mismo id desde la fuente de la información, el front se comporta como si fuera un solo registro.
- El componente React-Paginate se comporta mal ante alguna situación particular pero esta presentable y 100% funcional.

# Comentarios:

- Hice algunos cambios en que y como se muestra la información para ser mas consistente con el diseño y la experiencia de usuario.

# Stack que se uso:

- Nextjs para performance y soporte de SSR que solventa una falencia de la libreria de React
- "axios": "^1.6.8", para hacer fetching. Popularidad.
- "tailwindcss": "^3.3.0", popular framework de css
- "@headlessui/react": "^1.7.18", se complementa bien con tailwind para manejar transiciones
- "@heroicons/react": "^2.1.3", iconos libres
- "typescript": "^5", mejora un poco posibles errores en el front por tema de datos "@reduxjs/toolkit": "^2.2.3", popular manejador de estados, lo use porque se solicito "eslint": "^8", revision de codigo y algo de formateo
