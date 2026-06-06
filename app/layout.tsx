import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Agenda Yeka Coach Academy 2027',
  description: 'Agenda interactiva de viaje vocal para alumnos de Yeka Coach Academy',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
