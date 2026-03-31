# 🍺 BREW — Cervecería Artesanal (Digital Experience)

Plataforma full-stack moderna para la gestión y exhibición de catálogo de una cervecería artesanal. Diseñada con una estética "Dark & Craft" (premium, oscura, con acentos color ámbar/dorado).

El sistema consta de dos partes principales que conviven en un monorepo:
1. **Frontend (Sitio Público + Panel Admin):** Construido con Next.js 14, Tailwind CSS y Framer Motion.
2. **Backend (API + Base de Datos):** Construido con NestJS, Prisma ORM y SQLite (listo para migrar a PostgreSQL en producción).

---

## 🚀 Requisitos Previos

Para correr este proyecto en tu computadora de desarrollo solo necesitas:
- **Node.js** (Versión 22 o superior LTS).
- _No necesitas instalar bases de datos gigantes ni Docker para arrancar, ya trae todo listo usando SQLite._

---

## ⚙️ Instalación Rápida (Windows)

Si es la primera vez que abrís el proyecto, podés instalar todo de una vez haciendo doble clic en el archivo `setup.bat` que está en la carpeta raíz. Ese script:
1. Instala las dependencias principales.
2. Instala el backend.
3. Prepara la base de datos y le carga datos de prueba (cervezas, platos, usuario admin).
4. Instala el frontend.

---

## 🏃 Cómo arrancar el proyecto

El proyecto requiere que **el backend y el frontend corran al mismo tiempo**. Para esto, debes abrir **dos terminales diferentes**.

### Terminal 1: Iniciar la API (Backend)
```bash
cd apps/api
npm run dev
```
_La API quedará corriendo en el puerto 3001._

### Terminal 2: Iniciar la Web (Frontend)
```bash
cd apps/web
npm run dev
```
_La página web quedará corriendo en el puerto 3000._

---

## 🔗 Enlaces Importantes

Una vez que ambos servidores están corriendo, podés acceder a:

| Sistema | URL | Descripción |
|---------|-----|-------------|
| 🌐 **Sitio Web BREW** | [http://localhost:3000](http://localhost:3000) | La página pública que ven los clientes. |
| 🎛️ **Admin Login** | [http://localhost:3000/admin](http://localhost:3000/admin) | Pantalla de inicio de sesión para el staff. |
| 🔧 **API REST (Raíz)** | [http://localhost:3001/api](http://localhost:3001/api) | Enlace base de los endpoints del backend. |
| 📖 **Documentación Swagger** | [http://localhost:3001/api/docs](http://localhost:3001/api/docs) | Documentación interactiva de la API (ver más abajo). |

### 🔐 Credenciales del Panel de Administración
Para entrar al Dashboard ([localhost:3000/admin](http://localhost:3000/admin)), usá:
- **Email:** `admin@brew.com`
- **Contraseña:** `brew-admin-2026`

---

## 🧠 Entendiendo la Arquitectura

### 1. El Frontend (Next.js)
Ubicado en `apps/web`. Es un sitio web de alto rendimiento.
- **Renderizado Híbrido:** Usa componentes de cliente (`'use client'`) para interactividad (filtros, buscador) y comunicación directa con la API para traer siempre los datos frescos.
- **Framer Motion:** Maneja las animaciones suaves, el efecto "parallax" del inicio, las ventanitas flotantes (modales) y el movimiento de las barras medidoras (Beer-O-Meter).
- **Tailwind CSS:** Se configuraron variables personalizadas de colores (ej. `brew-gold`, `brew-bg`) en el `tailwind.config.ts` para mantener la estética oscura.

### 2. El Backend (NestJS)
Ubicado en `apps/api`. Es un servidor robusto y ordenado en "módulos":
- `AuthModule`: Se encarga del login. Toma un email y contraseña, lo compara con la base de datos, y si todo está bien, genera un "ticket" seguro llamado **Token JWT**.
- `BeersModule / FoodModule`: Son los controladores que permiten Crear, Leer, Actualizar y Eliminar (CRUD) cervezas y platos. Los endpoints para "Leer" son públicos, pero los de modificar **requieren el token JWT**.
- `HappyHourModule`: Un sistema que lee la hora actual del servidor y decide si hay descuentos activos.

### 3. La Base de Datos (Prisma + SQLite)
El archivo `apps/api/prisma/schema.prisma` define cómo se guardan los datos. Prisma traduce ese esquema para crear una base de datos local en el archivo `dev.db`. Para ver tus datos crudos, podés correr:
```bash
cd apps/api
npx prisma studio
```
Esto abrirá una página web oficial de Prisma para ver las tablas.

---

## 📖 Qué es Swagger y cómo usarlo

En [http://localhost:3001/api/docs](http://localhost:3001/api/docs) vas a encontrar **Swagger**. Es una herramienta que lee el código de NestJS y genera una página visual con todos los endpoints (rutas) que tiene tu API.

**¿Para qué sirve?**
1. **Documentación:** Si mañana un desarrollador de apps móviles quiere hacer la App de celular de BREW, mira esta página para saber qué datos le tiene que pedir al servidor.
2. **Pruebas (Testeo directo):** En lugar de usar programas complejos como Postman, podés probar tu API directamente desde acá.
   - Hacés clic en `GET /api/beers`.
   - Clic en el botón "Try it out".
   - Clic en "Execute".
   - ¡Te muestra el JSON exacto que devuelve la base de datos!
3. **Probar operaciones bloqueadas:**
   - Primero usás `POST /api/auth/login` con tus credenciales y copias el `access_token` que te devuelve.
   - Subís arriba del todo, hacés clic en el botón verde **"Authorize"** y pegás el token.
   - ¡Listo! Ahora podés probar enviar un POST para crear una cerveza desde Swagger.

---

## 🛠 Funcionalidades Clave (Highlights)

- **Happy Hour Engine Automático:** El admin configura de qué hora a qué hora hay descuento, y los días de la semana. El sitio web consulta esto en vivo; si la hora del reloj coincide, automáticamente aparece el banner de descuento en la página de inicio.
- **Gestión Visual (Stock y Estrella):** Desde el Dashboard podés apagar el switch de "En Canilla" y la cerveza automáticamente aparece como "SOLD OUT" opaca en la web. Si prendés "Más Vendida", le aparece una medallita dorada "Top".
- **Sistema de Maridaje:** Al cargar comida, el sistema permite asociarla con una cerveza específica elegida.
- **Seguridad JWT:** Nadie puede borrar ni agregar productos sin iniciar sesión, ya que los endpoints están custodiados por `JwtAuthGuard`.

##
Email:    admin@brew.com
Password: brew-admin-2026
##

-----------------------------

¿Cómo podés vender esta página y cómo va a funcionar?
Es una pregunta excelente. Lo que tenés entre manos es una aplicación "Full Stack" profesional (está separada en dos piezas como las grandes empresas), y eso le da mucho valor.

1. ¿Cómo funciona la interacción de tu cliente (el dueño del bar)?
A tu cliente le vas a entregar una URL (por ejemplo, cerveceria-brew.com). Su única obligación va a ser entrar a cerveceria-brew.com/admin e iniciar sesión con un usuario y contraseña.

Ahí entra al Dashboard (Back-office) que estuvimos arreglando:

Cada vez que hagan clic en "Guardar", el frontend le envía esos datos al Backend (la API).
El Backend valida todo, guarda la foto en su disco y actualiza la Base de Datos.
Luego, cuando un cliente habitual del bar entra desde su celular a la página principal (Front-end), el Front se comunica con el Backend pidiéndole las cervezas: todo se actualiza en tiempo real de forma instantánea sin que vos o tu cliente toquéis una sola línea de código.
2. ¿Dónde y cómo se despliega (Deploy)?
Al estar tu proyecto dividido en una arquitectura monorepo (usando Turborepo, Next.js y NestJS), la forma estándar y más robusta de subir esto a producción es separando los entornos:

El Front-end (La web pública y el admin panel): Esto lo desplegás gratis usando Vercel o Netlify. Contectás tu repositorio de GitHub, le decís que despliegue la carpeta apps/web y se hace instantáneamente. Es rapidísimo.

La Base de Datos: Podés usar Supabase o Neon.tech. Te van a dar gratis una conexión a base de datos PostgreSQL en la nube. Esa es la URL que pondrás en tu archivo .env.

El Back-end (La API Node/NestJS): Lo alojás en Render (render.com) o Railway. Esto recibe los ataques de red y procesa la info y guarda las cosas en la base de datos de Neon.

⚠️ Detalle crítico de las fotos (Disco): Actualmente, la API guarda las fotos que sube tu cliente en una carpeta interna llamada uploads. En la nube (servidores de Vercel/Render gratuitos), cada vez que el servidor se reinicia, las carpetas locales se borran. Cuando vayas a desplegarlo en serio, hay que modificar mínimamente la parte de "Upload" para que las fotos se suban a un servicio como Cloudinary o AWS S3 (tienen niveles gratuitos generosos) para que nunca se pierdan. La otra opción es subir el backend entero a un VPS ($5 dólares mensuales en DigitalOcean) donde el disco es tuyo y no se borra. yo te puedo ayudar con cualquier paso que elijas.

3. El Modelo de Negocio (Cómo venderlo)
Típicamente tenés dos caminos con este tipo de desarrollo web a medida:

Venta Única (Ticket Alto): Le cobrás un precio fuerte por "hacerle el sistema y la página" (ej. $500 - $1,500 USD). Todo queda a nombre de él y le cobrás un extra puntual si se rompe algo en el año.
SaaS o "Sitio como Servicio" (El mejor para vos): A tu cliente no le cobrás el desarrollo de golpe, o le cobrás un setup mínimo. Pero le ponés una cuota fija mensual de mantenimiento y hosting (por ej. $30 - $70 USD al mes). Él se olvida de dominios, de caídas de servidor y de actualizaciones técnicas, porque de todo eso te encargás vos. Al tener tu sistema modular, ¡podés re-venderle esta exacta base de código a 10 cervecerías del país solo cambiándole los colores (con Tailwind) y el logo!