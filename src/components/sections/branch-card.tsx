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
  return (
    <div className="rounded-[28px] border border-[#efe7df] bg-white">
      <div className="grid gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="relative h-60 overflow-hidden rounded-[22px] border border-[#f2ebe4] bg-[#f8f4ef] shadow-[0_18px_40px_rgba(12,8,6,0.12)]">
            <Image
              src={asUploadUrl(branch.imagePath) ?? '/fallback-product.svg'}
              alt={branch.translation.name}
              fill
              className="object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent px-5 pb-4 pt-10 text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">Colombus</p>
              <h3 className="text-2xl font-semibold">{branch.translation.name}</h3>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{branch.translation.address}</p>
          <div className="grid gap-2 text-sm text-primary">
            {branch.phone && (
              <p className="rounded-[18px] border border-[#efe7df] bg-[#faf7f3] px-4 py-2">
                ☎ {branch.phone}
              </p>
            )}
            {branch.mobile && (
              <p className="rounded-[18px] border border-[#efe7df] bg-[#faf7f3] px-4 py-2">
                📱 {branch.mobile}
              </p>
            )}
            {branch.email && (
              <p className="rounded-[18px] border border-[#efe7df] bg-[#faf7f3] px-4 py-2">
                ✉ {branch.email}
              </p>
            )}
          </div>
          {branch.directionsUrl && (
            <a
              href={branch.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#aa1d1d] underline-offset-4 hover:underline"
            >
              {branch.directionsUrl.includes('maps') ? 'Open in Maps' : 'Get directions'}
              <span className="h-px w-6 bg-current" />
            </a>
          )}
        </div>

        <div className="rounded-[22px] border border-[#efe7df] bg-[#fdfbf8] p-2">
          <iframe
            src={branch.googleEmbedUrl}
            title={branch.translation.name}
            loading="lazy"
            className="h-72 w-full rounded-[18px]"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </div>
  );
}
