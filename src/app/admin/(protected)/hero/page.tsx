import {getAdminHeroImages} from '@/src/lib/admin-data';
import {HeroImagesManager} from '@/src/components/admin/hero-images-manager';

export default async function AdminHeroPage() {
  const heroImages = await getAdminHeroImages();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Hero imagery</p>
        <h1 className="text-3xl font-semibold text-primary">Homepage hero</h1>
      </div>
      <HeroImagesManager heroImages={heroImages} />
    </div>
  );
}
