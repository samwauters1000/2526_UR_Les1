"use client"

import * as React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(3, "Subject is required"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormValues = z.infer<typeof contactSchema>

export default function ContactForm() {
  const [loading, setLoading] = React.useState(false)

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  })

  async function onSubmit(_: ContactFormValues) {
    setLoading(true)
    try {
      await new Promise((r) => setTimeout(r, 1200))
      toast.success("Message sent successfully!")
      form.reset()
    } catch {
      toast.error("Failed to send message. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen py-20 flex flex-col gap-6 bg-background text-foreground">
      <div className="w-full px-4 max-w-sm mx-auto md:max-w-none md:mx-0 md:px-12 lg:px-24 flex flex-col gap-6">

        {/* Header card */}
        <div className="px-6 py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-card border border-border rounded-[1.25rem]">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] mb-2 text-primary">
              Let's talk
            </p>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-none text-foreground">
              Contact.
            </h1>
          </div>
          <span className="self-start sm:self-auto text-xs uppercase tracking-widest font-semibold px-5 py-2 bg-primary text-primary-foreground rounded-full">
            Contact
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">

          {/* Left info card */}
          <div className="lg:w-1/3 px-6 py-8 flex flex-col justify-between gap-8 bg-card border border-border rounded-[1.25rem]">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.25em] text-primary">
                About
              </p>
              <p className="text-base leading-relaxed text-foreground/60">
                I'm always open to new collaborations, internships, or just a good design conversation.
              </p>
            </div>
            <div className="space-y-2 pt-6 border-t border-border">
              <p className="text-xs uppercase tracking-widest text-primary">
                Based in Antwerp
              </p>
              <p className="text-xs uppercase tracking-widest text-primary">
                Available for freelance
              </p>
            </div>
          </div>

          {/* Right form card */}
          <div className="lg:w-2/3 px-6 py-8 bg-card border border-border rounded-[1.25rem]">
            <p className="text-xs uppercase tracking-[0.25em] mb-6 text-primary">
              Send a message
            </p>

            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-xs uppercase tracking-widest text-foreground/50">
                    Name
                  </Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Your name"
                    className="px-4 py-3 text-base placeholder:opacity-30 transition-colors focus-visible:ring-1 focus-visible:ring-primary"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-xs uppercase tracking-widest text-foreground/50">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="your.email@example.com"
                    className="px-4 py-3 text-base placeholder:opacity-30 transition-colors focus-visible:ring-1 focus-visible:ring-primary"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject" className="text-xs uppercase tracking-widest text-foreground/50">
                  Subject
                </Label>
                <Input
                  id="subject"
                  {...form.register("subject")}
                  placeholder="How can I help?"
                  className="px-4 py-3 text-base placeholder:opacity-30 transition-colors focus-visible:ring-1 focus-visible:ring-primary"
                />
                {form.formState.errors.subject && (
                  <p className="text-sm text-destructive">{form.formState.errors.subject.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-xs uppercase tracking-widest text-foreground/50">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={5}
                  {...form.register("message")}
                  placeholder="Tell me about your project..."
                  className="px-4 py-3 text-base placeholder:opacity-30 transition-colors focus-visible:ring-1 focus-visible:ring-primary resize-none"
                />
                {form.formState.errors.message && (
                  <p className="text-sm text-destructive">{form.formState.errors.message.message}</p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  disabled={loading}
                  className="px-10 py-3 font-semibold tracking-wide text-sm transition-all disabled:opacity-40 hover:opacity-90 bg-primary text-primary-foreground rounded-full"
                >
                  {loading ? "Sending..." : "Say hello →"}
                </Button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </main>
  )
}