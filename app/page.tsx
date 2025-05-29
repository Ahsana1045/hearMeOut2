"use client";
import * as React from "react"
import { useState } from "react"
import styles from "./homepage.module.css"

interface FormState {
    firstName: string;
    username: string;
    email: string;
    password: string;
}

interface FormErrors {
    firstName?: string;
    username?: string;
    email?: string;
    password?: string;
}

function validate(form: FormState): FormErrors {
    const errors: FormErrors = {};
    if (!form.firstName.trim()) errors.firstName = "First name is required";
    if (!form.username.trim()) errors.username = "Username is required";
    if (!form.email.trim()) errors.email = "Email is required";
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) errors.email = "Invalid email address";
    if (!form.password) errors.password = "Password is required";
    else if (form.password.length < 6) errors.password = "Password must be at least 6 characters";
    return errors;
}

function validateSignIn(form: { username: string; password: string }) {
    const errors: { username?: string; password?: string } = {};
    if (!form.username.trim()) errors.username = "Username is required";
    if (!form.password) errors.password = "Password is required";
    return errors;
}

function Modal({ isOpen, onClose, children, title }: { isOpen: boolean; onClose: () => void; children: React.ReactNode; title: string }) {
    if (!isOpen) return null;
    function handleOverlayClick(e: React.MouseEvent<HTMLDivElement>) {
        if (e.target === e.currentTarget) onClose();
    }
    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
            onClick={handleOverlayClick}
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
        >
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative animate-fadeIn">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 focus:outline-none"
                    aria-label="Close modal"
                >
                    <span aria-hidden>×</span>
                </button>
                <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
                {children}
            </div>
        </div>
    );
}

function SignInForm({ onSuccess }: { onSuccess: () => void }) {
    const [form, setForm] = useState({ username: '', password: '' });
    const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const validation = validateSignIn(form);
        setErrors(validation);
        if (Object.keys(validation).length === 0) {
            setIsSubmitted(true);
            onSuccess();
        } else {
            setIsSubmitted(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
                <label htmlFor="signin-username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    id="signin-username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={form.username}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username}</p>}
            </div>
            <div>
                <label htmlFor="signin-password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    id="signin-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    value={form.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
            </div>
            <button
                type="submit"
                className={`${styles.button} ${styles.buttonPrimary}`}
            >
                Log In
            </button>
            {isSubmitted && <p className="text-green-600 text-center font-medium mt-2">Signed in successfully!</p>}
        </form>
    );
}

function CreateAccountForm({ onSuccess }: { onSuccess: () => void }) {
    const [form, setForm] = useState<FormState>({
        firstName: "",
        username: "",
        email: "",
        password: ""
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: undefined });
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        const validation = validate(form);
        setErrors(validation);
        if (Object.keys(validation).length === 0) {
            setIsSubmitted(true);
            onSuccess();
        } else {
            setIsSubmitted(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name</label>
                <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    value={form.firstName}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
            </div>
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
                <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    value={form.username}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.username && <p className="text-red-600 text-xs mt-1">{errors.username}</p>}
            </div>
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={form.email}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    value={form.password}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
                {errors.password && <p className="text-red-600 text-xs mt-1">{errors.password}</p>}
            </div>
            <button
                type="submit"
                className={`${styles.button} ${styles.buttonPrimary}`}
            >
                Create Account
            </button>
            {isSubmitted && <p className="text-green-600 text-center font-medium mt-2">Account created successfully!</p>}
        </form>
    );
}

export default function HomePage() {
    const [openModal, setOpenModal] = useState<null | 'signIn' | 'create'>(null)

    function handleOpen(modal: 'signIn' | 'create') {
        setOpenModal(modal)
    }
    function handleClose() {
        setOpenModal(null)
    }

    return (
        <main className={styles.container}>
            <div className="flex flex-col items-center w-full">
                <h1 className={styles.title}>Hear Me Out?</h1>
                <p className={styles.subtitle}>No judgment, only understanding</p>
                <div className="flex flex-col items-center w-full max-w-xs">
                    <button
                        onClick={() => handleOpen('signIn')}
                        className={`${styles.button} ${styles.buttonPrimary}`}
                    >
                        Log In
                    </button>
                    <button
                        onClick={() => handleOpen('create')}
                        className={`${styles.button} ${styles.buttonSecondary}`}
                    >
                        Create Account
                    </button>
                </div>
            </div>
            <Modal isOpen={openModal === 'signIn'} onClose={handleClose} title="Sign In">
                <SignInForm onSuccess={handleClose} />
            </Modal>
            <Modal isOpen={openModal === 'create'} onClose={handleClose} title="Create Account">
                <CreateAccountForm onSuccess={handleClose} />
            </Modal>
        </main>
    )
}
