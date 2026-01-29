'use client'

import { useStudentData } from '../layout'
import AchievementsPage from '@/components/dashboard/Achievements'

const Achievements = () => {
  const { student } = useStudentData()

  return <AchievementsPage student={student} />
}

export default Achievements
