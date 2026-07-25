import { useState, type ReactNode } from "react";
import {
  Stack,
  Inline,
  Grid,
  Text,
  FlowButton,
  FlowIconButton,
  FlowField,
  FlowInput,
  FlowCheckbox,
  FlowCard,
  FlowBadge,
  FlowStatTile,
  FlowDivider,
  FlowTabs,
  FlowDialog,
  FlowSwitch,
  FlowAvatar,
  FlowChip,
  FlowTable,
  FlowPaymentCard,
  FlowTransactionRow,
  FlowPasscodeKeypad,
  FlowBiometricPrompt,
  FlowMapCanvas,
  FlowOTPInput,
  FlowDonut,
  FlowSparkline,
  FlowBarChart,
  FlowLineChart,
  FlowSpinner,
  FlowProgressBar,
  FlowTooltip,
  FlowBottomSheet,
  FlowRadioGroup,
  FlowSelect,
  FlowSlider,
  FlowSegmentedControl,
  FlowAccordion,
  FlowStepper,
  FlowBreadcrumb,
  FlowPagination,
  FlowDrawer,
  FlowStatusView,
  useToast,
  AuthScreen,
  FleetDashboard,
  WalletScreen,
  OnboardingScreen,
  DashboardOverview,
  WizardScreen,
  SettingsScreen,
  AuthOTPScreen,
  DriversApp,
  RoutesScreen,
  AgentChat,
  ConfigScreen,
  InternalTools,
  type TableColumn,
  type FleetUnit,
  type WalletTransaction,
} from "@flow/design-system";

const ONBOARDING_SLIDES = [
  {
    icon: "bolt",
    title: "Todo tu día, en movimiento",
    description: "Conéctate a tu turno y acepta viajes con un toque.",
  },
  {
    icon: "map",
    title: "La ciudad es tu turno",
    description: "Ve la demanda en tiempo real y encuentra las mejores rutas.",
  },
  {
    icon: "savings",
    title: "Tus ganancias, claras",
    description: "Consulta tu saldo y movimientos cuando quieras.",
  },
];

const WALLET_TX: WalletTransaction[] = [
  {
    id: "t1",
    icon: "local_gas_station",
    title: "Combustible",
    subtitle: "Hoy · 08:14",
    amount: "−$420",
    positive: false,
  },
  {
    id: "t2",
    icon: "payments",
    title: "Viaje 214",
    subtitle: "Hoy · 07:02",
    amount: "+$1,840",
    positive: true,
  },
  {
    id: "t3",
    icon: "restaurant",
    title: "Comida",
    subtitle: "Ayer · 14:20",
    amount: "−$180",
    positive: false,
  },
  {
    id: "t4",
    icon: "savings",
    title: "Bono semanal",
    subtitle: "Lun · 09:00",
    amount: "+$500",
    positive: true,
  },
];

const FLEET_UNITS: FleetUnit[] = [
  {
    id: "u1",
    plate: "MX-214-A",
    driver: "Ana Ruiz",
    status: "activo",
    route: "Centro → Norte",
    earnings: "$1,840",
  },
  {
    id: "u2",
    plate: "MX-118-C",
    driver: "Beto Lara",
    status: "taller",
    route: "—",
    earnings: "$0",
  },
  {
    id: "u3",
    plate: "MX-330-F",
    driver: "Caro Díaz",
    status: "activo",
    route: "Aeropuerto",
    earnings: "$2,310",
  },
  {
    id: "u4",
    plate: "MX-072-B",
    driver: "Dani Sosa",
    status: "fuera",
    route: "—",
    earnings: "$540",
  },
];

const FLEET_KPIS = [
  { label: "Unidades activas", value: "214", detail: "+12 hoy" },
  { label: "En ruta ahora", value: "1.8×", detail: "tarifa" },
  { label: "Ingresos semana", value: "$48.2k", detail: "+8%" },
  { label: "En taller", value: "6", detail: "−2" },
];

type Theme = "canvas" | "asphalt" | "brutal";
type Density = "default" | "compact" | "comfortable";

const THEMES: Theme[] = ["canvas", "asphalt", "brutal"];
const DENSITIES: Density[] = ["default", "compact", "comfortable"];

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <FlowCard as="section">
      <Stack gap="5">
        <Text variant="title" as="h2">
          {title}
        </Text>
        {children}
      </Stack>
    </FlowCard>
  );
}

export function App() {
  const [theme, setTheme] = useState<Theme>("canvas");
  const [density, setDensity] = useState<Density>("default");
  const [tab, setTab] = useState("resumen");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [otp, setOtp] = useState("");
  const [plan, setPlan] = useState("pro");
  const [city, setCity] = useState("");
  const [fare, setFare] = useState(60);
  const [segment, setSegment] = useState("dia");
  const [pageNum, setPageNum] = useState(4);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [passcode, setPasscode] = useState("");
  const toast = useToast();

  return (
    <div
      data-theme={theme}
      data-density={density === "default" ? undefined : density}
      className="docs-root"
    >
      <header className="docs-toolbar">
        <Inline align="center" gap="3" wrap>
          <Text variant="title-sm" as="span">
            Flow Design System
          </Text>
          <FlowBadge tone="neutral">ref → sys → comp</FlowBadge>
          <span className="docs-spacer" />
          <Inline gap="1" align="center">
            <Text variant="overline" color="muted" as="span">
              Tema
            </Text>
            {THEMES.map((t) => (
              <FlowButton
                key={t}
                size="sm"
                variant={theme === t ? "primary" : "ghost"}
                onClick={() => setTheme(t)}
              >
                {t}
              </FlowButton>
            ))}
          </Inline>
          <Inline gap="1" align="center">
            <Text variant="overline" color="muted" as="span">
              Densidad
            </Text>
            {DENSITIES.map((d) => (
              <FlowButton
                key={d}
                size="sm"
                variant={density === d ? "primary" : "ghost"}
                onClick={() => setDensity(d)}
              >
                {d}
              </FlowButton>
            ))}
          </Inline>
        </Inline>
      </header>

      <main className="docs-main">
        <Stack gap="6">
          <Section title="Actions — Button">
            <Stack gap="4">
              <Inline gap="3" align="center" wrap>
                <FlowButton variant="primary">Primary</FlowButton>
                <FlowButton variant="accent" iconStart="bolt">
                  Accent CTA
                </FlowButton>
                <FlowButton variant="secondary">Secondary</FlowButton>
                <FlowButton variant="ghost">Ghost</FlowButton>
                <FlowButton variant="danger">Danger</FlowButton>
              </Inline>
              <Inline gap="3" align="center" wrap>
                <FlowButton variant="accent" size="sm">
                  Small
                </FlowButton>
                <FlowButton variant="accent" size="md">
                  Medium
                </FlowButton>
                <FlowButton variant="accent" size="lg">
                  Large
                </FlowButton>
                <FlowButton variant="primary" loading>
                  Cargando
                </FlowButton>
                <FlowIconButton icon="notifications" ariaLabel="Notificaciones" badge />
                <FlowIconButton icon="favorite" ariaLabel="Favorito" filled />
              </Inline>
            </Stack>
          </Section>

          <Section title="Forms — Field · Input · Checkbox">
            <Grid columns="repeat(auto-fit, minmax(240px, 1fr))" gap="5">
              <FlowField label="Correo" hint="Usa tu correo de empresa.">
                <FlowInput type="email" iconStart="mail" placeholder="tu@empresa.com" />
              </FlowField>
              <FlowField label="Contraseña" error="Usa al menos 8 caracteres.">
                <FlowInput type="password" iconStart="lock" placeholder="Tu contraseña" />
              </FlowField>
              <Stack gap="3" justify="center">
                <FlowCheckbox label="Recordarme" defaultChecked />
                <FlowCheckbox label="Estado intermedio" indeterminate />
                <FlowCheckbox label="Deshabilitado" disabled />
              </Stack>
            </Grid>
          </Section>

          <Section title="Display — Badge · StatTile · Divider">
            <Stack gap="5">
              <Inline gap="3" wrap align="center">
                <FlowBadge tone="neutral">Neutral</FlowBadge>
                <FlowBadge tone="success">Activo</FlowBadge>
                <FlowBadge tone="warning">En taller</FlowBadge>
                <FlowBadge tone="danger">Fuera</FlowBadge>
                <FlowBadge tone="danger" live>
                  En vivo
                </FlowBadge>
              </Inline>
              <Grid columns="repeat(auto-fit, minmax(180px, 1fr))" gap="4">
                <FlowStatTile label="Unidades activas" value="214" detail="+12 hoy" />
                <FlowStatTile label="En ruta" value="1.8×" detail="tarifa" />
                <FlowStatTile label="Ingresos" value="$48.2k" detail="semana" />
              </Grid>
              <FlowDivider>o</FlowDivider>
            </Stack>
          </Section>

          <Section title="Navigation — Tabs">
            <Stack gap="4">
              <FlowTabs
                ariaLabel="Secciones"
                value={tab}
                onChange={setTab}
                items={[
                  { id: "resumen", label: "Resumen", icon: "dashboard" },
                  { id: "unidades", label: "Unidades", icon: "local_shipping" },
                  { id: "reportes", label: "Reportes", icon: "bar_chart" },
                ]}
              />
              <Text variant="body" color="secondary">
                Panel activo: <strong>{tab}</strong>. Usa ←/→ para cambiar con el teclado.
              </Text>
            </Stack>
          </Section>

          <Section title="Overlays — Dialog">
            <FlowButton variant="secondary" onClick={() => setDialogOpen(true)}>
              Abrir diálogo
            </FlowButton>
            <FlowDialog
              open={dialogOpen}
              onClose={() => setDialogOpen(false)}
              title="¿Desconectar la unidad 214?"
              footer={
                <>
                  <FlowButton variant="ghost" onClick={() => setDialogOpen(false)}>
                    Cancelar
                  </FlowButton>
                  <FlowButton variant="danger" onClick={() => setDialogOpen(false)}>
                    Desconectar
                  </FlowButton>
                </>
              }
            >
              La unidad dejará de recibir viajes. Puedes reconectarla cuando quieras.
            </FlowDialog>
          </Section>

          <Section title="Data — Table · Avatar · Chip · Switch">
            <Stack gap="5">
              <Inline gap="3" align="center" wrap>
                <FlowAvatar name="Ana Ruiz" presence="online" />
                <FlowAvatar name="Beto Lara" size="sm" presence="offline" />
                <FlowAvatar name="Caro Díaz" size="lg" presence="busy" />
                <FlowChip icon="filter_alt" selected>
                  Activas
                </FlowChip>
                <FlowChip onRemove={() => {}}>Norte</FlowChip>
                <FlowSwitch label="En vivo" defaultChecked />
              </Inline>
              <FlowTable<FleetUnit>
                caption="Unidades"
                rowKey={(u) => u.id}
                rows={FLEET_UNITS}
                columns={
                  [
                    { key: "plate", header: "Placa", mono: true },
                    {
                      key: "driver",
                      header: "Conductor",
                      render: (u) => (
                        <Inline gap="2" align="center">
                          <FlowAvatar
                            name={u.driver}
                            size="sm"
                            presence={u.status === "activo" ? "online" : "offline"}
                          />
                          {u.driver}
                        </Inline>
                      ),
                    },
                    {
                      key: "status",
                      header: "Estado",
                      render: (u) => (
                        <FlowBadge
                          tone={
                            u.status === "activo"
                              ? "success"
                              : u.status === "taller"
                                ? "warning"
                                : "danger"
                          }
                          live={u.status === "activo"}
                        >
                          {u.status}
                        </FlowBadge>
                      ),
                    },
                    { key: "earnings", header: "Ingresos", mono: true, align: "end" },
                  ] as TableColumn<FleetUnit>[]
                }
              />
            </Stack>
          </Section>

          <Section title="Navigation — Stepper · Breadcrumb · Pagination · Accordion · Drawer">
            <Stack gap="6">
              <FlowStepper
                current={1}
                steps={[
                  { label: "Datos" },
                  { label: "Vehículo" },
                  { label: "Documentos" },
                  { label: "Listo" },
                ]}
              />
              <Inline gap="5" align="center" justify="between" wrap>
                <FlowBreadcrumb
                  items={[
                    { label: "Inicio", href: "#" },
                    { label: "Flota", href: "#" },
                    { label: "Unidad 214" },
                  ]}
                />
                <FlowPagination page={pageNum} pageCount={20} onChange={setPageNum} />
              </Inline>
              <FlowAccordion
                defaultOpen={["a1"]}
                items={[
                  {
                    id: "a1",
                    title: "¿Cómo conecto una unidad?",
                    content:
                      "Ve a Unidades → Agregar y sigue el asistente. Puedes conectar hasta 3 unidades en el plan gratis.",
                  },
                  {
                    id: "a2",
                    title: "¿Qué pasa si una unidad entra a taller?",
                    content:
                      "Cambia su estado a 'En taller'; dejará de recibir viajes hasta reactivarla.",
                  },
                  {
                    id: "a3",
                    title: "¿Puedo exportar reportes?",
                    content: "Sí, desde Reportes puedes exportar CSV por rango de fechas.",
                  },
                ]}
              />
              <FlowButton variant="secondary" onClick={() => setDrawerOpen(true)}>
                Abrir drawer
              </FlowButton>
              <FlowDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} title="Unidad 214">
                <Stack gap="4">
                  <span>Detalle de la unidad, telemetría y acciones rápidas.</span>
                  <FlowButton variant="accent" onClick={() => setDrawerOpen(false)}>
                    Asignar viaje
                  </FlowButton>
                </Stack>
              </FlowDrawer>
            </Stack>
          </Section>

          <Section title="Selection — Radio · Select · Slider · Segmented">
            <Grid columns="repeat(auto-fit, minmax(240px, 1fr))" gap="6">
              <FlowRadioGroup
                name="plan"
                ariaLabel="Plan"
                value={plan}
                onChange={setPlan}
                options={[
                  { value: "free", label: "Gratis", description: "Hasta 3 unidades" },
                  { value: "pro", label: "Pro", description: "Flota ilimitada + reportes" },
                  {
                    value: "ent",
                    label: "Empresa",
                    description: "SLA y soporte dedicado",
                    disabled: true,
                  },
                ]}
              />
              <Stack gap="4">
                <FlowSelect
                  placeholder="Elige una ciudad"
                  value={city}
                  onChange={setCity}
                  options={[
                    { value: "cdmx", label: "Ciudad de México" },
                    { value: "gdl", label: "Guadalajara" },
                    { value: "mty", label: "Monterrey" },
                  ]}
                />
                <Stack gap="2">
                  <Text variant="caption" color="muted">
                    Multiplicador de tarifa: <strong>{(fare / 50).toFixed(1)}×</strong>
                  </Text>
                  <FlowSlider
                    min={50}
                    max={150}
                    value={fare}
                    aria-label="Multiplicador de tarifa"
                    onChange={(e) => setFare(Number(e.currentTarget.value))}
                  />
                </Stack>
                <FlowSegmentedControl
                  ariaLabel="Turno"
                  value={segment}
                  onChange={setSegment}
                  options={[
                    { value: "dia", label: "Día", icon: "light_mode" },
                    { value: "noche", label: "Noche", icon: "dark_mode" },
                  ]}
                />
              </Stack>
            </Grid>
          </Section>

          <Section title="Feedback — Spinner · Progress · Tooltip · Toast · BottomSheet">
            <Stack gap="5">
              <Inline gap="5" align="center" wrap>
                <FlowSpinner size="sm" />
                <FlowSpinner />
                <FlowSpinner size="lg" />
                <FlowTooltip content="Se sincroniza cada 5 min">
                  <FlowBadge tone="neutral">Sincronizado ·</FlowBadge>
                </FlowTooltip>
              </Inline>
              <Stack gap="3">
                <FlowProgressBar value={68} label="Progreso" />
                <FlowProgressBar label="Cargando" />
              </Stack>
              <Inline gap="3" wrap>
                <FlowButton
                  variant="secondary"
                  onClick={() => toast.show("Unidad 214 conectada.", { tone: "success" })}
                >
                  Toast éxito
                </FlowButton>
                <FlowButton
                  variant="secondary"
                  onClick={() =>
                    toast.show("No pudimos asignar la unidad.", {
                      tone: "danger",
                      action: { label: "Reintentar", onClick: () => {} },
                    })
                  }
                >
                  Toast con acción
                </FlowButton>
                <FlowButton variant="secondary" onClick={() => setSheetOpen(true)}>
                  Abrir bottom sheet
                </FlowButton>
              </Inline>
              <FlowBottomSheet
                open={sheetOpen}
                onClose={() => setSheetOpen(false)}
                title="Detalle de la unidad"
              >
                <Stack gap="4">
                  <span>Unidad 214 · en ruta. Elige una acción rápida.</span>
                  <Inline gap="3">
                    <FlowButton variant="accent" onClick={() => setSheetOpen(false)}>
                      Asignar viaje
                    </FlowButton>
                    <FlowButton variant="ghost" onClick={() => setSheetOpen(false)}>
                      Cerrar
                    </FlowButton>
                  </Inline>
                </Stack>
              </FlowBottomSheet>
            </Stack>
          </Section>

          <Section title="Fintech & data-viz — PaymentCard · Transaction · OTP · Donut · Sparkline">
            <Grid columns="repeat(auto-fit, minmax(260px, 1fr))" gap="5">
              <Stack gap="4">
                <FlowPaymentCard holder="Ana Ruiz" last4="2148" variant="ink" />
                <Inline gap="3">
                  <FlowPaymentCard holder="Ana Ruiz" last4="2148" variant="accent" />
                  <FlowPaymentCard holder="Ana Ruiz" last4="2148" variant="sand" frozen />
                </Inline>
              </Stack>
              <Stack gap="4">
                <FlowCard>
                  <Stack gap="0">
                    {WALLET_TX.map((tx) => (
                      <FlowTransactionRow
                        key={tx.id}
                        icon={tx.icon}
                        title={tx.title}
                        subtitle={tx.subtitle}
                        amount={tx.amount}
                        positive={tx.positive}
                      />
                    ))}
                  </Stack>
                </FlowCard>
                <Inline gap="5" align="center">
                  <FlowDonut value={68} label="Presupuesto" />
                  <FlowSparkline data={[4, 8, 6, 10, 7, 12, 9]} tone="positive" />
                </Inline>
                <FlowOTPInput value={otp} onChange={setOtp} />
              </Stack>
            </Grid>
          </Section>

          <Section title="Data-viz — BarChart · LineChart (paleta categórica validada CVD)">
            <Grid columns="repeat(auto-fit, minmax(320px, 1fr))" gap="6">
              <FlowBarChart
                title="Viajes por día y turno"
                categories={["Lun", "Mar", "Mié", "Jue", "Vie"]}
                formatValue={(n) => `${n}`}
                series={[
                  { name: "Día", values: [120, 145, 132, 160, 178] },
                  { name: "Noche", values: [80, 92, 100, 88, 120] },
                ]}
              />
              <FlowLineChart
                title="Ingresos de la semana (miles)"
                categories={["Lun", "Mar", "Mié", "Jue", "Vie"]}
                formatValue={(n) => `$${n}k`}
                series={[
                  { name: "Centro", values: [8, 12, 10, 14, 18] },
                  { name: "Norte", values: [5, 7, 9, 8, 11] },
                  { name: "Aeropuerto", values: [3, 5, 6, 9, 10] },
                ]}
              />
            </Grid>
          </Section>

          <Section title="Feedback — StatusView">
            <Grid columns="repeat(auto-fit, minmax(240px, 1fr))" gap="4">
              <FlowCard>
                <FlowStatusView
                  tone="success"
                  title="Viaje asignado"
                  message="La unidad 214 va en camino."
                />
              </FlowCard>
              <FlowCard>
                <FlowStatusView
                  tone="error"
                  title="No pudimos conectar"
                  message="Revisa tu conexión e inténtalo de nuevo."
                  primaryAction={<FlowButton variant="accent">Reintentar</FlowButton>}
                />
              </FlowCard>
              <FlowCard>
                <FlowStatusView
                  tone="pending"
                  title="Procesando pago"
                  message="Esto toma unos segundos."
                />
              </FlowCard>
              <FlowCard>
                <FlowStatusView
                  tone="offline"
                  title="Sin conexión"
                  message="Volveremos a intentar automáticamente."
                />
              </FlowCard>
            </Grid>
          </Section>

          <Section title="Template (L5) — OnboardingScreen (móvil)">
            <div className="docs-frame docs-frame--tall docs-frame--phone">
              <OnboardingScreen slides={ONBOARDING_SLIDES} onFinish={() => {}} />
            </div>
          </Section>

          <Section title="Fintech/movilidad — PasscodeKeypad · Biometric · MapCanvas">
            <Grid columns="repeat(auto-fit, minmax(240px, 1fr))" gap="6">
              <FlowPasscodeKeypad length={6} value={passcode} onChange={setPasscode} />
              <FlowBiometricPrompt
                icon="fingerprint"
                title="Confirma con tu huella"
                message="Toca el sensor para autorizar el pago."
                fallback={<FlowButton variant="secondary">Usar código</FlowButton>}
                cancel={<FlowButton variant="ghost">Cancelar</FlowButton>}
              />
              <FlowMapCanvas
                ariaLabel="Mapa con demanda y ruta"
                route={[
                  { x: 12, y: 80 },
                  { x: 40, y: 60 },
                  { x: 62, y: 66 },
                  { x: 86, y: 30 },
                ]}
                pins={[
                  { x: 30, y: 40, label: "1.8×", accent: true },
                  { x: 68, y: 68, label: "$45" },
                  { x: 86, y: 30, label: "Meta" },
                ]}
              />
            </Grid>
          </Section>

          <Section title="Template (L5) — AuthScreen">
            <div className="docs-frame">
              <AuthScreen
                onSubmit={(v) =>
                  toast.show(`Iniciando sesión como ${v.email}`, { tone: "success" })
                }
                onCreateAccount={() => {}}
                onForgotPassword={() => {}}
              />
            </div>
          </Section>

          <Section title="Template (L5) — DashboardOverview (analytics)">
            <div className="docs-frame docs-frame--tall">
              <DashboardOverview
                stats={FLEET_KPIS}
                categories={["Lun", "Mar", "Mié", "Jue", "Vie"]}
                ocupacion={72}
                viajesSeries={[
                  { name: "Día", values: [120, 145, 132, 160, 178] },
                  { name: "Noche", values: [80, 92, 100, 88, 120] },
                ]}
                ingresosSeries={[
                  { name: "Centro", values: [8, 12, 10, 14, 18] },
                  { name: "Norte", values: [5, 7, 9, 8, 11] },
                ]}
              />
            </div>
          </Section>

          <Section title="Template (L5) — WizardScreen (alta multi-paso)">
            <div className="docs-frame docs-frame--tall">
              <WizardScreen onComplete={() => {}} />
            </div>
          </Section>

          <Section title="Template (L5) — SettingsScreen">
            <div className="docs-frame docs-frame--tall">
              <SettingsScreen />
            </div>
          </Section>

          <Section title="Template (L5) — InternalTools (CRM con roles)">
            <div className="docs-frame docs-frame--tall">
              <InternalTools />
            </div>
          </Section>

          <Section title="Template (L5) — ConfigScreen (roles y permisos)">
            <div className="docs-frame docs-frame--tall">
              <ConfigScreen
                roles={["Admin", "Soporte", "Pricing", "Growth"]}
                permissions={[
                  { label: "Ver tickets", allowed: [true, true, false, false] },
                  { label: "Editar pricing", allowed: [true, false, true, false] },
                  { label: "Gestionar roles", allowed: [true, false, false, false] },
                  { label: "Ver growth", allowed: [true, false, false, true] },
                ]}
              />
            </div>
          </Section>

          <Section title="Template (L5) — AgentChat (asistente)">
            <div className="docs-frame docs-frame--tall docs-frame--phone">
              <AgentChat />
            </div>
          </Section>

          <Section title="Template (L5) — DriversApp (móvil)">
            <div className="docs-frame docs-frame--tall docs-frame--phone">
              <DriversApp
                driver="Ana Ruiz"
                earningsToday="$1,840"
                trips="12"
                demand={[
                  { x: 30, y: 40, label: "1.8×", accent: true },
                  { x: 66, y: 60, label: "1.3×" },
                ]}
                incoming={{
                  pickup: "Av. Reforma 222",
                  dropoff: "Aeropuerto T1",
                  fare: "$185",
                  eta: "3 min",
                }}
              />
            </div>
          </Section>

          <Section title="Template (L5) — RoutesScreen (móvil)">
            <div className="docs-frame docs-frame--tall docs-frame--phone">
              <RoutesScreen
                pins={[
                  { x: 24, y: 40, label: "$22", accent: true },
                  { x: 58, y: 34, label: "$25" },
                  { x: 76, y: 66, label: "$21" },
                ]}
                route={[
                  { x: 14, y: 78 },
                  { x: 40, y: 55 },
                  { x: 72, y: 60 },
                ]}
                stations={[
                  { name: "Estación Centro", price: "$22.10", distance: "1.2 km" },
                  { name: "Estación Norte", price: "$25.40", distance: "3.6 km" },
                  { name: "Estación Sur", price: "$21.80", distance: "5.1 km" },
                ]}
              />
            </div>
          </Section>

          <Section title="Template (L5) — AuthOTPScreen (móvil)">
            <div className="docs-frame docs-frame--tall docs-frame--phone">
              <AuthOTPScreen
                destination="+52 ·· ·· 4821"
                onVerified={() => {}}
                onResend={() => {}}
              />
            </div>
          </Section>

          <Section title="Template (L5) — FleetDashboard">
            <div className="docs-frame docs-frame--tall">
              <FleetDashboard kpis={FLEET_KPIS} units={FLEET_UNITS} />
            </div>
          </Section>

          <Section title="Template (L5) — WalletScreen (móvil)">
            <div className="docs-frame docs-frame--tall docs-frame--phone">
              <WalletScreen
                holder="Ana Ruiz"
                last4="2148"
                balance="$12,480"
                spentPercent={68}
                trend={[4, 8, 6, 10, 7, 12, 9]}
                transactions={WALLET_TX}
              />
            </div>
          </Section>
        </Stack>
      </main>
    </div>
  );
}
