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
                const { data, error } = await authClient.signUp.email(value);
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
            <div className="flex w-full flex-col justify-center bg-white px-8 py-12 md:w-1/2 lg:px-24">
                <div className="mb-8 flex items-center gap-2">
                    <div className="grid grid-cols-2 gap-1">
                        <div className="h-3 w-3 rounded-sm bg-indigo-600"></div>
                        <div className="h-3 w-3 rounded-sm bg-indigo-400" />
                        <div className="h-3 w-3 rounded-sm bg-indigo-300"></div>
                        <div className="h-3 w-3 rounded-sm bg-indigo-500"></div>
                    </div>
                    <span className="text-xl font-bold tracking-tight text-slate-900">TheCubeFactory</span>
                </div>

                <div className="mx-auto w-full max-w-md">
                    <h1 className="text-3xl font-bold text-slate-900">Welcome</h1>
                    <p className="mt-2 text-slate-500">Please enter your details</p>

                    <form
                        className="mt-8 space-y-5"
                        onSubmit={(e) => {
                            e.preventDefault();
                            form.handleSubmit();
                        }}
                    >
                        <form.Field name="name">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel>Name</FieldLabel>
                                        <Input
                                            className="py-5"
                                            value={field.state.value}
                                            placeholder="Enter your Name"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Field name="email">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel>Email address</FieldLabel>
                                        <Input
                                            className="py-5"
                                            value={field.state.value}
                                            placeholder="Enter your email"
                                            type="email"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Field name="password">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel>Password</FieldLabel>
                                        <Input
                                            type="password"
                                            value={field.state.value}
                                            className="py-5"
                                            placeholder="••••••••"
                                            onChange={(e) => field.handleChange(e.target.value)}
                                        />
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <form.Field name="role">
                            {(field) => {
                                const isInvalid =
                                    field.state.meta.isTouched && !field.state.meta.isValid;
                                return (
                                    <Field>
                                        <FieldLabel>Role</FieldLabel>
                                        <select
                                            value={field.state.value}
                                            onChange={(e) => field.handleChange(e.target.value)}
                                            className="w-full py-3 px-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                        >
                                            <option value="STUDENT">Student</option>
                                            <option value="TUTOR">Tutor</option>
                                        </select>
                                        {isInvalid && <FieldError errors={field.state.meta.errors} />}
                                    </Field>
                                );
                            }}
                        </form.Field>

                        <button className="w-full rounded-md bg-indigo-600 py-2.5 font-semibold text-white transition-all hover:bg-indigo-700">
                            Sign up
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Already have an account?
                        <a href="#" className="font-semibold text-indigo-600 hover:underline">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>

            {/* Right Side: Illustration Area */}
            <div className="hidden w-1/2 flex-col items-center justify-center bg-[#9e7fcc] p-12 md:flex">
                <div className="relative h-full w-full max-w-lg">
                    <div className="absolute inset-0 opacity-20"></div>

                    <div className="relative z-10 flex h-full flex-col items-center justify-center text-white">
                        <div className="mb-4 h-64 w-64 rounded-full bg-indigo-200/20 backdrop-blur-md flex items-center justify-center">
                            <img
                                src="/api/placeholder/400/400"
                                alt="Illustration"
                                className="h-full w-full object-contain"
                            />
                        </div>
                        <p className="text-center text-lg font-light italic">
                            Simplify your workflow with our smart cube factory tools
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default RegisterForm