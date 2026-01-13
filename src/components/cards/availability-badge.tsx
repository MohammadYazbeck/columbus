import {Badge} from '@/src/components/ui/badge';

export function AvailabilityBadge({label, active}: {label: string; active: boolean}) {
  return <Badge variant={active ? 'success' : 'danger'}>{label}</Badge>;
}
