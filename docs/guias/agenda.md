# Agenda

Página [`/agenda`](../../src/pages/agenda.astro): el visitante elige día y hora, deja nombre y email, y la cita entra en tu Google Calendar personal con enlace de Meet.

Los días y el horario de atención salen de [`src/data/booking.ts`](../../src/data/booking.ts). Google Calendar solo resta lo que ya está ocupado.

## Horario actual

- Zona: `America/Mexico_City`
- Lun–vie, 10:00–18:00, en una sola franja
- Sábado y domingo: `[]` (cerrados)
- Cada llamada dura 30 minutos (`slotMinutes`)
- No se ofrece un hueco si empieza en menos de 12 horas (`minNoticeHours`)
- Se muestran los próximos 21 días, incluido hoy (`horizonDays`)
- `blockedDates`: fechas `YYYY-MM-DD` que no se ofrecen (vacaciones, viajes)

El último slot de un día de 10:00 a 18:00 empieza a las 17:30.

## Cambiar días u horas

Edita `weekly` en `src/data/booking.ts`. Cada día es una lista de franjas `{ start, end }` en reloj de 24 horas. Un día sin franjas queda cerrado. Puedes partir el día:

```ts
mon: [
  { start: "10:00", end: "14:00" },
  { start: "16:00", end: "18:00" },
],
sat: [],
```

Para cerrar un día concreto:

```ts
blockedDates: ["2026-12-25", "2027-01-01"],
```

Después del cambio hace falta un deploy: el archivo se empaqueta con las functions.

## Conectar tu cuenta personal

La autorización es de tu usuario de Google, no de un service account. Así el evento nace en tu agenda y Google puede mandar la invitación y crear el Meet.

1. En [Google Cloud Console](https://console.cloud.google.com/) crea un proyecto y activa **Google Calendar API**.
2. Pantalla de consentimiento OAuth, tipo **Externo**.
   - Publica la app en **Producción**. Si se queda en Pruebas, el refresh token caduca a los 7 días.
   - No hace falta la verificación de Google: solo autorizas tú. Quien reserva no pasa por OAuth.
   - Scope: `https://www.googleapis.com/auth/calendar`.
3. Credenciales → **ID de cliente de OAuth** → tipo **Aplicación web**.
   - URI de redirección autorizada: `http://127.0.0.1:53682/oauth`
4. Copia el client id y el secret a `.env`:

```
GOOGLE_CLIENT_ID=...
GOOGLE_CLIENT_SECRET=...
GOOGLE_CALENDAR_ID=primary
```

5. En la raíz del repo, con la sesión del navegador de tu cuenta personal:

```
pnpm calendar:auth
```

6. Abre la URL que imprime la terminal, acepta el acceso y vuelve. El script imprime `GOOGLE_REFRESH_TOKEN`. Pégalo en `.env` y en Netlify (Site configuration → Environment variables), junto con el client id, el secret y `GOOGLE_CALENDAR_ID=primary`.
7. Redeploy. Sin esas variables, `/agenda` muestra “Agenda no configurada” y no inventa horarios.

Si Google no devuelve refresh token, entra a [permisos de la cuenta](https://myaccount.google.com/permissions), quita el acceso de la app y vuelve a correr `pnpm calendar:auth`.

`primary` es el calendario principal de la cuenta con la que autorizaste. Para otro calendario de esa misma cuenta, usa su id (en Calendar: configuración del calendario → Integrar calendario).

## Qué hace el sitio al reservar

- `GET /.netlify/functions/availability` arma los slots de `booking.ts` y quita los ocupados (`freeBusy`).
- `POST /.netlify/functions/book` vuelve a comprobar el hueco, valida reCAPTCHA (acción `book`) y crea el evento “Llamada Avantgardev — {nombre}” con el visitante como asistente y un Meet nuevo.
