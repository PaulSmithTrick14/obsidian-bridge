type sides = "left" | "centre" | "right";

export interface BridgeblockParameters {
    title: string
    fold: {
        enabled: boolean;
        placeholder: string;
    }
    position: {
        side: sides
    }
}

export async function parseBridgeblockSource(section: Array<string>): Promise<BridgeblockParameters> {
    const result = {
        title: "",
        fold: {
            enabled: false,
            placeholder: "fold"
        },
        position: {
            side: "centre" as sides
        }
    };

    return result;
}