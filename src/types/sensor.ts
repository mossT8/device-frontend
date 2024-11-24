export interface Sensor {
  id: number;
  name: string;
  code: string;
  unit_id: string;
  config_required: Record<string, any>;
  default_config: Record<string, any>;
  created_at: string;
  modified_at: string;
}
