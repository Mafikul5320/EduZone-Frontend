"use client"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
    name: z.string().min(3, "This field is required"),
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Minimum 8 characters required"),
    role: z.enum(["STUDENT", "TUTOR"], "Please select a role"),
})

/* ─── tiny icon components (no extra deps) ─────────────────── */
const IconUser = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
)

const IconMail = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
)

const IconLock = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
        <path d="M7 11V7a5 5 0 0110 0v4" />
    </svg>
)

const IconUsers = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
    </svg>
)

const IconChevron = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
)

const IconShield = () => (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#E0A820"
        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
)

/* ─── InputWrapper: icon + shadcn Input styled together ──────── */
function InputWrapper({
    icon,
    children,
}: {
    icon: React.ReactNode
    children: React.ReactNode
}) {
    return (
        <div className="relative flex items-center">
            <span className="pointer-events-none absolute left-3 text-[#a99cc5]">
                {icon}
            </span>
            <div className="w-full [&>input]:pl-10 [&>input]:py-3 [&>input]:text-sm
                [&>input]:border-[1.5px] [&>input]:border-[#e4dff5]
                [&>input]:bg-[#faf9ff] [&>input]:rounded-[10px]
                [&>input]:text-[#1a0e45] [&>input]:placeholder-[#b9b0d6]
                [&>input]:transition-all [&>input]:duration-200
                [&>input:focus]:border-[#2D1B69] [&>input:focus]:bg-white
                [&>input:focus]:shadow-[0_0_0_3px_rgba(45,27,105,0.08)]
                [&>input:focus]:outline-none">
                {children}
            </div>
        </div>
    )
}

/* ─── Role pill button (replaces plain <select> visually) ────── */
function RolePill({
    value,
    label,
    active,
    color,
    onClick,
}: {
    value: string
    label: string
    active: boolean
    color: "purple" | "gold"
    onClick: () => void
}) {
    const isGold = color === "gold"
    return (
        <button
            type="button"
            onClick={onClick}
            className={[
                "flex items-center gap-2 rounded-[10px] border-[1.5px] px-4 py-[10px]",
                "text-xs font-semibold transition-all duration-200 cursor-pointer",
                active
                    ? isGold
                        ? "border-[#C9921A] bg-[rgba(201,146,26,0.07)] text-[#8a6200]"
                        : "border-[#2D1B69] bg-[rgba(45,27,105,0.07)] text-[#2D1B69]"
                    : "border-[#e4dff5] bg-[#faf9ff] text-[#4a3b7a] opacity-60",
            ].join(" ")}
        >
            <span
                className={[
                    "h-2 w-2 flex-shrink-0 rounded-full",
                    isGold ? "bg-[#C9921A]" : "bg-[#2D1B69]",
                ].join(" ")}
            />
            {label}
        </button>
    )
}

/* ══════════════════════════════════════════════════════════════
   REGISTER FORM
══════════════════════════════════════════════════════════════ */
function RegisterForm() {
    const form = useForm({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "STUDENT",
        },
        validators: {
            onSubmit: formSchema,
        },
        onSubmit: async ({ value }) => {
            const toastId = toast.loading("Loading...")

            try {
                const { data, error } = await authClient.signUp.email(value)
                if (data) {
                    toast.success("Registration successful", { id: toastId })
                }
                if (error) {
                    toast.error(error.message, { id: toastId })
                }
            } catch (error) {
                toast.error("Internal server error", { id: toastId })
            }
        },
    })

    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row">

            {/* ── LEFT: Form ─────────────────────────────────────── */}
            <div className="flex w-full flex-col justify-center bg-white px-8 py-12 md:w-1/2 lg:px-16">
                {/* Logo */}
                <div className="mb-8 flex items-center gap-2.5">
                    <div className="grid grid-cols-2 gap-[3px]">
                        <div className="h-[10px] w-[10px] rounded-[3px] bg-[#2D1B69]" />
                        <div className="h-[10px] w-[10px] rounded-[3px] bg-[#C9921A]" />
                        <div className="h-[10px] w-[10px] rounded-[3px] bg-[#2D1B69]/40" />
                        <div className="h-[10px] w-[10px] rounded-[3px] bg-[#C9921A]/40" />
                    </div>
                    <span className="text-[17px] font-bold tracking-tight text-[#1a0e45]">
                        EduZone
                    </span>
                </div>

                <div className="mx-auto w-full max-w-md">
                    <h1 className="text-3xl font-bold tracking-tight text-[#1a0e45]">
                        Create Account
                    </h1>
                    <p className="mt-1.5 text-sm text-[#8b7ab8]">
                        Please fill in your details to get started
                    </p>

                    <form
                        className="mt-7 space-y-4"
                        onSubmit={(e) => {
                            e.preventDefault()
                            form.handleSubmit()
                        }}
                    >
                        {/* ── Name ── */}
                        <form.Field name="name">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel className="mb-1.5 block text-xs font-semibold tracking-wide text-[#4a3b7a]">
                                            Full Name
                                        </FieldLabel>
                                        <InputWrapper icon={<IconUser />}>
                                            <Input
                                                value={field.state.value}
                                                placeholder="Enter your name"
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                        </InputWrapper>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                                className="mt-1.5 text-xs text-red-500"
                                            />
                                        )}
                                    </Field>
                                )
                            }}
                        </form.Field>

                        {/* ── Email ── */}
                        <form.Field name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel className="mb-1.5 block text-xs font-semibold tracking-wide text-[#4a3b7a]">
                                            Email Address
                                        </FieldLabel>
                                        <InputWrapper icon={<IconMail />}>
                                            <Input
                                                value={field.state.value}
                                                placeholder="Enter your email"
                                                type="email"
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                        </InputWrapper>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                                className="mt-1.5 text-xs text-red-500"
                                            />
                                        )}
                                    </Field>
                                )
                            }}
                        </form.Field>

                        {/* ── Password ── */}
                        <form.Field name="password">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel className="mb-1.5 block text-xs font-semibold tracking-wide text-[#4a3b7a]">
                                            Password
                                        </FieldLabel>
                                        <InputWrapper icon={<IconLock />}>
                                            <Input
                                                type="password"
                                                value={field.state.value}
                                                placeholder="••••••••"
                                                onChange={(e) => field.handleChange(e.target.value)}
                                            />
                                        </InputWrapper>
                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                                className="mt-1.5 text-xs text-red-500"
                                            />
                                        )}
                                    </Field>
                                )
                            }}
                        </form.Field>

                        {/* ── Role ── */}
                        <form.Field name="role">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel className="mb-1.5 block text-xs font-semibold tracking-wide text-[#4a3b7a]">
                                            Select Your Role
                                        </FieldLabel>

                                        {/*
                                         * Visually: two pill buttons.
                                         * Internally: same select hidden behind them for full
                                         * form-library compatibility.
                                         */}
                                        <select
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="sr-only"
                                            tabIndex={-1}
                                            aria-hidden="true"
                                        >
                                            <option value="STUDENT">Student</option>
                                            <option value="TUTOR">Tutor</option>
                                        </select>

                                        <div className="grid grid-cols-2 gap-2.5">
                                            <RolePill
                                                value="STUDENT"
                                                label="Student (Learner)"
                                                active={field.state.value === "STUDENT"}
                                                color="gold"
                                                onClick={() => field.handleChange("STUDENT")}
                                            />
                                            <RolePill
                                                value="TUTOR"
                                                label="Tutor (Educator)"
                                                active={field.state.value === "TUTOR"}
                                                color="purple"
                                                onClick={() => field.handleChange("TUTOR")}
                                            />
                                        </div>

                                        {isInvalid && (
                                            <FieldError
                                                errors={field.state.meta.errors}
                                                className="mt-1.5 text-xs text-red-500"
                                            />
                                        )}
                                    </Field>
                                )
                            }}
                        </form.Field>

                        {/* ── Submit ── */}
                        <button
                            type="submit"
                            className="mt-1 w-full rounded-[10px] border-none bg-gradient-to-r
                                from-[#2D1B69] to-[#C9921A] py-3 text-sm font-bold
                                text-white tracking-wide transition-all duration-200
                                hover:-translate-y-[1px] hover:opacity-90
                                active:translate-y-0 active:scale-[0.99]
                                shadow-[0_4px_14px_rgba(45,27,105,0.30)]"
                        >
                            Create Account →
                        </button>
                    </form>

                    {/* divider */}
                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-[#ede9f8]" />
                        <span className="text-[11px] font-medium text-[#b9b0d6]">
                            or continue with
                        </span>
                        <div className="h-px flex-1 bg-[#ede9f8]" />
                    </div>

                    <p className="text-center text-xs text-[#8b7ab8]">
                        Already have an account?{" "}
                        <a
                            href="/login"
                            className="font-semibold text-[#2D1B69] hover:underline"
                        >
                            Sign in
                        </a>
                    </p>
                </div>
            </div>

            {/* ── RIGHT: Illustration ────────────────────────────── */}
            <div className="relative hidden w-1/2 overflow-hidden bg-[#0B1120] p-12 md:flex md:flex-col md:items-center md:justify-center">
                {/* glow blobs */}
                <div className="pointer-events-none absolute left-0 top-0 h-[70%] w-[60%]
                    rounded-br-[80px] bg-[#2D1B69]/25 blur-[50px]" />
                <div className="pointer-events-none absolute bottom-1/4 right-1/4
                    h-80 w-80 rounded-full bg-[#C9921A]/15 blur-[80px]" />

                <div className="relative z-10 flex flex-col items-center text-white max-w-xs text-center">
                    {/* icon circle */}
                    <div className="mb-6 flex h-36 w-36 items-center justify-center rounded-full
                        border border-white/10 bg-white/[0.04] shadow-2xl backdrop-blur-sm">
                        <IconShield />
                    </div>

                    <h2 className="mb-3 text-2xl font-black tracking-tight">
                        Join EduZone
                    </h2>
                    <p className="mb-7 text-sm font-light italic text-white/50 leading-relaxed">
                        Unlock your potential. Learn new skills or share your
                        expertise with the world.
                    </p>

                    {/* feature bullets */}
                    {[
                        "Track your progress in real-time",
                        "Connect with expert tutors",
                        "Earn verified skill certificates",
                    ].map((feat) => (
                        <div
                            key={feat}
                            className="mb-2.5 flex w-full items-center gap-3 rounded-[10px]
                                border border-white/[0.07] bg-white/[0.04] px-4 py-2.5
                                text-xs text-white/75"
                        >
                            <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C9921A]" />
                            {feat}
                        </div>
                    ))}

                    {/* bottom badge */}
                    <div className="mt-6 flex items-center gap-2 rounded-full border
                        border-[#C9921A]/20 bg-[#C9921A]/10 px-4 py-1.5
                        text-[11px] font-semibold text-[#E0A820]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#E0A820]" />
                        Made for Students · v1.0.0
                    </div>
                </div>
            </div>

        </div>
    )
}

export default RegisterForm