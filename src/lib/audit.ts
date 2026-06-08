import { prisma } from "./prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";

export async function recordLog({
    action,
    target,
    details,
    metadata,
}: {
    action: string;
    target: string;
    details?: string;
    metadata?: any;
}) {
    try {
        const session = await getServerSession(authOptions);
        const userId = (session?.user as any)?.id;

        return await prisma.auditLog.create({
            data: {
                userId,
                action,
                target,
                details,
                metadata: metadata ? JSON.parse(JSON.stringify(metadata)) : undefined,
            },
        });
    } catch (error) {
        console.error("Failed to record audit log:", error);
    }
}
