import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

import { db } from "@/lib/db";

type ChapterUpdate={
    id: string;
    position: number;
};

export async function PUT(
    req: Request,
    {params}: {params: {courseId: string}}
){
    try{
        const {userId} = await auth();

        if (!userId){
            return new NextResponse("Unauthorized", {status: 401});
        }

        const body = await req.json();
        const list: ChapterUpdate[] = body.list;

        if(!Array.isArray(list)){
            return new NextResponse("Invalid request", {status: 400});
        }

        const ownCourse = await db.course.findFirst({
            where: {
                id: params.courseId,
                userId: userId
            }
        });

        if(!ownCourse){
            return new NextResponse("Unauthorized", {status: 401});
        }

        await Promise.all(
            list.map((item) => db.chapter.update({
                where:{id:item.id},
                data:{position: item.position},
            }))
        );

        return new NextResponse("Chapters reordered successfully", {status: 200});

    }catch(error){
        console.log("[REORDER]", error);
        return new NextResponse("Internal Error", {status: 500});
    }
}