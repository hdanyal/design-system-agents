import { Geist_Mono, Inter } from "next/font/google"

export const fontSans = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })

/**
 * Must be applied to the same element that carries the theme class, because
 * `--font-sans` and `--font-mono` back the `font-sans`/`font-mono` tokens and
 * portalled content resolves them from `<html>`.
 */
export const fontVariables = [fontSans.variable, fontMono.variable]
