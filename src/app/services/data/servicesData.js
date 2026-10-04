import { 
  ShieldAlert, 
  Droplet, 
  Cpu, 
  Compass, 
  BatteryCharging, 
  Flame, 
  FileCheck, 
  ThermometerSnowflake, 
  Crosshair, 
  Zap, 
  Sun, 
  Gauge, 
  Sparkles 
} from 'lucide-react';

export const servicesData = [
  {
    id: 'premium-brake',
    title: 'Premium Brake Inspection & Repair',
    description: 'Ensure ultimate safety and stopping power with our advanced brake inspections, pad replacements, and genuine Mercedes parts.',
    image: '/images/services/banne-right.webp', //[cite: 1]
    imagePosition: 'left',
    icon: ShieldAlert,
  },
  {
    id: 'oil-fluid',
    title: 'Mercedes Oil & Fluid Services',
    description: 'Enhance your engine\'s longevity with premium synthetic oil changes and essential fluid replacements approved by Mercedes-Benz.',
    image: '/images/services/banner-preview3.png', //[cite: 1]
    imagePosition: 'right',
    icon: Droplet,
  },
  {
    id: 'engine-maintenance',
    title: 'Engine Maintenance & Repair',
    description: 'From routine tuning to complete mechanical repairs, our certified experts ensure your Mercedes engine delivers maximum power.',
    image: '/images/services/bg-metabox-1.webp', //[cite: 1]
    imagePosition: 'left',
    icon: Cpu,
  },
  {
    id: 'steering-airmatic',
    title: 'Steering & Airmatic Suspension',
    description: 'Maintain a flawlessly smooth ride with expert diagnostics and repairs for complex Mercedes steering and air suspension systems.',
    image: '/images/services/bg-metabox-2.webp', //[cite: 1]
    imagePosition: 'right',
    icon: Compass,
  },
  {
    id: 'battery',
    title: 'Battery Diagnostics & Coding',
    description: 'Avoid unexpected breakdowns with advanced AGM battery testing, seamless replacements, and accurate computer system coding.',
    image: '/images/services/car-1.webp', //[cite: 1]
    imagePosition: 'left',
    icon: BatteryCharging,
  },
  {
    id: 'amg-exhaust',
    title: 'AMG & Exhaust System Repair',
    description: 'Preserve that signature AMG sound and optimal performance with our specialized exhaust leak repairs and emission diagnostics.',
    image: '/images/services/car-2.webp', //[cite: 1]
    imagePosition: 'left',
    icon: Flame,
  },
  {
    id: 'pre-purchase',
    title: 'Mercedes Pre-Purchase Inspection',
    description: 'Buying a used Mercedes? Get complete peace of mind with our comprehensive 360-degree vehicle health and diagnostic check.',
    image: '/images/services/image-blog-1.webp', //[cite: 1]
    imagePosition: 'right',
    icon: FileCheck,
  },
  {
    id: 'cooling',
    title: 'Advanced Cooling System Repair',
    description: 'Prevent overheating in the extreme climate. We offer specialized radiator flushes, water pump repairs, and coolant leak fixes.',
    image: '/images/services/image-blog-2.webp', //[cite: 1]
    imagePosition: 'left',
    icon: ThermometerSnowflake,
  },
  {
    id: 'wheel-alignment',
    title: '3D Laser Wheel Alignment',
    description: 'Ensure perfect handling and prevent uneven tire wear with our state-of-the-art 3D laser alignment specifically calibrated for Mercedes.',
    image: '/images/services/image-blog-3.webp', //[cite: 1]
    imagePosition: 'right',
    icon: Crosshair,
  },
  {
    id: 'electrical',
    title: 'Complex Electrical & Wiring',
    description: 'Resolve intricate electrical faults swiftly. Our specialists handle everything from SAM module programming to complex sensor replacements.',
    image: '/images/services/image-blog-5.webp', //[cite: 1]
    imagePosition: 'left',
    icon: Zap,
  },
  {
    id: 'sunroof',
    title: 'Panoramic Sunroof Maintenance',
    description: 'Prevent water leaks and jammed mechanisms. We provide specialized track cleaning, lubrication, and repairs for Mercedes panoramic roofs.',
    image: '/images/services/image-blog-6.webp', //[cite: 1]
    imagePosition: 'right',
    icon: Sun,
  },
  {
    id: 'amg-tuning',
    title: 'AMG Performance & Tuning',
    description: 'Unlock the true potential of your AMG. We provide expert ECU programming and performance upgrades for ultimate driving.',
    image: '/images/services/imag-post-3.webp', //[cite: 1]
    imagePosition: 'left',
    icon: Gauge,
  },
  {
    id: 'detailing',
    title: 'Luxury Detailing & Polishing',
    description: 'Protect your vehicle\'s finish from the harsh weather with our premium exterior polishing, ceramic coating, and interior leather care.',
    image: '/images/services/mercedes-car.png', //[cite: 1]
    imagePosition: 'right',
    icon: Sparkles,
  },
];