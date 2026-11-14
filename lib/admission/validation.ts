export interface AdmissionInput {
  studentFullName: string
  fatherName: string
  studentAge: number
  city: string
  qualification: string
  whatsappNumber: string
  enrolledCourse: string
  feePaid: number
  batchNumber: string
  managerName: string
}

export const VALID_COURSES = [
  "Artificial Intelligence (AI)",
  "Social Media Marketing (SMM)",
  "Crypto Trading",
] as const

export function validateAdmission(input: any): {
  valid: boolean
  data?: AdmissionInput
  errors?: string[]
} {
  const errors: string[] = []

  const fullName = String(input?.studentFullName || "").trim()
  const fatherName = String(input?.fatherName || "").trim()
  const age = Number(input?.studentAge)
  const city = String(input?.city || "").trim()
  const qualification = String(input?.qualification || "").trim()
  const whatsapp = String(input?.whatsappNumber || "").replace(/\s/g, "")
  const course = String(input?.enrolledCourse || "").trim()
  const fee = Number(input?.feePaid)
  const batch = String(input?.batchNumber || "").trim()
  const manager = String(input?.managerName || "").trim()

  if (fullName.length < 3 || fullName.length > 100)
    errors.push("Student name must be 3-100 characters")

  if (fatherName.length < 3 || fatherName.length > 100)
    errors.push("Father's name must be 3-100 characters")

  if (!Number.isInteger(age) || age < 5 || age > 80)
    errors.push("Age must be between 5 and 80")

  if (city.length < 2 || city.length > 80)
    errors.push("City must be 2-80 characters")

  if (qualification.length < 2 || qualification.length > 100)
    errors.push("Qualification must be 2-100 characters")

  if (!/^03\d{9}$/.test(whatsapp))
    errors.push("WhatsApp must be a valid Pakistani number (03XXXXXXXXX)")

  if (!VALID_COURSES.includes(course as any))
    errors.push("Invalid course selected")

  if (!Number.isInteger(fee) || fee < 0 || fee > 500000)
    errors.push("Fee must be between 0 and 500,000")

  if (batch.length < 1 || batch.length > 30)
    errors.push("Batch number is required")

  if (manager.length < 2 || manager.length > 100)
    errors.push("Manager name must be 2-100 characters")

  if (errors.length > 0) return { valid: false, errors }

  return {
    valid: true,
    data: {
      studentFullName: fullName,
      fatherName,
      studentAge: age,
      city,
      qualification,
      whatsappNumber: whatsapp,
      enrolledCourse: course,
      feePaid: fee,
      batchNumber: batch,
      managerName: manager,
    },
  }
}