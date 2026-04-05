import {getAdminHeroImages} from '@/src/lib/admin-data';
import {getAdminLocale} from '@/src/lib/admin-locale';
import {HeroImagesManager} from '@/src/components/admin/hero-images-manager';

export default async function AdminHeroPage() {
  const locale = getAdminLocale();
  const heroImages = await getAdminHeroImages();

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase text-muted-foreground">{locale === 'ar' ? 'صور الهيرو' : 'Hero imagery'}</p>
        <h1 className="text-3xl font-semibold text-primary">{locale === 'ar' ? 'هيرو الصفحة الرئيسية' : 'Homepage hero'}</h1>
      </div>
      <HeroImagesManager heroImages={heroImages} locale={locale} />
    </div>
  );
}
