type Info = {
  label: string;
  value: string;
};

export function ContactInfo({items}: {items: Info[]}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-2xl border border-white/20 bg-white/70 p-5">
          <p className="text-xs uppercase text-muted-foreground">{item.label}</p>
          <p className="mt-2 text-lg font-semibold text-primary">{item.value}</p>
        </div>
      ))}
    </div>
  );
}
