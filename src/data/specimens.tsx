import type { ReactNode } from 'react'
import { Button } from '../ui/primitives/Button'
import { Badge } from '../ui/primitives/Badge'
import { Avatar } from '../ui/primitives/Avatar'
import { Checkbox } from '../ui/primitives/Checkbox'
import { Switch } from '../ui/primitives/Switch'
import { Input } from '../ui/primitives/Input'
import { IconButton } from '../ui/primitives/IconButton'
import { Progress } from '../ui/primitives/Progress'
import { Spinner } from '../ui/primitives/Spinner'
import { StatusPill } from '../ui/primitives/StatusPill'
import { Radio } from '../ui/primitives/Radio'
import { Slider } from '../ui/primitives/Slider'
import { Divider } from '../ui/primitives/Divider'
import { Skeleton } from '../ui/primitives/Skeleton'
import { Tabs } from '../ui/components/Tabs'
import { Accordion } from '../ui/components/Accordion'
import { Tooltip } from '../ui/components/Tooltip'
import { SegmentedControl } from '../ui/components/SegmentedControl'

type SpecimenFn = (state: { variant: string; size: string }) => ReactNode

const registry: Record<string, SpecimenFn> = {
  button: ({ variant, size }) => (
    <Button
      variant={variant as 'primary' | 'secondary' | 'ghost' | 'danger'}
      size={size as 'sm' | 'md' | 'lg'}
    >
      Confirmar
    </Button>
  ),

  badge: () => (
    <Badge tone="success">Activo</Badge>
  ),

  avatar: ({ size }) => (
    <Avatar
      name="Marta Vidal"
      size={size as 'sm' | 'md' | 'lg'}
    />
  ),

  checkbox: () => (
    <Checkbox label="Acepto los términos" />
  ),

  switch: () => (
    <Switch label="Notificaciones" checked />
  ),

  input: ({ size }) => (
    <Input
      placeholder="correo@empresa.com"
      icon="mail"
      size={size as 'sm' | 'md' | 'lg'}
    />
  ),

  'icon-button': ({ variant, size }) => (
    <IconButton
      icon="more_vert"
      variant={variant as 'ghost' | 'tonal' | 'primary' | 'secondary'}
      size={size as 'sm' | 'md' | 'lg'}
      ariaLabel="Más opciones"
    />
  ),

  progress: () => (
    <Progress value={65} />
  ),

  spinner: () => (
    <Spinner size={24} />
  ),

  'status-pill': () => (
    <StatusPill label="En ruta" tone="success" />
  ),

  radio: () => (
    <Radio name="demo" label="Opción A" />
  ),

  slider: () => (
    <Slider min={0} max={100} value={40} />
  ),

  divider: () => (
    <Divider />
  ),

  skeleton: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: 200 }}>
      <Skeleton width="60%" height={16} />
      <Skeleton width="100%" height={12} />
      <Skeleton width="80%" height={12} />
    </div>
  ),

  tabs: () => (
    <Tabs
      value="one"
      onChange={() => {}}
      items={[
        { value: 'one', label: 'Tab uno' },
        { value: 'two', label: 'Tab dos' },
        { value: 'three', label: 'Tab tres' },
      ]}
    />
  ),

  accordion: () => (
    <Accordion
      items={[
        { id: '1', title: '¿Qué es Flow?', content: 'El design system de Edenred.' },
        { id: '2', title: '¿Cuántos componentes?', content: '142 componentes React + Flutter.' },
      ]}
    />
  ),

  tooltip: () => (
    <Tooltip content="Información adicional">
      <Button variant="secondary" size="sm">Hover me</Button>
    </Tooltip>
  ),

  'segmented-control': () => (
    <SegmentedControl
      items={[
        { value: 'day', label: 'Día' },
        { value: 'week', label: 'Semana' },
        { value: 'month', label: 'Mes' },
      ]}
      value="week"
      onChange={() => {}}
    />
  ),
}

export function getSpecimen(componentId: string): SpecimenFn | undefined {
  return registry[componentId]
}
