import { z } from 'zod';

const userSchema = z.object({
  name: z.string({
    invalid_type_error: 'El nombre debe ser un texto',
    required_error: 'El nombre es requerido'
  }),
  age: z.number({
    invalid_type_error: 'La edad debe ser un número',
    required_error: 'La edad es requerida'
  }).int().positive(),
  email: z.string({
    required_error: 'El email es requerida'
  }).email({
    invalid_type_error: 'Formato incorrecto '
  }),
  role: z.enum(['admin', 'grte', 'emp'],
    {
      invalid_type_error: 'El rol debe ser admin, grte o emp',
      required_error: 'El rol es requerido'
    })
});

function validateUser (object) {
  return userSchema.safeParse(object);
}

function validatePartialUser (object) {
  return userSchema.partial().safeParse(object);
}

export { validateUser, validatePartialUser };
