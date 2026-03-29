import Image from 'next/image';
import {asUploadUrl} from '@/src/lib/media';
import type {Locale} from '@/src/i18n/routing';

type Props = {
  locale: Locale;
  branch: {
    id: number;
    imagePath: string | null;
    phone: string | null;
    mobile: string | null;
    email: string | null;
    googleEmbedUrl: string;
    directionsUrl: string | null;
    translation: {
      name: string;
      address: string;
    };
  };
};

export function BranchCard({branch, locale}: Props) {
  const rawEmbed = branch.googleEmbedUrl?.trim();
  const iframeMatch = rawEmbed?.match(/src="([^"]+)"/i);
  const cleanedEmbed = iframeMatch ? iframeMatch[1] : rawEmbed;
  const isEmbedUrl =
    cleanedEmbed?.includes('/maps/embed') || cleanedEmbed?.includes('output=embed');
  const mapSrc = isEmbedUrl
    ? cleanedEmbed
    : `https://www.google.com/maps?q=${encodeURIComponent(
        branch.translation.address
      )}&output=embed`;
  const isArabic = locale === 'ar';
  const directionsLabel = isArabic
    ? 'الاتجاهات'
    : branch.directionsUrl?.includes('maps')
      ? 'Open in Maps'
      : 'Get directions';

  const contactRows = [
    {
      id: 'phone',
      label: isArabic ? 'الهاتف' : 'Phone',
      value: branch.phone
    },
    {
      id: 'mobile',
      label: isArabic ? 'الموبايل' : 'Mobile',
      value: branch.mobile
    },
    {
      id: 'email',
      label: isArabic ? 'البريد' : 'Email',
      value: branch.email
    }
  ].filter((row) => Boolean(row.value));

  return (
    <article className="overflow-hidden rounded-[30px] border border-[#e8ddd0] bg-[#fffdf9] shadow-[0_30px_65px_rgba(12,8,6,0.08)]">
      <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[300px] lg:min-h-full">
          <Image
            src={asUploadUrl(branch.imagePath) ?? '/fallback-product.svg'}
            alt={branch.translation.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent px-6 pb-6 pt-14 text-white">
            <p className="text-xs uppercase text-white/75">
              {isArabic ? 'مقهى كولومبوس' : 'Colombus Coffeehouse'}
            </p>
            <h3 className="text-2xl font-semibold md:text-3xl">{branch.translation.name}</h3>
          </div>
        </div>

        <div className="flex h-full flex-col gap-6 p-6 md:p-8">
          <div className="space-y-3 border-b border-[#eadfd2] pb-5">
            <p className="text-xs uppercase text-[#ab1d1d]">
              {isArabic ? 'العنوان' : 'Address'}
            </p>
            <p className="text-sm leading-relaxed text-[#4d4034] md:text-base">
              {branch.translation.address}
            </p>
          </div>

          {contactRows.length > 0 && (
            <dl className="grid gap-3 text-sm">
              {contactRows.map((row) => (
                <div key={row.id} className="grid grid-cols-[86px_1fr] items-start gap-3">
                  <dt className="text-xs uppercase text-[#ab1d1d]">{row.label}</dt>
                  <dd className="text-[#1f1915]">{row.value}</dd>
                </div>
              ))}
            </dl>
          )}

          {branch.directionsUrl && (
            <a
              href={branch.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-max items-center gap-2 rounded-full border border-[#ab1d1d] bg-[#ab1d1d] px-5 py-2 text-xs font-semibold uppercase text-white transition hover:bg-[#8f1818]"
            >
              {directionsLabel}
            </a>
          )}

          <div className="mt-auto rounded-[20px] border border-[#eadfd2] bg-white p-2">
            <p className="px-2 pb-2 text-[11px] uppercase text-[#ab1d1d]">
              {isArabic ? 'الموقع على الخريطة' : 'Location map'}
            </p>
            <iframe
              src={mapSrc}
              title={branch.translation.name}
              loading="lazy"
              className="h-64 w-full rounded-[14px] border border-[#f0e8de]"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </article>
  );
}
