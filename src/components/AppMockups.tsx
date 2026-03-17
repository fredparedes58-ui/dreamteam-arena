import { motion } from "framer-motion";
import { Search, MapPin, Calendar, Star, ChevronLeft, Check, Bell, ArrowRight } from "lucide-react";

const PhoneFrame = ({ children, label }: { children: React.ReactNode; label: string }) => (
  <div className="flex flex-col items-center shrink-0">
    <motion.div
      className="w-[200px] min-h-[400px] rounded-[24px] overflow-hidden border border-border/50 bg-background shadow-xl shadow-primary/5"
      whileHover={{ scale: 1.03, y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Notch */}
      <div className="h-7 bg-card flex items-center justify-center rounded-t-[24px]">
        <div className="w-10 h-1 bg-muted rounded-full" />
      </div>
      {children}
    </motion.div>
    <span className="text-xs text-muted-foreground font-display mt-3">{label}</span>
  </div>
);

const Screen1Discover = () => (
  <div>
    <div className="bg-gradient-to-br from-primary/80 to-primary/40 px-3 py-3">
      <div className="text-sm font-display font-bold text-primary-foreground">TorneoBase</div>
      <div className="text-[9px] text-primary-foreground/70 mt-0.5">Encuentra tu próximo torneo</div>
      <div className="mt-2 bg-primary-foreground/15 rounded-lg px-2.5 py-1.5 flex items-center gap-1.5">
        <Search className="w-3 h-3 text-primary-foreground/80" />
        <span className="text-[9px] text-primary-foreground/80">Benjamín · Semana Santa...</span>
      </div>
    </div>
    <div className="flex gap-1.5 px-3 py-2 overflow-hidden">
      <span className="text-[8px] px-2 py-1 rounded-full bg-primary text-primary-foreground font-display shrink-0">Todos</span>
      <span className="text-[8px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-display shrink-0">Benjamín</span>
      <span className="text-[8px] px-2 py-1 rounded-full bg-secondary text-secondary-foreground font-display shrink-0">Alevín</span>
    </div>
    <div className="px-3 py-1 text-[9px] font-display font-semibold text-foreground">Cerca de ti · Ibiza</div>
    {/* Card 1 */}
    <div className="mx-3 mb-2 rounded-lg overflow-hidden border border-border/50">
      <div className="h-12 bg-gradient-to-r from-primary/60 to-accent/40 flex items-end px-2 pb-1">
        <span className="text-[7px] bg-background/50 text-foreground px-1.5 py-0.5 rounded backdrop-blur-sm">★ 4.8 · 23 reseñas</span>
      </div>
      <div className="p-2 bg-card">
        <div className="text-[10px] font-display font-bold text-foreground">Pirineos Cup 2026</div>
        <div className="text-[8px] text-muted-foreground mt-0.5">📍 Lleida · 25–28 Jun</div>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[10px] font-display font-bold text-primary">€180/eq</span>
          <span className="text-[8px] text-pulse font-display">Solo 4 plazas</span>
        </div>
      </div>
    </div>
    {/* Card 2 */}
    <div className="mx-3 mb-2 rounded-lg overflow-hidden border border-border/50">
      <div className="h-12 bg-gradient-to-r from-accent/50 to-accent/20 flex items-end px-2 pb-1">
        <span className="text-[7px] bg-background/50 text-foreground px-1.5 py-0.5 rounded backdrop-blur-sm">Nuevo</span>
      </div>
      <div className="p-2 bg-card">
        <div className="text-[10px] font-display font-bold text-foreground">Valencia Summer Cup</div>
        <div className="text-[8px] text-muted-foreground mt-0.5">📍 Valencia · 12–14 Jul</div>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-[10px] font-display font-bold text-primary">€120/eq</span>
          <span className="text-[8px] text-primary font-display">18 plazas</span>
        </div>
      </div>
    </div>
  </div>
);

const Screen2Detail = () => (
  <div>
    <div className="bg-gradient-to-br from-primary/70 to-primary/30 h-20 flex items-end px-3 pb-2">
      <div>
        <div className="text-xs font-display font-bold text-primary-foreground leading-tight">Pirineos Cup 2026</div>
        <div className="text-[8px] text-primary-foreground/70 mt-0.5">por Travel Sports · Verificado ✓</div>
      </div>
    </div>
    <div className="p-3 space-y-1.5">
      <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground">
        <Calendar className="w-3 h-3 text-accent" /> 25–28 Jun 2026 · 4 días
      </div>
      <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground">
        <MapPin className="w-3 h-3 text-accent" /> Lleida, Cataluña
      </div>
      <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground">
        👥 294 equipos · 48 plazas
      </div>
      <div className="flex items-center gap-1.5 text-[8px] text-muted-foreground">
        💰 €180 por equipo
      </div>
    </div>
    <div className="px-3 flex flex-wrap gap-1 mb-2">
      {["Benjamín ⚽", "Alevín", "Infantil", "Cadete"].map(c => (
        <span key={c} className="text-[7px] px-1.5 py-0.5 rounded-full bg-secondary text-secondary-foreground">{c}</span>
      ))}
    </div>
    <div className="px-3 flex items-center gap-1 mb-2">
      <span className="text-yellow-400 text-[10px]">★★★★★</span>
      <span className="text-[9px] font-display font-bold text-foreground">4.8</span>
      <span className="text-[8px] text-muted-foreground">23 reseñas</span>
    </div>
    <div className="px-3 text-[8px] text-muted-foreground leading-relaxed mb-3">
      Torneo internacional con más de 25 ediciones. Instalaciones de primer nivel.
    </div>
    <div className="mx-3 mb-3 py-2.5 bg-primary text-primary-foreground rounded-lg text-center text-[10px] font-display font-bold">
      Inscribir equipo →
    </div>
  </div>
);

const Screen3Registration = () => (
  <div>
    <div className="flex items-center gap-2 px-3 py-3 border-b border-border/50">
      <div className="w-5 h-5 rounded-md bg-secondary flex items-center justify-center">
        <ChevronLeft className="w-3 h-3 text-muted-foreground" />
      </div>
      <span className="text-[11px] font-display font-bold text-foreground">Inscripción</span>
    </div>
    <div className="p-3 space-y-2">
      <div>
        <div className="text-[8px] text-muted-foreground font-display mb-1">Nombre del equipo</div>
        <div className="bg-secondary rounded-md px-2 py-1.5 text-[8px] text-foreground">CD 380 Academy Benjamín A</div>
      </div>
      <div>
        <div className="text-[8px] text-muted-foreground font-display mb-1">Categoría</div>
        <div className="bg-secondary rounded-md px-2 py-1.5 text-[8px] text-accent border border-accent/20">Benjamín (Sub-10) ▾</div>
      </div>
      <div>
        <div className="text-[8px] text-muted-foreground font-display mb-1">Contacto</div>
        <div className="bg-secondary rounded-md px-2 py-1.5 text-[8px] text-foreground">Pedro García · +34 666...</div>
      </div>
      <div className="bg-secondary rounded-lg p-2.5 mt-2">
        <div className="flex justify-between text-[8px] text-muted-foreground mb-1">
          <span>Inscripción Benjamín</span><span className="text-foreground">€180.00</span>
        </div>
        <div className="flex justify-between text-[8px] text-muted-foreground mb-1">
          <span>Gestión plataforma</span><span className="text-primary">Gratis</span>
        </div>
        <div className="flex justify-between text-[10px] font-display font-bold text-foreground border-t border-border/50 pt-1.5 mt-1.5">
          <span>Total</span><span className="text-primary">€180.00</span>
        </div>
      </div>
      <div className="py-2.5 bg-primary text-primary-foreground rounded-lg text-center text-[10px] font-display font-bold mt-2">
        Pagar con Stripe →
      </div>
    </div>
  </div>
);

const Screen4Organizer = () => (
  <div>
    <div className="bg-gradient-to-br from-primary/60 to-primary/30 px-3 py-3">
      <div className="text-[11px] font-display font-bold text-primary-foreground">Pirineos Cup 2026</div>
      <div className="text-[8px] text-primary-foreground/70 mt-0.5">Panel organizador</div>
    </div>
    <div className="grid grid-cols-2 gap-1.5 p-2.5">
      {[{ v: "247", l: "Inscritos" }, { v: "€44.4k", l: "Recaudado" }, { v: "48", l: "Libres" }, { v: "4.8★", l: "Valoración" }].map(s => (
        <div key={s.l} className="bg-card rounded-lg p-2 text-center">
          <div className="text-sm font-display font-bold text-foreground">{s.v}</div>
          <div className="text-[7px] text-muted-foreground">{s.l}</div>
        </div>
      ))}
    </div>
    <div className="px-2.5 mt-1">
      <div className="flex justify-between text-[7px] text-muted-foreground mb-1"><span>Ocupación</span><span>84%</span></div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full" style={{ width: "84%" }} />
      </div>
    </div>
    <div className="px-2.5 mt-3 text-[8px] font-display text-muted-foreground uppercase tracking-wider">Últimas inscripciones</div>
    {[
      { name: "CF Alcúdia", cat: "Benjamín A", ok: true },
      { name: "AD Calvià", cat: "Alevín B", ok: false },
      { name: "CE Eivissa", cat: "Infantil A", ok: true },
    ].map(r => (
      <div key={r.name} className="mx-2.5 mt-1.5 bg-card rounded-lg px-2.5 py-2 flex justify-between items-center">
        <div>
          <div className="text-[9px] font-display font-bold text-foreground">{r.name}</div>
          <div className="text-[7px] text-muted-foreground">{r.cat}</div>
        </div>
        <span className={`text-[7px] px-1.5 py-0.5 rounded font-display ${r.ok ? "bg-primary/10 text-primary" : "bg-yellow-500/10 text-yellow-400"}`}>
          {r.ok ? "Confirmado" : "Pendiente"}
        </span>
      </div>
    ))}
  </div>
);

const Screen5Notifications = () => (
  <div>
    <div className="px-3 py-3 border-b border-border/50">
      <div className="text-[11px] font-display font-bold text-foreground">Notificaciones</div>
    </div>
    {/* Confirmation */}
    <div className="m-2.5 bg-primary/10 rounded-xl p-3 text-center">
      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center mx-auto mb-1.5">
        <Check className="w-4 h-4 text-primary-foreground" />
      </div>
      <div className="text-[10px] font-display font-bold text-primary">¡Inscripción confirmada!</div>
      <div className="text-[8px] text-muted-foreground mt-0.5">Pirineos Cup · Benjamín A<br/>25–28 Jun · €180 pagado</div>
    </div>
    {[
      { title: "Pago confirmado ✓", body: "Tu inscripción ha sido confirmada. Recibo enviado.", time: "Hace 2 min", color: "border-l-primary" },
      { title: "Plazas limitadas", body: "Valencia Summer Cup: 3 plazas en Benjamín.", time: "Hace 1 hora", color: "border-l-yellow-400" },
      { title: "Nuevo torneo cerca", body: "Costa Daurada Cup ha abierto inscripciones.", time: "Ayer", color: "border-l-accent" },
    ].map(n => (
      <div key={n.title} className={`mx-2.5 mb-1.5 bg-card rounded-lg p-2.5 border-l-2 ${n.color}`}>
        <div className="text-[9px] font-display font-bold text-foreground">{n.title}</div>
        <div className="text-[7px] text-muted-foreground mt-0.5 leading-relaxed">{n.body}</div>
        <div className="text-[7px] text-muted-foreground/60 mt-1">{n.time}</div>
      </div>
    ))}
  </div>
);

const AppMockups = () => {
  return (
    <section className="py-8">
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-2">
          Flujo de la <span className="text-gradient-neon">App</span>
        </h2>
        <p className="text-muted-foreground text-sm">Desde descubrir un torneo hasta la confirmación de inscripción, en menos de 3 minutos.</p>
      </motion.div>

      <div className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 px-1">
        <PhoneFrame label="1 · Discover">
          <Screen1Discover />
        </PhoneFrame>
        <PhoneFrame label="2 · Ficha torneo">
          <Screen2Detail />
        </PhoneFrame>
        <PhoneFrame label="3 · Inscripción">
          <Screen3Registration />
        </PhoneFrame>
        <PhoneFrame label="4 · Panel organizador">
          <Screen4Organizer />
        </PhoneFrame>
        <PhoneFrame label="5 · Notificaciones">
          <Screen5Notifications />
        </PhoneFrame>
      </div>

      {/* Flow arrows (visible on desktop) */}
      <div className="hidden md:flex items-center justify-center gap-4 mt-4">
        {["Descubrir", "Explorar", "Inscribirse", "Gestionar", "Confirmar"].map((step, i) => (
          <div key={step} className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-[10px] font-display font-bold text-primary">{i + 1}</span>
              </div>
              <span className="text-xs font-display text-muted-foreground">{step}</span>
            </div>
            {i < 4 && <ArrowRight className="w-3 h-3 text-muted-foreground/40" />}
          </div>
        ))}
      </div>
    </section>
  );
};

export default AppMockups;
