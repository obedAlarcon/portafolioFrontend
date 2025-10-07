# Portafolio

Proyecto **frontend** desarrollado con **Angular 17.2.0**, conectado a un **backend Express (CertiRed)** que corre en el puerto `5000`.

---

## 🚀 Instalación

1. Clona el repositorio o descarga el proyecto.
2. Instala las dependencias necesarias:

   ```bash
   npm install
   ```

---

## 🖥️ Servidor de desarrollo

Ejecuta el siguiente comando para iniciar el servidor local:

```bash
ng serve
```

Luego abre tu navegador en:

```
http://localhost:4200/
```

La aplicación se recargará automáticamente cada vez que modifiques un archivo fuente.

---

## 🔗 Conexión con el backend

El backend (API de **CertiRed**) debe estar corriendo en:

```
http://localhost:5000
```

Documentación interactiva de la API (Swagger):

```
http://localhost:5000/api-docs
```

Asegúrate de tener ambos servidores (frontend y backend) ejecutándose para que la comunicación funcione correctamente.

---

## ⚙️ Compilación para producción

Para generar una versión lista para producción, ejecuta:

```bash
ng build
```

Los archivos se guardarán en la carpeta `dist/`.

---

## 🧩 Generar nuevos componentes

Puedes generar nuevos componentes, servicios o módulos con los siguientes comandos:

```bash
ng generate component nombre-componente
ng generate service nombre-servicio
ng generate module nombre-modulo
```

---

## 🧪 Pruebas

Ejecuta las pruebas unitarias:

```bash
ng test
```

Ejecuta pruebas end-to-end:

```bash
ng e2e
```

---

## 📘 Más información

Para más ayuda sobre Angular CLI, ejecuta:

```bash
ng help
```

O visita la documentación oficial:
[https://angular.io/cli](https://angular.io/cli)
