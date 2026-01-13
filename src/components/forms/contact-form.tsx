'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {contactSchema} from '@/src/lib/validation';
import {Input} from '@/src/components/ui/input';
import {Textarea} from '@/src/components/ui/textarea';
import {Label} from '@/src/components/ui/label';
import {Button} from '@/src/components/ui/button';

type FormValues = z.infer<typeof contactSchema>;

type Props = {
  locale: 'en' | 'ar';
  labels: {
    name: string;
    email: string;
    title: string;
    message: string;
    captcha: string;
    submit: string;
  };
  enableCaptcha: boolean;
};

export function ContactForm({locale, labels, enableCaptcha}: Props) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const form = useForm<FormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      locale,
      name: '',
      email: '',
      title: '',
      message: '',
      captchaToken: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    setStatus('idle');
    try {
      const response = await fetch('/api/public/contact', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(values)
      });
      if (!response.ok) throw new Error('Failed');
      form.reset();
      setStatus('success');
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label htmlFor="contact-name">{labels.name}</Label>
          <Input id="contact-name" {...form.register('name')} />
        </div>
        <div>
          <Label htmlFor="contact-email">{labels.email}</Label>
          <Input type="email" id="contact-email" {...form.register('email')} />
        </div>
      </div>
      <div>
        <Label htmlFor="contact-title">{labels.title}</Label>
        <Input id="contact-title" {...form.register('title')} />
      </div>
      <div>
        <Label htmlFor="contact-message">{labels.message}</Label>
        <Textarea id="contact-message" {...form.register('message')} rows={5} />
      </div>
      {enableCaptcha && (
        <div>
          <Label>{labels.captcha}</Label>
          <Input
            placeholder="Captcha token"
            {...form.register('captchaToken')}
            className="bg-muted/40"
          />
        </div>
      )}
      <Button type="submit" className="w-full md:w-auto">
        {labels.submit}
      </Button>
      {status === 'success' && (
        <p className="text-sm text-emerald-600">{locale === 'ar' ? 'تم الإرسال بنجاح' : 'Sent successfully'}</p>
      )}
      {status === 'error' && (
        <p className="text-sm text-rose-600">{locale === 'ar' ? 'تعذر الإرسال' : 'Failed to submit'}</p>
      )}
    </form>
  );
}
