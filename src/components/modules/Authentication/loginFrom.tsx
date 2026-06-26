"use client"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useForm } from "@tanstack/react-form"
import { toast } from "sonner"
import * as z from "zod"

const formSchema = z.object({
    email: z.string().email("Invalid Email"),
    password: z.string().min(8, "Minimum 8 length...")
})

function LoginFrom() {
    const form = useForm({
        defaultValues: {
            email: "",
            password: ""

        },
        validators: {
            onSubmit: formSchema
        },
        onSubmit: async ({ value }) => {
            const tostId = toast.loading("Loading...")

            try {
                const { data, error } = await authClient.signIn.email(value);
                if (data) {
                    toast.success("Login sucessfull", { id: tostId });
                    window.location.href = "/";
                };
                if (error) {
                    toast.error(error.message, { id: tostId })
                }
            } catch (error) {
                console.log(error)
                toast.error("Internal server error", { id: tostId })
            }

        }
    })
    return (
        <div className="flex min-h-screen w-full flex-col md:flex-row">

            <div className="flex w-full flex-col justify-center bg-white px-8 py-12 md:w-1/2 lg:px-24">
                <div className="mb-8 flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="h-3 w-3 rounded-sm bg-primary"></div>
                        <div className="h-3 w-3 rounded-sm bg-secondary" />
                        <div className="h-3 w-3 rounded-sm bg-primary/50"></div>
                        <div className="h-3 w-3 rounded-sm bg-secondary/50"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">EduZone</span>
                </div>

                <div className="mx-auto w-full max-w-md">
                    <h1 className="text-3xl font-bold text-slate-900">Welcome back</h1>
                    <p className="mt-2 text-slate-500">Please enter your details</p>

                    <form className="mt-8 space-y-5" onSubmit={(e) => {
                        e.preventDefault()
                        form.handleSubmit()
                    }}>
                        <form.Field name="email">{(field) => {
                            const isInvalid = field.state.meta.isTouched &&
                                !field.state.meta.isValid
                            return (
                                <Field>
                                    <FieldLabel className="text-black/80">Email address</FieldLabel>
                                    <Input className="py-5" value={field.state.value}
                                        placeholder="Enter your email"
                                        type="email"
                                        onChange={(e) => field.handleChange(e.target.value)}
                                    />
                                    {isInvalid && (<FieldError errors={field.state.meta.errors} />)}
                                </Field>
                            )
                        }}</form.Field>


                        <form.Field name="password">
                            {(field) => {
                                const isInvalid = field.state.meta.isTouched &&
                                    !field.state.meta.isValid
                                return (
                                    <Field>
                                        <FieldLabel className="text-black/80">Password</FieldLabel>
                                        <Input type="password" value={field.state.value}
                                            className="py-5"
                                            placeholder="••••••••"
                                            onChange={(e) => field.handleChange(e.target.value)} />
                                        {isInvalid && (<FieldError errors={field.state.meta.errors}></FieldError>)}
                                    </Field>
                                )
                            }}
                        </form.Field>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="remember" className="h-4 w-4 rounded border-slate-300 text-primary" />
                                <label htmlFor="remember" className="text-sm text-slate-600">Remember for 30 days</label>
                            </div>
                            <a href="#" className="text-sm font-medium text-primary hover:underline">Forgot password</a>
                        </div>

                        <button className="w-full rounded-md bg-gradient-to-r from-primary to-secondary py-2.5 font-semibold text-primary-foreground transition-all hover:scale-[1.02]">
                            Sign in
                        </button>

                        <button className="flex w-full items-center justify-center gap-2 rounded-md border border-slate-300 py-2.5 font-medium text-slate-700 transition-all hover:bg-slate-50">
                            Sign in with Google
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Dont have an account? 
                        <a href="/signup" className="font-semibold text-primary hover:underline ml-1">Sign up</a>
                    </p>
                </div>
            </div>

            {/* Right Side: Illustration Area */}
            <div className="hidden w-1/2 flex-col items-center justify-center bg-[#0B1120] p-12 md:flex relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[60%] h-[80%] bg-primary/20 rounded-bl-[100px] pointer-events-none blur-3xl" />
                <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-[100px] pointer-events-none" />

                <div className="relative h-full w-full max-w-lg z-10 flex flex-col items-center justify-center text-white">
                    <div className="mb-4 h-64 w-64 rounded-full bg-white/5 border border-white/10 backdrop-blur-md flex items-center justify-center shadow-2xl">
                         <span className="text-6xl">🎓</span>
                    </div>
                    <h2 className="text-3xl font-black mb-4">Empower Your Learning</h2>
                    <p className="text-center text-lg font-light italic text-muted-foreground">
                        Connect with expert tutors globally and achieve your goals with EduZone.
                    </p>
                </div>
            </div>
        </div>
    )
}
export default LoginFrom