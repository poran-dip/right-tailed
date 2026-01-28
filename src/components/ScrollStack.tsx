import { useLayoutEffect, useRef, useCallback } from "react"
import type { ReactNode } from "react"
import Lenis from "lenis"

/* =============================
   ScrollStackItem
============================= */

export interface ScrollStackItemProps {
    children: ReactNode
    itemClassName?: string
}

export const ScrollStackItem = ({
    children,
    itemClassName = ""
}: ScrollStackItemProps) => {
    return (
        <div
            className={`scroll-stack-card relative w-full my-10 p-12 rounded-3xl bg-white shadow-lg will-change-transform ${itemClassName}`}
            style={{
                transformStyle: "preserve-3d",
                backfaceVisibility: "hidden"
            }}
        >
            {children}
        </div>
    )
}

/* =============================
   ScrollStack
============================= */

interface ScrollStackProps {
    children: ReactNode
    className?: string
    itemStackDistance?: number
    baseScale?: number
    itemScale?: number
    stackPosition?: number // viewport percentage (0–1)
}

const ScrollStack = ({
    children,
    className = "",
    itemStackDistance = 28,
    baseScale = 0.88,
    itemScale = 0.035,
    stackPosition = 0.2
}: ScrollStackProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null)
    const cardsRef = useRef<HTMLElement[]>([])
    const layoutRef = useRef<
        {
            top: number
            start: number
            end: number
            pin: number
        }[]
    >([])
    const containerEndRef = useRef(0)
    const rafRef = useRef<number | null>(null)
    const lenisRef = useRef<Lenis | null>(null)

    /* =============================
       RAF update (single source)
    ============================= */

    const update = useCallback(() => {
        const rawScrollY = window.scrollY
        const vh = window.innerHeight
        const stackPx = vh * stackPosition

        // ⛔ clamp scroll so cards STOP after section ends
        const cappedScrollY = Math.min(
            rawScrollY,
            containerEndRef.current - vh * 0.4
        )

        layoutRef.current.forEach((layout, i) => {
            const card = cardsRef.current[i]
            if (!card) return

            const progress =
                cappedScrollY <= layout.start
                    ? 0
                    : cappedScrollY >= layout.end
                        ? 1
                        : (cappedScrollY - layout.start) /
                        (layout.end - layout.start)

            const scale =
                1 - progress * (1 - (baseScale + i * itemScale))

            let translateY = 0

            if (cappedScrollY >= layout.pin) {
                const stackProgress = Math.min(
                    1,
                    (cappedScrollY - layout.pin) / itemStackDistance
                )

                const offset = i * itemStackDistance * (1 - stackProgress)

                translateY =
                    cappedScrollY -
                    layout.top +
                    stackPx +
                    offset
            }


            card.style.transform = `translate3d(0, ${translateY}px, 0) scale(${scale})`
        })

        rafRef.current = null
    }, [baseScale, itemScale, itemStackDistance, stackPosition])

    /* =============================
       Setup + teardown
    ============================= */

    useLayoutEffect(() => {
        const container = containerRef.current
        if (!container) return

        const cards = Array.from(
            container.querySelectorAll(".scroll-stack-card")
        ) as HTMLElement[]

        cardsRef.current = cards

        const vh = window.innerHeight
        const stackPx = vh * stackPosition

        layoutRef.current = cards.map((card, i) => {
            const top = card.getBoundingClientRect().top + window.scrollY
            return {
                top,
                start: top - stackPx - i * itemStackDistance,
                end: top - vh * 0.1,
                pin: top - stackPx - i * itemStackDistance
            }
        })

        // ⛔ define where the stack ENDS
        containerEndRef.current =
            container.getBoundingClientRect().bottom + window.scrollY

        const lenis = new Lenis({
            smoothWheel: true,
            duration: 1.1,
            lerp: 0.12
        })

        lenis.on("scroll", () => {
            if (!rafRef.current) {
                rafRef.current = requestAnimationFrame(update)
            }
        })

        const raf = (time: number) => {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)

        lenisRef.current = lenis
        update()

        return () => {
            lenis.destroy()
            if (rafRef.current) cancelAnimationFrame(rafRef.current)
        }
    }, [update, itemStackDistance, stackPosition])

    return (
        <div ref={containerRef} className={`relative ${className}`}>
            <div className="pb-[20vh]">{children}</div>
        </div>
    )
}

export default ScrollStack
