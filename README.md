# Prueba técnica || Desarrollador React + Laravel

Este repositorio contiene un proyecto de **Laravel** con **React.js** y gestionado por **Laravel Sail** (Docker). A continuación encontrarás instrucciones detalladas para clonar el repositorio y levantar el entorno de desarrollo en tu máquina local.

---

## 📋 Prerrequisitos

Antes de comenzar, asegúrate de tener instalado y configurado en tu sistema:

* **Git** (para clonar el repositorio)
* **Composer** (CLI de PHP para dependencias)
* **Docker** y **Docker Compose** (requerido por Laravel Sail)
* **Node.js** y **npm** (gestión de paquetes y compilación de assets)

---

## 🚀 Pasos para levantar el proyecto

1.

### Clonar el repositorio

```bash
git clone https://github.com/franciscoH95/gux-task-project.git
cd gux-task-project
```

2.

### Copiar y configurar el entorno

```bash
cp .env.example .env
```

Edita el archivo `.env` y revisa las siguientes variables:

```dotenv
APP_NAME=Laravel
APP_ENV=local
APP_URL=http://localhost

# Conexión MySQL para Sail
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=sail
DB_PASSWORD=password
```

3.

### Instalar dependencias PHP

Con Composer instalado globalmente, ejecuta:

```bash
composer install
```

4.

### Levantar Sail (Docker)

```bash
./vendor/bin/sail up
```

5.

### Generar clave de aplicación

```bash
./vendor/bin/sail artisan key:generate
```

Esto iniciará contenedores para:

* **app** (PHP + Nginx y React)
* **mysql** (base de datos)

6.

### Instalar dependencias JS y compilar assets

En otra terminal, ejecuta:

```bash
./vendor/bin/sail npm install
./vendor/bin/sail npm run dev
```

7.

### Migrar y sembrar la base de datos

```bash
./vendor/bin/sail artisan migrate
```

8.

### Acceder a la aplicación

Abre tu navegador en:

```
http://localhost
```

Deberías ver la pantalla de bienvenida.

---

## 🔧 Comandos útiles

* **Detener contenedores**:

  ```bash
  ./vendor/bin/sail down
  ```

* **Ver logs de Laravel**:

  ```bash
  ./vendor/bin/sail artisan log:tail
  ```

* **Reconstruir contenedores** (por cambios en Dockerfile):

  ```bash
  ./vendor/bin/sail build --no-cache
  ./vendor/bin/sail up -d
  ```

* **Acceder al contenedor PHP**:

  ```bash
  ./vendor/bin/sail shell
  ```

---

## 🛠️ Solución de problemas

* Si `./vendor/bin/sail` no existe, asegúrate de haber corrido `composer install` y que exista la carpeta `vendor/`.
* Si MySQL no arranca en el puerto 3306, revisa el mapeo en `docker-compose.yml` y ajusta `DB_PORT` en `.env`.
* Para problemas de permisos, verifica que tu usuario tenga acceso a Docker o añade tu usuario al grupo `docker`.

---
