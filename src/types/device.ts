export interface Device {
  id: number;
  serial_number: string;
  name: string;
  model_id: number;
  model_config: Record<string, any>;
  created_at: string;
  modified_at: string;
}
