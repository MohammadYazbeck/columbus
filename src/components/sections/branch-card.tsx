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
    <div className="rounded-[28px] border border-[#ede6df] bg-white shadow-[0_20px_60px_rgba(10,7,4,0.08)]">
      <div className="grid gap-6 p-6 lg:grid-cols-2">
        <div className="space-y-5">
          <div className="relative h-60 overflow-hidden rounded-[22px] border border-[#f2ebe4] bg-[#f8f4ef]">
            <Image
              src={asUploadUrl(branch.imagePath) ?? '/fallback-product.svg'}
              alt={branch.translation.name}
              fill
              className="object-cover transition duration-700 hover:scale-105"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent px-5 pb-4 pt-10 text-white">
              <p className="text-xs uppercase tracking-[0.35em] text-white/70">Colombus</p>
              <h3 className="text-2xl font-semibold">{branch.translation.name}</h3>
            </div>
          </div>
          <p className="text-sm text-[#6d5a4e]">{branch.translation.address}</p>
          <div className="grid gap-2 text-sm text-[#2d211a]">
            {branch.phone && <p className="rounded-[18px] border border-[#f0e7de] bg-[#faf7f3] px-4 py-2">☎ {branch.phone}</p>}
            {branch.mobile && <p className="rounded-[18px] border border-[#f0e7de] bg-[#faf7f3] px-4 py-2">📱 {branch.mobile}</p>}
            {branch.email && <p className="rounded-[18px] border border-[#f0e7de] bg-[#faf7f3] px-4 py-2">✉ {branch.email}</p>}
          </div>
          {branch.directionsUrl && (
            <a
              href={branch.directionsUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#311f15] underline-offset-4 hover:text-[#aa1d1d]"
            >
              {branch.directionsUrl.includes('maps') ? 'Open in Maps' : 'Get directions'}
              <span className="h-px w-6 bg-current" />
            </a>
          )}
        </div>

        <div className="rounded-[22px] border border-[#f0e8e0] bg-[#fdfbf8] p-2">
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
