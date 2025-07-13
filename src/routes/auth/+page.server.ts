import type { Actions } from './$types';

import { fail, redirect } from '@sveltejs/kit';
import * as v from 'valibot';

import { m } from '$lib/i18n/messages';

const PASSWORD_REGEX = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}/;

const EmailInput = v.pipe(
  v.string(m.auth_email_error({ type: 'invalid' })),
  v.email(m.auth_email_error({ type: 'invalid' })),
  v.nonEmpty(m.auth_email_error({ type: 'empty' })),
  v.trim()
);
const PasswordInput = v.pipe(
  v.string(m.auth_password_error({ type: 'invalid' })),
  v.minLength(8, m.auth_password_error({ type: 'min_length' })),
  v.nonEmpty(m.auth_password_error({ type: 'invalid' })),
  v.regex(PASSWORD_REGEX, m.auth_password_error({ type: 'secure' })),
  v.trim()
);
const SignInInput = v.object({ email: EmailInput, password: PasswordInput });
const SignUpInput = v.object({
  email: EmailInput,
  first_name: v.pipe(
    v.string(m.auth_sign_up_error_first_name({ type: 'invalid' })),
    v.nonEmpty(m.auth_sign_up_error_first_name({ type: 'empty' })),
    v.trim()
  ),
  last_name: v.pipe(
    v.string(m.auth_sign_up_error_last_name({ type: 'invalid' })),
    v.nonEmpty(m.auth_sign_up_error_last_name({ type: 'empty' })),
    v.trim()
  ),
  password: PasswordInput
});

export const load = () => {
  throw redirect(301, '/auth/sign-in');
};

// On failing, we return only the first issue
export const actions: Actions = {
  'sign-in': async ({ locals: { supabase }, request }) => {
    const formData = v.safeParse(SignInInput, Object.fromEntries(await request.formData()));
    if (!formData.success) {
      return fail(400, { error: formData.issues[0].message });
    }

    const { error } = await supabase.auth.signInWithPassword(formData.output);
    if (error) {
      return fail(404, { error: error.message });
    }

    redirect(303, '/');
  },
  'sign-up': async ({ locals: { supabase }, request }) => {
    const formData = v.safeParse(SignUpInput, Object.fromEntries(await request.formData()));
    if (!formData.success) {
      return fail(400, { error: formData.issues[0].message });
    }

    const { email, password, ...metadata } = formData.output;
    const { error } = await supabase.auth.signUp({
      email,
      options: { data: metadata },
      password
    });

    if (error) {
      return fail(404, { error: error.message });
    }

    redirect(303, '/');
  }
};

