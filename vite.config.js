import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    // 깃허브 리파지토리 이름을 여기에 적어줘야 해!
    // 예: /my-quiz-repo/
    base: './quizForThuk',
})