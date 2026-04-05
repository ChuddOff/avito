import type { AdCategory, AdParams } from "../api";
import { getAdParamEntries } from "../lib/get-ad-param-entries";

type Props = {
  category: AdCategory;
  params: AdParams;
};

export function AdParamsList({ category, params }: Props) {
  const entries = getAdParamEntries(category, params);

  if (!entries.length) {
    return <p className=" text-based text-start">Характеристики не указаны</p>;
  }

  return (
    <dl className="grid grid-cols-[160px_1fr] gap-x-6 gap-y-2 text-sm ">
      {entries.map((entry) => (
        <div key={entry.key} className="contents">
          <dt className="text-bold-based text-gray-text2">{entry.label}</dt>
          <dd className="text-based text-black2">{entry.value}</dd>
        </div>
      ))}
    </dl>
  );
}
