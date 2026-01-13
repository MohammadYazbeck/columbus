'use client';

import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import {z} from 'zod';
import {jobApplicationSchema} from '@/src/lib/validation';
import {Input} from '@/src/components/ui/input';
import {Label} from '@/src/components/ui/label';
import {Select} from '@/src/components/ui/select';
import {Button} from '@/src/components/ui/button';

type FormValues = z.infer<typeof jobApplicationSchema>;

type Option = {
  id: number;
  title: string;
};

type Props = {
  locale: 'en' | 'ar';
  options: Option[];
  labels: {
    selectRole: string;
    placeholder: string;
    form: {
      fullName: string;
      birthDate: string;
      bornCity: string;
      sex: string;
      nationality: string;
      phoneNumber: string;
      email: string;
      socialState: string;
      cv: string;
      submit: string;
      captcha: string;
    };
  };
  enableCaptcha: boolean;
};

export function CareerForm({locale, options, labels, enableCaptcha}: Props) {
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const form = useForm<FormValues>({
    resolver: zodResolver(jobApplicationSchema),
    defaultValues: {
      locale,
      careerSlotId: options[0]?.id ?? 0,
      fullName: '',
      birthDate: '',
      bornCity: '',
      sex: 'male',
      nationality: '',
      phoneNumber: '',
      email: '',
      socialState: 'single',
      captchaToken: ''
    }
  });

  const onSubmit = async (values: FormValues) => {
    setStatus('idle');
    try {
      const formData = new FormData();
      Object.entries(values).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      if (cvFile) {
        formData.append('cv', cvFile);
      }
      const response = await fetch('/api/public/job-apply', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) throw new Error('Failed');
      setStatus('success');
      form.reset();
      setCvFile(null);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
      <div>
        <Label htmlFor="career-slot">{labels.selectRole}</Label>
        <Select
          id="career-slot"
          value={form.watch('careerSlotId').toString()}
          onChange={(event) => form.setValue('careerSlotId', Number(event.target.value))}
        >
          {options.map((option) => (
            <option key={option.id} value={option.id}>
              {option.title}
            </option>
          ))}
        </Select>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <Label>{labels.form.fullName}</Label>
          <Input {...form.register('fullName')} />
        </div>
        <div>
          <Label>{labels.form.birthDate}</Label>
          <Input type="date" {...form.register('birthDate')} />
        </div>
        <div>
          <Label>{labels.form.bornCity}</Label>
          <Input {...form.register('bornCity')} />
        </div>
        <div>
          <Label>{labels.form.sex}</Label>
          <Select
            value={form.watch('sex')}
            onChange={(event) => form.setValue('sex', event.target.value as 'male' | 'female')}
          >
            <option value="male">{locale === 'ar' ? 'ذكر' : 'Male'}</option>
            <option value="female">{locale === 'ar' ? 'أنثى' : 'Female'}</option>
          </Select>
        </div>
        <div>
          <Label>{labels.form.nationality}</Label>
          <Input {...form.register('nationality')} />
        </div>
        <div>
          <Label>{labels.form.phoneNumber}</Label>
          <Input {...form.register('phoneNumber')} />
        </div>
        <div>
          <Label>{labels.form.email}</Label>
          <Input type="email" {...form.register('email')} />
        </div>
        <div>
          <Label>{labels.form.socialState}</Label>
          <Select
            value={form.watch('socialState')}
            onChange={(event) =>
              form.setValue('socialState', event.target.value as 'single' | 'married')
            }
          >
            <option value="single">{locale === 'ar' ? 'أعزب' : 'Single'}</option>
            <option value="married">{locale === 'ar' ? 'متزوج' : 'Married'}</option>
          </Select>
        </div>
      </div>
      <div>
        <Label>{labels.form.cv}</Label>
        <Input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(event) => setCvFile(event.target.files?.[0] ?? null)}
        />
      </div>
      {enableCaptcha && (
        <div>
          <Label>{labels.form.captcha}</Label>
          <Input
            placeholder="Captcha token"
            className="bg-muted/40"
            value={form.watch('captchaToken')}
            onChange={(event) => form.setValue('captchaToken', event.target.value)}
          />
        </div>
      )}
      <Button type="submit" className="w-full md:w-auto">
        {labels.form.submit}
      </Button>
      {status === 'success' && (
        <p className="text-sm text-emerald-600">
          {locale === 'ar' ? 'تم إرسال الطلب بنجاح' : 'Application sent'}
        </p>
      )}
      {status === 'error' && (
        <p className="text-sm text-rose-600">
          {locale === 'ar' ? 'حدث خطأ أثناء الإرسال' : 'Submission failed'}
        </p>
      )}
    </form>
  );
}
