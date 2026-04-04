import type { AdCategory, AdParams } from "../api";
import { getAdParamEntries } from "../lib/get-ad-param-entries";

type Props = {
  category: AdCategory;
  params: AdParams;
};

export function AdParamsList({ category, params }: Props) {
  const entries = getAdParamEntries(category, params);

  if (!entries.length) {
    return (
      <p className="text-sm text-muted-foreground">Характеристики не указаны</p>
    );
  }

  return (
    <dl className="grid grid-cols-[160px_1fr] gap-x-6 gap-y-2 text-sm">
      {entries.map((entry) => (
        <div key={entry.key} className="contents">
          <dt className="text-muted-foreground">{entry.label}</dt>
          <dd className="text-foreground">{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}
