export interface Device {
  id: number;
  serialNumber: string;
  name: string;
  modelId: number;
  modelConfig: Record<string, any>;
}
