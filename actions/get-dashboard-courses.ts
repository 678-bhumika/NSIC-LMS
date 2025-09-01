import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "./get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (
  userId: string
): Promise<DashboardCourses> => {
  try {
   
    const coursesFromDB = await db.course.findMany({
      where: { userId }, 
      include: { category: true }, 
    });

    
    const chaptersFromDB = await db.chapter.findMany({
      where: {
        courseId: { in: coursesFromDB.map((c) => c.id) },
        isPublished: true,
      },
    });

    
    const coursesWithChapters: CourseWithProgressWithCategory[] = await Promise.all(
      coursesFromDB.map(async (course) => {
        const progress = await getProgress(userId, course.id);

        return {
          ...course,
          chapters: chaptersFromDB.filter((ch) => ch.courseId === course.id),
          progress: progress ?? 0,
        };
      })
    );

    
    const completedCourses = coursesWithChapters.filter((c) => (c.progress??0) === 100);
    const coursesInProgress = coursesWithChapters.filter(
      (c) => (c.progress??0) > 0 && (c.progress??0) < 100
    );

    return { completedCourses, coursesInProgress };
  } catch (error) {
    console.log("[GET_DASHBOARD_COURSES]:", error);
    return { completedCourses: [], coursesInProgress: [] };
  }
};
