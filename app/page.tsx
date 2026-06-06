"use client";

import { useState } from "react";

type ArtistCard = {
  name: string;
  image: string;
};

const navItems = [
  { label: "Inicio", icon: "⌂" },
  { label: "Mi Progreso", icon: "▥" },
  { label: "Calendario", icon: "▣" },
  { label: "Recursos", icon: "▻" },
  { label: "Mensajes", icon: "✉" },
  { label: "Ajustes", icon: "⚙" },
];

const cardThemes = ["pink", "orange", "teal"];

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [artists, setArtists] = useState<ArtistCard[]>([
    { name: "", image: "" },
    { name: "", image: "" },
    { name: "", image: "" },
  ]);
  const [otherArtists, setOtherArtists] = useState("");
  const [artistNotes, setArtistNotes] = useState("");

  function updateArtist(index: number, field: keyof ArtistCard, value: string) {
    const next = [...artists];
    next[index] = { ...next[index], [field]: value };
    setArtists(next);
  }

  return (
    <main className={sidebarOpen ? "app-frame" : "app-frame sidebar-collapsed"}>
      <aside className="dashboard-shell">
        <div className="brand-block">
          <div className="brand-icon">♪</div>
          <div>
            <strong>Voz en Ruta</strong>
            <span>Academia de canto</span>
          </div>
        </div>

        <button className="collapse-button" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label="Abrir o cerrar menú">
          {sidebarOpen ? "≪" : "☰"}
        </button>

        <nav className="side-nav">
          {navItems.map((item, index) => (
            <button key={item.label} className={index === 0 ? "active" : ""}>
              <span>{item.icon}</span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </nav>

        <div className="journey-card">
          <div className="journey-badge">★</div>
          <h3>Tu viaje vocal</h3>
          <p>Cada nota te acerca a tu mejor versión.</p>
          <a>Ver mi progreso →</a>
        </div>

        <div className="menu-toggle-bottom" onClick={() => setSidebarOpen(false)}>
          ← Ocultar menú
        </div>
      </aside>

      {!sidebarOpen && (
        <button className="floating-open" onClick={() => setSidebarOpen(true)} aria-label="Abrir menú">
          ☰
        </button>
      )}

      <section className="workspace">
        <header className="topbar">
          <div className="mobile-brand">Voz en Ruta</div>
          <div className="top-actions">
            <button className="notification">♩</button>
            <button className="bell">♡<span /></button>
            <div className="student-profile">
              <div className="avatar">V</div>
              <div>
                <strong>Valeria</strong>
                <span>Estudiante</span>
              </div>
              <small>⌄</small>
            </div>
          </div>
        </header>

        <div className="decor decor-note">♫</div>
        <div className="decor decor-star">✧</div>
        <div className="decor decor-plane">✈</div>
        <div className="travel-line" />

        <section className="letter-page">
          <div className="spiral-ring-row" aria-hidden="true">
            {Array.from({ length: 18 }).map((_, index) => <span key={index} />)}
          </div>

          <div className="letter-inner">
            <header className="hero-title">
              <div className="tiny-sparkles">✧ ♪ ✦</div>
              <h1>Top 3 de Cantantes</h1>
              <h2>que te inspiran</h2>
              <p>Elige a esos artistas que te motivan, te emocionan y te hacen querer seguir cantando.</p>
            </header>

            <section className="artist-card-row">
              {artists.map((artist, index) => (
                <article className={`artist-card ${cardThemes[index]}`} key={index}>
                  <div className="number-badge">{index + 1}</div>
                  <div className="music-mark">♪</div>
                  <label className="upload-circle">
                    {artist.image ? <img src={artist.image} alt={artist.name || `Artista ${index + 1}`} /> : <><span>▧</span><small>Añade una foto<br />o busca un artista</small></>}
                    <input
                      value={artist.image}
                      onChange={(event) => updateArtist(index, "image", event.target.value)}
                      placeholder="URL de imagen"
                    />
                  </label>
                  <input
                    className="artist-name-input"
                    value={artist.name}
                    onChange={(event) => updateArtist(index, "name", event.target.value)}
                    placeholder="Nombre del artista"
                  />
                </article>
              ))}
            </section>

            <section className="question-row pink-question">
              <div className="question-icon">☵</div>
              <div className="question-content">
                <label>¿Hay algunos más que te inspiran?</label>
                <div className="single-input-wrap">
                  <input value={otherArtists} onChange={(event) => setOtherArtists(event.target.value)} placeholder="Escribe los nombres de otros artistas que también te motivan..." />
                  <span>✎</span>
                </div>
              </div>
            </section>

            <section className="question-row teal-question">
              <div className="question-icon">♡</div>
              <div className="question-content">
                <label>¿Qué te gusta de estos artistas?</label>
                <p>Cuéntanos qué admiras de su voz, su estilo, sus canciones o su historia.</p>
                <textarea value={artistNotes} onChange={(event) => setArtistNotes(event.target.value)} placeholder="Escribe aquí tus observaciones..." />
              </div>
            </section>

            <section className="suitcase-banner">
              <div className="banner-icon">▣</div>
              <div className="banner-text">
                <strong>¡Vamos a llevarlos</strong>
                <span>en tu maleta!</span>
              </div>
              <div className="dotted-heart">⋯♡⋯</div>
              <div className="suitcase-art">
                <div className="suitcase-handle" />
                <div className="suitcase-body">
                  <span className="sticker one">MÚSICA</span>
                  <span className="sticker two">INSPIRACIÓN</span>
                  <span className="sticker three">SUEÑA<br />CANTA<br />VIVE</span>
                  <span className="mic-sticker">🎙</span>
                </div>
              </div>
            </section>
          </div>
        </section>
      </section>
    </main>
  );
}
