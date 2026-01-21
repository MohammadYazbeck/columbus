import Image from 'next/image';
import {asUploadUrl} from '@/src/lib/media';

type Props = {
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

export function BranchCard({branch}: Props) {
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

  return (
    <div className="overflow-hidden rounded-[22px] border border-[#efe7df] bg-[#fdf7f2] shadow-[0_30px_70px_rgba(12,8,6,0.08)]">
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative min-h-[260px]">
          <Image
            src={asUploadUrl(branch.imagePath) ?? '/fallback-product.svg'}
            alt={branch.translation.name}
            fill
            className="object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent px-6 pb-5 pt-12 text-white">
            <p className="text-xs uppercase tracking-[0.35em] text-white/70">
              Colombus Coffeehouse
            </p>
            <h3 className="text-2xl font-semibold">{branch.translation.name}</h3>
          </div>
        </div>

        <div className="flex h-full flex-col gap-6 p-6">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.35em] text-[#aa1d1d]">
              {branch.translation.name}
            </p>
            <p className="text-sm text-muted-foreground">{branch.translation.address}</p>
          </div>

          <div className="grid gap-2 text-sm text-primary/80">
            {branch.phone && (
              <p className="flex items-center gap-2">
                <span className="text-[#aa1d1d]">☎</span>
                {branch.phone}
              </p>
            )}
            {branch.mobile && (
              <p className="flex items-center gap-2">
                <span className="text-[#aa1d1d]">📱</span>
                {branch.mobile}
              </p>
            )}
            {branch.email && (
              <p className="flex items-center gap-2">
                <span className="text-[#aa1d1d]">✉</span>
                {branch.email}
              </p>
            )}
          </div>

          {branch.directionsUrl && (
            <a
              href={branch.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-max items-center gap-2 rounded-full border border-[#aa1d1d] px-5 py-2 text-xs font-semibold uppercase tracking-[0.35em] text-[#aa1d1d] transition hover:bg-[#aa1d1d]/10"
            >
              {branch.directionsUrl.includes('maps') ? 'Open in Maps' : 'Get directions'}
            </a>
          )}

          <div className="mt-auto rounded-[18px] border border-[#efe7df] bg-white p-2">
            <iframe
              src={mapSrc}
              title={branch.translation.name}
              loading="lazy"
              className="h-64 w-full rounded-[14px]"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
