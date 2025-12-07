"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const dots: Array<{
      x: number
      y: number
      vx: number
      vy: number
      baseY: number
    }> = []

    const dotSize = 2
    const dotSpacing = 30
    const dotCount = Math.ceil((canvas.width / dotSpacing) * (canvas.height / dotSpacing))

    // Initialize dots in a grid pattern
    let index = 0
    for (let y = 0; y < canvas.height; y += dotSpacing) {
      for (let x = 0; x < canvas.width; x += dotSpacing) {
        if (index < dotCount) {
          dots.push({
            x,
            y,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            baseY: y,
          })
          index++
        }
      }
    }

    let animationFrameId: number
    let time = 0

    const animate = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      time += 0.01

      dots.forEach((dot, i) => {
        // Create wave effect using sine waves
        dot.y = dot.baseY + Math.sin(time + i * 0.05) * 15 + Math.sin(time * 0.5 + i * 0.02) * 10
        dot.x += Math.sin(time * 0.3 + i * 0.01) * 0.3

        // Keep dots within bounds
        if (dot.x < 0) dot.x = canvas.width
        if (dot.x > canvas.width) dot.x = 0

        // Draw dot
        ctx.fillStyle = `rgba(255, 255, 255, ${0.4 + Math.sin(time + i) * 0.2})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, dotSize, 0, Math.PI * 2)
        ctx.fill()

        // Draw connecting lines
        dots.forEach((otherDot, j) => {
          if (j > i) {
            const dx = dot.x - otherDot.x
            const dy = dot.y - otherDot.y
            const distance = Math.sqrt(dx * dx + dy * dy)

            if (distance < 80) {
              ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 80)})`
              ctx.lineWidth = 0.5
              ctx.beginPath()
              ctx.moveTo(dot.x, dot.y)
              ctx.lineTo(otherDot.x, otherDot.y)
              ctx.stroke()
            }
          }
        })
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    window.addEventListener("resize", handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 top-0 left-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  )
}
