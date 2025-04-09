'use client'

import { useRouter } from "next/navigation"

const Hieu11 = () => {
    const router = useRouter();
    const goHome = () => {
        router.push('/')
    }
    return (
        <div>
            <>Signup Page</>
            <button onClick={goHome}>back home</button>
        </div>

    )
}
export default Hieu11