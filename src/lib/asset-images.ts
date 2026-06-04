// Central registry mapping mock asset IDs to AI-generated preview images.
// Falls back to gradient covers when no image is registered.
import nova from "@/assets/asset-nova.jpg";
import echo from "@/assets/asset-echo.jpg";
import lyric from "@/assets/asset-lyric.jpg";
import pulse from "@/assets/asset-pulse.jpg";
import halo from "@/assets/asset-halo.jpg";
import mute from "@/assets/asset-mute.jpg";

import holoMic from "@/assets/asset-holo-mic.jpg";
import bike from "@/assets/asset-bike.jpg";
import drone from "@/assets/asset-prop-drone.jpg";
import jacket from "@/assets/asset-prop-jacket.jpg";
import neonSign from "@/assets/asset-prop-neon.jpg";
import synth from "@/assets/asset-prop-synth.jpg";
import trench from "@/assets/asset-prop-trench.jpg";
import hoverboard from "@/assets/asset-prop-hoverboard.jpg";
import visor from "@/assets/asset-prop-visor.jpg";
import mixConsole from "@/assets/asset-prop-console.jpg";

import rooftop from "@/assets/asset-rooftop.jpg";
import alley from "@/assets/asset-alley.jpg";
import backstage from "@/assets/asset-bg-backstage.jpg";
import studio from "@/assets/asset-bg-studio.jpg";
import underpass from "@/assets/asset-bg-underpass.jpg";
import skybridge from "@/assets/asset-bg-skybridge.jpg";
import loft from "@/assets/asset-bg-loft.jpg";
import platform from "@/assets/asset-bg-platform.jpg";

import themeNeoTokyo from "@/assets/asset-theme-neotokyo.jpg";
import themeVelvet from "@/assets/asset-theme-velvet.jpg";
import themeConcrete from "@/assets/asset-theme-concrete.jpg";

export type AssetKindKey = "character" | "prop" | "background" | "theme";

const REGISTRY: Record<AssetKindKey, Record<string, string>> = {
  character: { c1: nova, c2: echo, c3: lyric, c4: pulse, c5: halo, c6: mute },
  prop: {
    pr1: holoMic,
    pr2: drone,
    pr3: jacket,
    pr4: bike,
    pr5: neonSign,
    pr6: synth,
    pr7: trench,
    pr8: hoverboard,
    pr9: visor,
    pr10: mixConsole,
  },
  background: {
    b1: rooftop,
    b2: backstage,
    b3: studio,
    b4: underpass,
    b5: alley,
    b6: skybridge,
    b7: loft,
    b8: platform,
  },
  theme: { t1: themeNeoTokyo, t2: themeConcrete, t3: themeVelvet },
};

export function assetImage(kind: AssetKindKey, id: string): string | undefined {
  return REGISTRY[kind]?.[id];
}
