import { z } from 'zod';

export const adminLoginSchema = z.object({
  email: z.string().email('Email tidak valid'),
  password: z.string().min(1, 'Password wajib diisi'),
});

export const clientLoginSchema = z.object({
  licenseKey: z.string().min(1, 'License key wajib diisi'),
});

export type AdminLoginInput = z.infer<typeof adminLoginSchema>;
export type ClientLoginInput = z.infer<typeof clientLoginSchema>;
