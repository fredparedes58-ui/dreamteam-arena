import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trophy, TrendingUp, Shield, Zap, Target, Clock, ChevronRight, Check, X } from "lucide-react";

const DIMS = ["Tamaño mercado", "Gap real", "Viabilidad tech", "Monetización", "Competencia", "Timing 2026"];
const DIM_COLORS = ["#378ADD", "#39FF14", "#7F77DD", "#D85A30", "#F87171", "#BA7517"];

interface Project {
  id: number;
  title: string;
  sub: string;
  scores: number[];
  winner: boolean;
  tags: string[];
  desc: string;
  pros: string[];
  cons: string[];
  verdict: string;
}

const projects: Project[] = [
  {
    id: 1, title: "TorneoBase", sub: "Marketplace torneos fútbol base",
    scores: [72, 90, 85, 78, 82, 80], winner: false,
    tags: ["Ya en desarrollo", "Mercado probado"],
    desc: "Marketplace bidireccional para torneos de fútbol base en España. Gap real confirmado: no existe ninguna plataforma similar en el mercado europeo. Modelo de negocio claro con comisión + suscripción.",
    pros: ["Gap de mercado confirmado y único", "Stack tecnológico ya dominado", "Modelo de ingresos dual validable rápido", "Timing perfecto: digitalización post-COVID"],
    cons: ["Cold start: necesita masa crítica en ambos lados", "Competencia latente de Tournify si pivota", "Ingresos lentos hasta alcanzar volumen mínimo"],
    verdict: "Proyecto sólido con gap real. Handicap: ya está en desarrollo, por lo que no compite como 'nueva idea'. Score penalizado ligeramente en tamaño de mercado vs proyectos con mayor TAM europeo."
  },
  {
    id: 2, title: "ScoutLink", sub: "Red de detección de talento base",
    scores: [88, 95, 80, 85, 70, 92], winner: true,
    tags: ["Gap crítico", "Sin competidor directo", "Alta monetización"],
    desc: "Plataforma que conecta ojeadores de clubes profesionales con academias y torneos de fútbol base. Integración directa con TorneoBase como fuente de datos.",
    pros: ["Cero competidores directos en Europa", "Alta disposición a pagar de clubes pro", "Datos de torneos como ventaja competitiva", "Sinergía directa con TorneoBase", "Mercado global: ojeadores de 50+ países"],
    cons: ["Necesita masa crítica de jugadores con datos", "Regulación GDPR estricta para menores", "Venta compleja a departamentos de scouting", "Necesita acuerdos con federaciones"],
    verdict: "El mayor gap del mercado europeo de fútbol base. Los departamentos de scouting de segunda y tercera división tienen presupuesto pero no herramientas digitales especializadas. Sinergía perfecta con TorneoBase."
  },
  {
    id: 3, title: "RefereePro", sub: "Gestión y bolsa de árbitros",
    scores: [65, 88, 82, 70, 75, 78], winner: false,
    tags: ["Gap operacional", "Mercado cautivo"],
    desc: "Marketplace de árbitros para torneos y ligas de fútbol base. En España hay +30.000 árbitros federados, la mayoría gestiona su actividad por teléfono.",
    pros: ["Problema real y doloroso para organizadores", "Mercado cautivo: árbitros ya tienen número federado", "Pagos digitalizados como diferencial", "Bajo coste de desarrollo inicial"],
    cons: ["Federaciones pueden ser competidoras", "Ingresos por transacción bajos", "Difícil escalar fuera de fútbol"],
    verdict: "Gap operacional muy real pero monetización limitada. Mejor como feature dentro de TorneoBase que como producto independiente."
  },
  {
    id: 4, title: "KitManager", sub: "Gestión y alquiler equipamiento",
    scores: [70, 75, 68, 72, 65, 70], winner: false,
    tags: ["Mercado fragmentado", "Hardware dependiente"],
    desc: "Plataforma B2B para gestión de inventario de equipaciones con módulo de alquiler entre clubs.",
    pros: ["Problema real en clubs pequeños", "Economía circular como diferencial", "Integración con marcas como canal"],
    cons: ["Hardware complicado (logística)", "Mercado muy fragmentado", "Baja recurrencia"],
    verdict: "Problema real pero solución con demasiada fricción operativa. La logística de equipamiento físico hace el modelo difícil de escalar."
  },
  {
    id: 5, title: "FieldBook", sub: "Reserva de instalaciones deportivas",
    scores: [82, 70, 78, 80, 55, 75], winner: false,
    tags: ["Competencia establecida", "Mercado grande"],
    desc: "Plataforma de reserva de campos de fútbol para clubs, entrenadores y particulares. Modelo similar a Treatwell pero para instalaciones deportivas.",
    pros: ["TAM muy grande (toda Europa)", "Modelo Airbnb/Booking probado", "Recurrencia alta: clubs entrenan 3-4x/semana"],
    cons: ["Competidores existentes: CourtReserve, Playfinder", "Negociación compleja con ayuntamientos", "Masa crítica de instalaciones por ciudad"],
    verdict: "Gap existe pero el mercado ya tiene players establecidos. El coste de adquisición de instalaciones es elevado."
  },
  {
    id: 6, title: "CoachOS", sub: "Sistema operativo para entrenadores",
    scores: [75, 82, 76, 72, 68, 80], winner: false,
    tags: ["SaaS recurrente", "B2C escalable"],
    desc: "App de gestión integral: planificación de sesiones, análisis de rendimiento, comunicación con padres, IA que recomienda ejercicios.",
    pros: ["SaaS con suscripción mensual recurrente", "IA de recomendación como diferencial", "Los padres pagan: alta disposición", "Escalable globalmente"],
    cons: ["Competidores en UK/EEUU: Sprongo, CoachNow", "Requiere catálogo enorme de contenido", "CAC alto y complejo"],
    verdict: "Mercado SaaS sólido con recurrencia alta. El diferencial de IA es real y difícil de copiar rápido."
  },
  {
    id: 7, title: "ParentHub", sub: "Comunicación padres-clubs",
    scores: [68, 65, 80, 60, 58, 65], winner: false,
    tags: ["Problema común", "Competencia fuerte"],
    desc: "App de comunicación entre clubs y familias. Reemplaza al caótico grupo de WhatsApp de cada equipo.",
    pros: ["Problema universalmente reconocido", "Alta frecuencia de uso", "Fácil de explicar"],
    cons: ["TeamSnap ya domina en EEUU", "WhatsApp difícil de desplazar", "Monetización muy difícil"],
    verdict: "El problema es real pero la solución ya existe. Como feature de TorneoBase tiene más sentido que como producto independiente."
  },
  {
    id: 8, title: "InjuryShield", sub: "Prevención de lesiones con IA",
    scores: [78, 86, 72, 75, 62, 85], winner: false,
    tags: ["AI diferencial", "Tendencia clara"],
    desc: "Plataforma de prevención de lesiones usando IA. Analiza patrones de riesgo y alerta sobre probabilidad de lesión. Integra con wearables.",
    pros: ["IA predictiva como diferencial real", "Creciente preocupación por lesiones infantiles", "Mercado de wearables juveniles en expansión", "Potencial seguro deportivo como upsell"],
    cons: ["Datos difíciles de obtener", "Wearables en fútbol base aún son nicho", "Responsabilidad legal si falla", "Alto coste de validación científica"],
    verdict: "Gap real con viento de cola fuerte. La prevención de lesiones en jóvenes está en el radar de padres, clubs y aseguradoras."
  },
  {
    id: 9, title: "SponsorMatch", sub: "Marketplace patrocinios locales",
    scores: [72, 84, 74, 82, 72, 78], winner: false,
    tags: ["Dinero sin digitalizar", "Modelo comisión"],
    desc: "Conecta negocios locales con clubs para patrocinios de equipaciones y eventos. La plataforma gestiona contrato y pago.",
    pros: ["Dinero que ya circula informalmente", "Comisión 10-15% sobre ticket alto", "Baja competencia directa en España"],
    cons: ["Dos lados muy diferentes de educar", "Ciclos de venta largos", "Cada ciudad es diferente"],
    verdict: "Gap financiero interesante. Los clubs captan patrocinios por relaciones personales — hay dinero que circula informalmente."
  },
  {
    id: 10, title: "TravelKit", sub: "Viajes y alojamiento para torneos",
    scores: [75, 72, 70, 76, 60, 72], winner: false,
    tags: ["Complementario TorneoBase", "Ticket alto"],
    desc: "Planificación de viajes específica para equipos que van a torneos fuera de su ciudad. Integra con TorneoBase.",
    pros: ["Ticket medio alto: €300-800 por equipo", "Integración natural con TorneoBase", "Mercado creciente"],
    cons: ["KOMM MIT ya tiene este mercado", "Operativa compleja", "Márgenes bajos en turismo"],
    verdict: "Producto natural como extensión de TorneoBase. Como producto independiente, KOMM MIT ya tiene posición consolidada."
  }
];

const getColor = (score: number) => {
  if (score >= 85) return "text-primary";
  if (score >= 70) return "text-accent";
  if (score >= 55) return "text-yellow-400";
  return "text-pulse";
};

const getBarColor = (score: number) => {
  if (score >= 85) return "bg-primary";
  if (score >= 70) return "bg-accent";
  if (score >= 55) return "bg-yellow-400";
  return "bg-pulse";
};

const totalScore = (p: Project) => Math.round(p.scores.reduce((a, b) => a + b, 0) / p.scores.length);

const ProjectEvaluator = () => {
  const [selected, setSelected] = useState<number>(2);
  const selectedProject = projects.find(p => p.id === selected);

  return (
    <section className="py-8">
      <motion.div
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
          Evaluador <span className="text-gradient-neon">SportsTech</span>
        </h2>
        <p className="text-muted-foreground text-sm">10 oportunidades de mercado analizadas por IA. Haz clic en cualquier proyecto.</p>
      </motion.div>

      {/* Winner Banner */}
      <motion.div
        className="glass rounded-2xl p-5 mb-6 border border-primary/30 glow-green"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
            <Trophy className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-display text-primary uppercase tracking-wider mb-1">Ganador del análisis — mejor oportunidad</div>
            <div className="text-lg font-display font-bold text-foreground">ScoutLink — Red de detección de talento base</div>
            <div className="text-sm text-muted-foreground">Score total: 85/100</div>
          </div>
        </div>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
        {projects.map((p, i) => {
          const total = totalScore(p);
          const isSelected = selected === p.id;
          return (
            <motion.div
              key={p.id}
              onClick={() => setSelected(p.id)}
              className={`glass rounded-xl p-4 cursor-pointer transition-all ${
                isSelected ? "border border-accent/50 glow-cyan" : p.winner ? "border border-primary/30" : ""
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="text-[10px] text-muted-foreground font-display">PROYECTO #{p.id}</div>
                  <div className="text-sm font-display font-bold text-foreground flex items-center gap-2">
                    {p.title}
                    {p.winner && (
                      <span className="text-[9px] px-2 py-0.5 bg-primary/20 text-primary rounded-full font-display">GANADOR</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">{p.sub}</div>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <div className={`text-2xl font-display font-bold ${getColor(total)}`}>{total}</div>
                  <div className="text-[10px] text-muted-foreground">/ 100</div>
                </div>
              </div>

              {/* Score bars */}
              <div className="space-y-1.5">
                {DIMS.map((dim, di) => (
                  <div key={dim} className="flex items-center gap-2">
                    <span className="text-[10px] text-muted-foreground w-[90px] shrink-0">{dim}</span>
                    <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                      <motion.div
                        className="h-full rounded-full"
                        style={{ backgroundColor: DIM_COLORS[di] }}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${p.scores[di]}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.1 + di * 0.05 }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground w-6 text-right">{p.scores[di]}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {p.tags.map(tag => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent border border-accent/20 font-display">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Detail Panel */}
      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key={selectedProject.id}
            className="glass rounded-2xl p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-xs text-muted-foreground font-display mb-1">Proyecto #{selectedProject.id}</div>
                <h3 className="text-xl font-display font-bold text-foreground">
                  {selectedProject.title} — <span className="text-muted-foreground font-normal">{selectedProject.sub}</span>
                </h3>
              </div>
              <div className="text-right">
                <div className={`text-3xl font-display font-bold ${getColor(totalScore(selectedProject))}`}>
                  {totalScore(selectedProject)}<span className="text-sm text-muted-foreground">/100</span>
                </div>
                {selectedProject.winner && <div className="text-xs text-primary font-display">Mejor proyecto</div>}
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">{selectedProject.desc}</p>

            {/* Dimension scores */}
            <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-5">
              {DIMS.map((dim, i) => (
                <div key={dim} className="glass rounded-lg p-3 text-center">
                  <div className="text-xl font-display font-bold" style={{ color: DIM_COLORS[i] }}>
                    {selectedProject.scores[i]}
                  </div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{dim}</div>
                </div>
              ))}
            </div>

            {/* Pros / Cons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              <div className="glass rounded-lg p-4">
                <h4 className="text-sm font-display font-semibold text-primary mb-3 flex items-center gap-2">
                  <Check className="w-4 h-4" /> Fortalezas
                </h4>
                <div className="space-y-2">
                  {selectedProject.pros.map((pro, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-primary mt-0.5">+</span>
                      <span>{pro}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="glass rounded-lg p-4">
                <h4 className="text-sm font-display font-semibold text-pulse mb-3 flex items-center gap-2">
                  <X className="w-4 h-4" /> Riesgos
                </h4>
                <div className="space-y-2">
                  {selectedProject.cons.map((con, i) => (
                    <div key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="text-pulse mt-0.5">−</span>
                      <span>{con}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Verdict */}
            <div className="border-l-2 border-primary rounded-r-lg bg-primary/5 px-4 py-3">
              <p className="text-sm text-foreground/80 leading-relaxed">{selectedProject.verdict}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProjectEvaluator;
