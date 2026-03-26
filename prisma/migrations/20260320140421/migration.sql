/*
  Warnings:

  - A unique constraint covering the columns `[course,section,semester]` on the table `classes` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "classes_course_section_semester_key" ON "classes"("course", "section", "semester");
