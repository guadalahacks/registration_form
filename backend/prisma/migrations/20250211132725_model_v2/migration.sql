-- CreateTable
CREATE TABLE "registration_form" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "phoneNumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "studentID" TEXT NOT NULL,
    "countryOfResidence" TEXT NOT NULL,
    "school" TEXT NOT NULL,
    "major" TEXT NOT NULL,
    "classification" TEXT NOT NULL,
    "anticipatedGraduationYear" INTEGER NOT NULL,
    "currentLevelOfStudy" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "hackathonsAttended" INTEGER NOT NULL,
    "technicalSkills" TEXT[],
    "dietaryRestrictions" TEXT[],
    "allergiesOrRestrictions" TEXT,
    "hasTeam" BOOLEAN NOT NULL,
    "heardAboutGuadalahacks" TEXT NOT NULL,
    "shirtSize" TEXT NOT NULL,
    "resume" TEXT NOT NULL,
    "additionalLinks" TEXT,
    "specialAccommodations" TEXT,
    "followUpForAccessibility" BOOLEAN NOT NULL,
    "emergencyContactName" TEXT NOT NULL,
    "emergencyContactRelationship" TEXT NOT NULL,
    "emergencyContactPhoneNumber" TEXT NOT NULL,
    "emergencyContactEmail" TEXT NOT NULL,
    "additionalInfo" TEXT,

    CONSTRAINT "registration_form_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "registration_form_email_key" ON "registration_form"("email");

-- CreateIndex
CREATE UNIQUE INDEX "registration_form_studentID_key" ON "registration_form"("studentID");
