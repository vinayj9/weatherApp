import { APP } from "@/config";
import type { WeatherUnitType } from "@/types";

type MarkerProps = {
    temperature: number;
    unit: WeatherUnitType;
    icon: string;
};

export const Marker = ({
    temperature,
    unit,
    icon,
}: MarkerProps) => {
    return (
        <div className="relative ">
            <div
                className="
                    flex items-center gap-2
            rounded-full
            bg-slate-900/95
            text-white
            px-3 py-2
            shadow-2xl
            border border-slate-700
            backdrop-blur-md
                "
            >
                <img
                    src={icon}
                    alt=""
                    className="w-6 h-6"
                />

                <span className="font-semibold">
                    {Math.round(temperature)}
                    {APP.UNIT.TEMP[unit]}
                </span>
            </div>

            <div
                className="
                    absolute
            left-1/2
            -bottom-2
            -translate-x-1/2
            w-3
            h-3
            rotate-45
            bg-slate-900
            border-r
            border-b
            border-slate-700
                "
            />
        </div>
    );
};