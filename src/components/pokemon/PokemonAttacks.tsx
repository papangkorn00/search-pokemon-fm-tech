import { PokemonAttacks as PokemonAttacksType } from "@/types";
import PokemonTypeBadge from "@/components/ui/PokemonTypeBadge";

export default function PokemonAttacks({ attacks }: { attacks?: PokemonAttacksType }) {
  if (!attacks) return null;

  return (
    <div className="bg-slate p-6 border border-image-frame rounded-card">
      <h3 className="font-sans font-bold text-[24px] uppercase text-hazard-white mb-4 border-b border-secondary pb-2">
        Attacks
      </h3>

      {attacks.fast && attacks.fast.length > 0 && (
        <div className="mb-4">
          <p className="font-mono text-yellow text-[12px] uppercase mb-3 tracking-[1px] bg-canvas p-2 border border-yellow">Fast Attacks</p>
          <div className="flex flex-col gap-2">
            {attacks.fast.map(a => (
              <div key={a.name} className="flex justify-between items-center border-b border-image-frame pb-2">
                <span className="font-sans font-semibold text-hazard-white">{a.name}</span>
                <div className="flex items-center gap-3">
                  <PokemonTypeBadge type={a.type} size="md" />
                  <span className="font-mono text-[14px] text-hazard-white font-bold w-6 text-right">{a.damage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {attacks.special && attacks.special.length > 0 && (
        <div>
          <p className="font-mono text-purple text-[12px] uppercase mb-3 mt-6 tracking-[1px] bg-canvas p-2 border border-purple">Special Attacks</p>
          <div className="flex flex-col gap-2">
            {attacks.special.map(a => (
              <div key={a.name} className="flex justify-between items-center border-b border-image-frame pb-2">
                <span className="font-sans font-semibold text-hazard-white">{a.name}</span>
                <div className="flex items-center gap-3">
                  <PokemonTypeBadge type={a.type} size="md" />
                  <span className="font-mono text-[14px] text-hazard-white font-bold w-6 text-right">{a.damage}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
