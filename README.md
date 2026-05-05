# Personal Expense Tracker o Gestor de Gastos personales

Aplicación web desarrollada con Next.js y TypeScript para la gestión de gastos personales. Permite registrar, visualizar y analizar gastos, proporcionando métricas e insights para mejorar la toma de decisiones financieras.

---
## 🚀 Features

* Crear, editar y eliminar gastos
* Persistencia de datos en localStorage / IndexedDB.
* Dashboard con métricas dinámicas
* Visualización de datos con gráficas
* Filtros por categoría, fecha y búsqueda
* UI responsive (mobile, tablet, desktop)

---

## 🧰 Tech Stack

* Next.js (App Router)
* React
* TypeScript
* TailwindCSS
* Zustand / Context API
* React Hook Form + Zod
* Recharts / Chart.js

---

## 📦 Instalación y ejecución

```bash
# Clonar repositorio
git clone https://github.com/mtxtecnologic0-lang/Gestor-Gastos.git

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev
```

La aplicación estará disponible en:
http://localhost:3000

---

##  Arquitectura

Estructura del proyecto:

/app
/dashboard
/expenses

/components
/ui
/charts
/expenses

/hooks

/lib

/store

/services

/types

### Principios aplicados:

* Separación de responsabilidades
* Componentes reutilizables
* Lógica desacoplada de la UI
* Tipado estricto con TypeScript

---

## 📊 Funcionalidades principales

### Dashboard

* Total gastado del mes
* Promedio diario
* Categoría con mayor gasto
* Número de transacciones
* Gráficas dinámicas
* Últimos gastos

### Página de gastos

* Listado paginado (máx 20)
* Orden por fecha DESC
* Filtros avanzados
* Búsqueda por descripción

---

# Potencial Integración de AI

## 🎯 Caso de uso

Se propone una funcionalidad de inteligencia artificial que permita analizar los gastos del usuario y generar recomendaciones personalizadas para optimizar su consumo.

---

## 1. 🧠 Diseño del workflow de AI

El sistema sigue un enfoque agentic, donde un agente coordina diferentes pasos para procesar la solicitud del usuario.

### Flujo:

1. El usuario solicita un análisis desde la interfaz
2. Se envía la solicitud a una API Route
3. Se detecta la intención del usuario
4. Un Planner Agent decide las acciones necesarias
5. Se obtienen los datos mediante `getExpenses`
6. Se procesan y estructuran los datos
7. Se analizan patrones de gasto
8. Se utiliza un LLM para generar insights y recomendaciones
9. Se formatea la respuesta
10. Se renderiza en el dashboard

Este patrón implementa un modelo Planner + Tools, donde el agente decide dinámicamente qué acciones ejecutar.

---

## 2. Integración con la arquitectura

La integración se realiza de la siguiente manera:

* **Frontend (Next.js)**

  * Dispara solicitudes
  * Renderiza resultados

* **API Routes**

  * Orquestan el flujo de AI
  * Manejan lógica del agente

* **Services**

  * `getExpenses` accede a datos persistidos

* **AI Layer**

  * Intent detection
  * Planner agent
  * Integración con LLM

Esto mantiene bajo acoplamiento y alta escalabilidad.

---

## 3. ⚙️ Manejo de estado, errores y latencia

### Estado

* Uso de estado global (Zustand / Context)
* Estado de loading durante llamadas AI
* Actualización reactiva del dashboard

### Errores

* Fallos en storage
* Fallos en procesamiento
* Timeout o error del LLM

Todos los errores:

* Se manejan en la API
* Retornan respuestas controladas
* Se reflejan en la UI

### Latencia

* Indicadores de carga (loading)
* UI no bloqueante

Posibles mejoras:

* caching
* procesamiento asíncrono
* streaming

---

## 📊 Diagrama del flujo agentic

Para que puedan visualizar el diagrama de flujo agentic les recomiendo ir a:(./docs/ai-workflow.svg)
Dentro del proyecto se encuentra la carpeta Docs. Dentro de ella se encuentra el SVG del diagrama de flujo,
Se realizo de esta manera para hacerlo mas profesional espero no causar algun inconveniente. (./docs/ai-workflow.svg)

---
