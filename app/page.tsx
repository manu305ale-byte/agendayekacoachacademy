"use client";

import { useMemo, useState } from "react";

type Student = {
  name: string;
  email: string;
  password: string;
  age: string;
  phone: string;
  vocalLevel: string;
  voiceType: string;
  goal: string;
};

type Singer = {
  name: string;
  image: string;
  inspiration: string;
  liked: string;
};

type DayEntry = {
  videos: string;
  learned: string;
  observations: string;
  mood: string;
  status: "Pendiente" | "En proceso" | "Completado" | "Necesito ayuda";
};

const monthNames = [
  "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
  "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre",
];

const monthAccent = ["#1f9c8a", "#c0567b", "#de7d3b", "#6f5faa"];

function getDaysInMonth(monthIndex: number) {
  return new Date(2027, monthIndex + 1, 0).getDate();
}

function emptyStudent(): Student {
  return { name: "", email: "", password: "", age: "", phone: "", vocalLevel: "", voiceType: "", goal: "" };
}

function emptySingers(): Singer[] {
  return [0, 1, 2].map(() => ({ name: "", image: "", inspiration: "", liked: "" }));
}

export default function Home() {
  const [screen, setScreen] = useState("portada");
  const [student, setStudent] = useState<Student>(emptyStudent());
  const [loggedStudent, setLoggedStudent] = useState<Student | null>(null);
  const [fears, setFears] = useState<string[]>(["", "", "", "", "", ""]);
  const [bottleClosed, setBottleClosed] = useState(false);
  const [singers, setSingers] = useState<Singer[]>(emptySingers());
  const [suitcaseOpen, setSuitcaseOpen] = useState(false);
  const [month, setMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [entries, setEntries] = useState<Record<string, DayEntry>>({});

  const activeStudent = loggedStudent || student;
  const days = useMemo(() => Array.from({ length: getDaysInMonth(month) }, (_, i) => i + 1), [month]);

  function registerStudent() {
    setLoggedStudent(student);
    setScreen("botella");
  }

  function entryKey(day: number) {
    return `${activeStudent.email || "demo"}-2027-${month + 1}-${day}`;
  }

  function getEntry(day: number): DayEntry {
    return entries[entryKey(day)] || { videos: "", learned: "", observations: "", mood: "", status: "Pendiente" };
  }

  function saveEntry(day: number, next: DayEntry) {
    setEntries({ ...entries, [entryKey(day)]: next });
  }

  const completed = Object.values(entries).filter((entry) => entry.status === "Completado").length;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="logo-mark">YC</div>
        <h1>Agenda Yeka Coach Academy</h1>
        <p>Diario vocal 2027 · Un viaje personalizado por la voz de cada alumno.</p>
        <nav>
          <button onClick={() => setScreen("portada")}>Portada</button>
          <button onClick={() => setScreen("registro")}>Registro</button>
          <button onClick={() => setScreen("botella")}>Botella de miedos</button>
          <button onClick={() => setScreen("cantantes")}>Top 3 cantantes</button>
          <button onClick={() => setScreen("calendario")}>Calendario 2027</button>
          <button onClick={() => setScreen("maleta")}>Mi maleta</button>
          <button onClick={() => setScreen("coach")}>Panel coach</button>
        </nav>
        <div className="student-card">
          <span>Alumno activo</span>
          <strong>{activeStudent.name || "Modo demo"}</strong>
          <small>{activeStudent.email || "Sin registro todavía"}</small>
        </div>
      </aside>

      <section className="page-stage">
        {screen === "portada" && (
          <section className="cover page-card">
            <span className="tag">Agenda interactiva 2027</span>
            <h2>El viaje de tu voz comienza aquí</h2>
            <p>
              Una agenda digital para alumnos de canto: calendario mensual, videos diarios,
              observaciones personales, miedos guardados, artistas inspiradores y progreso individual.
            </p>
            <div className="hero-suitcase">✦ 🧳 ✦</div>
            <button className="primary" onClick={() => setScreen("registro")}>Crear alumno / iniciar viaje</button>
          </section>
        )}

        {screen === "registro" && (
          <section className="page-card">
            <span className="tag">Usuario y clave</span>
            <h2>Registro individual del alumno</h2>
            <p>Cada alumno tendrá su propio contenido, avances, observaciones, artistas y videos guardados.</p>
            <div className="grid-form">
              {[
                ["name", "Nombre completo"], ["email", "Correo / usuario"], ["password", "Clave"],
                ["age", "Edad"], ["phone", "Teléfono"], ["vocalLevel", "Nivel vocal"],
                ["voiceType", "Tipo de voz"], ["goal", "Objetivo principal"]
              ].map(([key, label]) => (
                <label key={key}>
                  {label}
                  <input
                    type={key === "password" ? "password" : "text"}
                    value={(student as any)[key]}
                    onChange={(event) => setStudent({ ...student, [key]: event.target.value })}
                    placeholder={label}
                  />
                </label>
              ))}
            </div>
            <button className="primary" onClick={registerStudent}>Guardar alumno y continuar</button>
          </section>
        )}

        {screen === "botella" && (
          <section className="page-card">
            <span className="tag">Ejercicio emocional</span>
            <h2>La botella de los miedos</h2>
            <p>Escribe los miedos que acompañan tu camino artístico y guárdalos para que no conduzcan tu voz.</p>
            <div className="fear-layout">
              <div className={bottleClosed ? "bottle closed" : "bottle"}>
                <div className="bottle-neck" />
                <div className="bottle-body">
                  {bottleClosed ? fears.filter(Boolean).map((fear, index) => <span key={index}>{fear}</span>) : <strong>Botella abierta</strong>}
                </div>
              </div>
              <div className="fear-inputs">
                {fears.map((fear, index) => (
                  <input key={index} value={fear} onChange={(event) => {
                    const next = [...fears];
                    next[index] = event.target.value;
                    setFears(next);
                  }} placeholder={`Miedo ${index + 1}`} />
                ))}
                <button className="primary" onClick={() => setBottleClosed(true)}>Guardar en la botella</button>
              </div>
            </div>
          </section>
        )}

        {screen === "cantantes" && (
          <section className="page-card">
            <span className="tag">Inspiración artística</span>
            <h2>Top 3 cantantes que te inspiran</h2>
            <div className="singer-grid">
              {singers.map((singer, index) => (
                <article className="singer-card" key={index}>
                  <div className="photo-box">{singer.image ? <img src={singer.image} alt={singer.name} /> : "Imagen"}</div>
                  <input value={singer.image} onChange={(event) => {
                    const next = [...singers]; next[index].image = event.target.value; setSingers(next);
                  }} placeholder="URL de imagen del artista" />
                  <input value={singer.name} onChange={(event) => {
                    const next = [...singers]; next[index].name = event.target.value; setSingers(next);
                  }} placeholder="Nombre del cantante" />
                  <textarea value={singer.inspiration} onChange={(event) => {
                    const next = [...singers]; next[index].inspiration = event.target.value; setSingers(next);
                  }} placeholder="¿Qué te inspira?" />
                  <textarea value={singer.liked} onChange={(event) => {
                    const next = [...singers]; next[index].liked = event.target.value; setSingers(next);
                  }} placeholder="¿Qué te gusta de su voz?" />
                </article>
              ))}
            </div>
            <button className="primary" onClick={() => { setSuitcaseOpen(false); setScreen("maleta"); }}>Guardar artistas en la maleta</button>
          </section>
        )}

        {screen === "calendario" && selectedDay === null && (
          <section className="page-card calendar-card">
            <span className="tag">Calendario de viaje vocal</span>
            <h2>{monthNames[month]} 2027</h2>
            <div className="month-switcher">
              {monthNames.map((name, index) => <button key={name} onClick={() => setMonth(index)} className={month === index ? "active" : ""}>{name.slice(0, 3)}</button>)}
            </div>
            <div className="days-grid">
              {days.map((day) => {
                const entry = getEntry(day);
                return <button key={day} className={`day ${entry.status.replaceAll(" ", "-").toLowerCase()}`} onClick={() => setSelectedDay(day)}>
                  <span>{day}</span><small>{entry.status}</small>
                </button>;
              })}
            </div>
          </section>
        )}

        {screen === "calendario" && selectedDay !== null && (
          <DayView day={selectedDay} monthName={monthNames[month]} entry={getEntry(selectedDay)} onBack={() => setSelectedDay(null)} onSave={(next) => saveEntry(selectedDay, next)} />
        )}

        {screen === "maleta" && (
          <section className="page-card suitcase-page">
            <span className="tag">Centro del alumno</span>
            <h2>Mi maleta vocal</h2>
            <button className="suitcase" onClick={() => setSuitcaseOpen(!suitcaseOpen)}>🧳</button>
            <p>Haz clic en la maleta para abrir o cerrar la información guardada.</p>
            {suitcaseOpen && (
              <div className="suitcase-content">
                <h3>Mis artistas</h3>
                {singers.filter((s) => s.name).map((singer, index) => <p key={index}><strong>{singer.name}</strong>: {singer.inspiration}</p>)}
                <h3>Mis miedos guardados</h3>
                {fears.filter(Boolean).map((fear, index) => <span className="chip" key={index}>{fear}</span>)}
                <h3>Progreso</h3>
                <p>{completed} actividades completadas en esta demo.</p>
              </div>
            )}
          </section>
        )}

        {screen === "coach" && (
          <section className="page-card">
            <span className="tag">Administrador</span>
            <h2>Panel del coach</h2>
            <p>Este boceto muestra cómo el coach podrá revisar alumnos, progreso, observaciones y videos diarios.</p>
            <div className="coach-table">
              <div><strong>Alumno</strong><span>{activeStudent.name || "Alumno demo"}</span></div>
              <div><strong>Correo</strong><span>{activeStudent.email || "demo@yeka.com"}</span></div>
              <div><strong>Objetivo</strong><span>{activeStudent.goal || "Mejorar técnica vocal"}</span></div>
              <div><strong>Completados</strong><span>{completed}</span></div>
            </div>
          </section>
        )}
      </section>
    </main>
  );
}

function DayView({ day, monthName, entry, onBack, onSave }: { day: number; monthName: string; entry: DayEntry; onBack: () => void; onSave: (entry: DayEntry) => void }) {
  const [draft, setDraft] = useState(entry);
  return (
    <section className="page-card">
      <button className="ghost" onClick={onBack}>← Volver al mes</button>
      <span className="tag">Parada vocal del día</span>
      <h2>{day} de {monthName} de 2027</h2>
      <label>Links de videos del día<input value={draft.videos} onChange={(e) => setDraft({ ...draft, videos: e.target.value })} placeholder="YouTube, Vimeo, Drive..." /></label>
      <label>¿Qué aprendí hoy?<textarea value={draft.learned} onChange={(e) => setDraft({ ...draft, learned: e.target.value })} /></label>
      <label>Observaciones sobre mi voz<textarea value={draft.observations} onChange={(e) => setDraft({ ...draft, observations: e.target.value })} /></label>
      <label>¿Cómo me sentí cantando?<input value={draft.mood} onChange={(e) => setDraft({ ...draft, mood: e.target.value })} /></label>
      <label>Estado<select value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value as DayEntry["status"] })}>
        <option>Pendiente</option><option>En proceso</option><option>Completado</option><option>Necesito ayuda</option>
      </select></label>
      <button className="primary" onClick={() => onSave(draft)}>Guardar avance del día</button>
    </section>
  );
}
