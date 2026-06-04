import { cn } from "@/lib/utils";
import { assetImage, type AssetKindKey } from "@/lib/asset-images";

type Props = {
  kind: AssetKindKey;
  id: string;
  name: string;
  /** Tailwind gradient classes used as fallback when no image exists. */
  gradient?: string;
  /** Tailwind aspect ratio class (e.g. "aspect-[3/4]"). */
  aspect?: string;
  className?: string;
  /** Set true only for above-the-fold/LCP thumbnails. */
  eager?: boolean;
};

/**
 * Unified asset preview surface.
 * Prefers AI-generated imagery; falls back to a noise-textured gradient
 * so layouts stay visually consistent across asset types and states.
 */
export function AssetThumb({
  kind,
  id,
  name,
  gradient,
  aspect = "aspect-[3/4]",
  className,
  eager,
}: Props) {
  const src = assetImage(kind, id);

  return (
    <div className={cn("relative w-full overflow-hidden bg-muted", aspect, className)}>
      {src ? (
        <img
          src={src}
          alt={name}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          width={1024}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
        />
      ) : (
        <div className={cn("absolute inset-0 bg-gradient-to-br", gradient ?? "from-[#006466] to-[#272640]")}>
          <div className="bg-noise h-full w-full opacity-25" />
        </div>
      )}
    </div>
  );
}
