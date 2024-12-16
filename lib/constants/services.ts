import { 
  Wrench, 
  Car, 
  Shield, 
  PaintBucket,
  Gauge,
  Battery,
  Droplet, // Replace Oil with Droplet
  Sparkles
} from "lucide-react";

export const SERVICE_NAMES = [
  "Oil Change",
  "Car Inspection",
  "Brake Service",
  "Paint Protection",
  "Diagnostics",
  "Battery Service",
  "Fluid Check",
  "Detailing"
] as const;

export const SERVICE_ICONS = {
  "Oil Change": Droplet,
  "Car Inspection": Car,
  "Brake Service": Shield,
  "Paint Protection": PaintBucket,
  "Diagnostics": Gauge,
  "Battery Service": Battery,
  "Fluid Check": Droplet,
  "Detailing": Sparkles,
} as const;

export function getServiceIcon(name: string) {
  return SERVICE_ICONS[name as keyof typeof SERVICE_ICONS] || Wrench;
}