"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/toast"

export default function LoginPage() {
  const [loading, setLoading] = React.useState(false)

  async function mockSubmit(e: React.FormEvent, actionName: string) {
    e.preventDefault(); setLoading(true)
    try { await new Promise((r) => setTimeout(r, 1200)); toast.success(`${actionName} succes!`) } 
    catch { toast.error("Fout bij inloggen") } finally { setLoading(false) }
  }

  return (
    <main className="min-h-screen flex flex-col items-center bg-background px-4 pt-24 md:pt-32 pb-12">
      <Card className="w-full max-w-sm border-[#3A3D50] bg-card shadow-xl rounded-2xl">
        <CardHeader className="p-6 pb-4">
          <CardTitle className="text-xl font-bold tracking-tight text-white">Welcome</CardTitle>
          <CardDescription className="text-xs text-gray-400">Log in or create an account</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6 h-10 bg-background/50 border border-[#3A3D50] rounded-xl p-1">
              <TabsTrigger value="login" className="text-[10px] uppercase font-bold tracking-widest">Login</TabsTrigger>
              <TabsTrigger value="register" className="text-[10px] uppercase font-bold tracking-widest">Register</TabsTrigger>
              <TabsTrigger value="forgot" className="text-[10px] uppercase font-bold tracking-widest">Reset</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <form onSubmit={(e) => mockSubmit(e, 'Login')} className="space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Email</Label>
                  <Input type="email" required className="bg-background/50 border-[#3A3D50] h-10 rounded-xl" />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-[10px] uppercase font-bold text-gray-500 tracking-widest ml-1">Password</Label>
                  <Input type="password" required className="bg-background/50 border-[#3A3D50] h-10 rounded-xl" />
                </div>
                <Button className="w-full h-11 mt-2 bg-[#7217E8] hover:bg-[#5e12c4] rounded-xl font-bold uppercase tracking-widest text-xs">Sign in</Button>
              </form>
            </TabsContent>
            {/* ... register & forgot tabs follow same pattern ... */}
          </Tabs>
        </CardContent>
      </Card>
    </main>
  )
}