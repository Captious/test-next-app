import { z } from 'zod';

export const UserSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.email('Invalid email address'),
    createdAt: z
        .date()
        .or(z.string().refine((val) => !isNaN(Date.parse(val)), 'Invalid date')),
});

export type UserInput = z.infer<typeof UserSchema>;