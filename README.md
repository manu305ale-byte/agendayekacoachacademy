# Agenda Yeka Coach Academy 2027

Prototipo inicial de agenda interactiva web para una academia de canto. La temática visual es un viaje vocal donde la maleta es el elemento protagonista.

## Qué incluye este boceto

- Portada interactiva.
- Registro individual de alumno con usuario y clave en modo demo.
- Botella de los miedos.
- Top 3 cantantes inspiradores con imagen, nombre y notas.
- Maleta interactiva que guarda artistas, miedos y progreso.
- Calendario completo 2027 dividido por meses.
- Vista individual por día con links de videos, observaciones, aprendizaje, estado y sensación vocal.
- Panel básico del coach para ver datos del alumno y progreso.

## Cómo correrlo localmente

```bash
npm install
npm run dev
```

Abrir `http://localhost:3000`.

## Importante

Esta primera versión es un prototipo visual y funcional en frontend. Guarda la información en memoria mientras se usa la página. La siguiente fase debe conectar una base de datos real para que cada alumno tenga contenido persistente e individual.

## Base de datos recomendada para producción

Recomendación: Supabase.

Tablas sugeridas:

- `students`: datos personales del alumno.
- `student_auth`: usuario, correo, clave cifrada o autenticación externa.
- `fears`: miedos guardados por alumno.
- `singers`: top 3 cantantes del alumno.
- `daily_entries`: observaciones y aprendizajes por alumno y fecha.
- `daily_videos`: videos asignados por fecha, nivel o alumno.
- `coach_notes`: notas privadas del coach.
- `progress`: estados de avance por día.

## Próximas fases

1. Persistencia con Supabase.
2. Login real de alumno y panel admin.
3. Subida de imágenes a storage.
4. Editor del coach para asignar videos por mes, día, nivel o alumno.
5. Contraportada y más páginas especiales del viaje vocal.
